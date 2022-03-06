import React, { useEffect, useState } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "./DashboardWeb.scss";
import axios from "axios";
import { TokenMicrosoftAccount } from "../Services copy/DashboardService";
import { PowerBiEnum } from "../Enum/PowerBi.Enum";
import { GetURLSearchParamsMethod } from "../Services copy/GetURLSearchParamsMethod";
export const DashboardWeb = () => {
  const [tokenapii, settokenapii] = useState();
  const Userid = GetURLSearchParamsMethod('id')


  const GenerateToken = async () => {
    localStorage.removeItem("AccountToken");
    const result = await TokenMicrosoftAccount();
    if (result && result.data.access_token)
      localStorage.setItem(
        "AccountToken",
        JSON.stringify(result && result.data.access_token) || null
      );
    GenerateTokenreport();
  };

  const Filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
      table: "Team Users BusinessGroups",
      column: "TeamsId",
    },
    operator: "In",
    values: [+Userid],
    filterType: models.FilterType.BasicFilter,
    requireSingleSelection: true,
  };

  const GenerateTokenreport = async () => {
    axios.post(PowerBiEnum.powerPI.valueWeb, {
      data: {
        accessLevel: "View",
        allowSaveAs: "false",
      },
    })
      .then((response) => {
        console.log(response);
        settokenapii(response.data.token);
      })
      .catch((error) => {
        console.error(error, "error");
      });
  };

  useEffect(() => {
    GenerateToken();
    //GenerateTokenreport();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "end" }}></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PowerBIEmbed
            embedConfig={{
              type: "report",
              id: "1623ac5a-ee00-41a6-a41b-474daecc35b6",
              embedUrl: "https://app.powerbi.com/reportEmbed?reportId=1623ac5a-ee00-41a6-a41b-474daecc35b6&groupId=ade8b8a2-c386-46c0-8afc-c9b19055740d&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImFuZ3VsYXJPbmx5UmVwb3J0RW1iZWQiOnRydWUsImNlcnRpZmllZFRlbGVtZXRyeUVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwic2tpcFpvbmVQYXRjaCI6dHJ1ZX19",

              accessToken: tokenapii,
              tokenType: models.TokenType.Embed,
             // filters: [Filter],
              settings: {
                customLayout: {
                  displayOption: models.DisplayOption.FitToWidth,
                },
                filterPaneEnabled: false,
                navContentPaneEnabled: false,
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
                background: models.BackgroundType.Transparent,
              },
            }}
            eventHandlers={
              new Map([
                [
                  "loaded",
                  function () {
                    console.log("Report loaded");
                  },
                ],
                [
                  "rendered",
                  function () {
                    console.log("Report rendered");
                  },
                ],
                [
                  "error",
                  function () {
                    //   GenerateToken();
                    //   setTimeout(() => {
                    //     GenerateTokenreport();
                    //   }, 1000);
                  },
                ],
              ])
            }
            cssClassName={"report-style-class"}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </div>
      </div>
    </div>
  );
};
