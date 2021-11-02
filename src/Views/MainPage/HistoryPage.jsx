import React, { useEffect, useState, useCallback } from "react";
import { GetMainhistory } from "../../Services/APIServices";
import CircularProgress from "@material-ui/core/CircularProgress";
import psi from "../../Views/sales.png";

export const HistoryPage = () => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  const GetAllData = useCallback(async () => {
    setLoading(true);
    const result = await GetMainhistory();
    if (result) {
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);
    } else setResult(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    GetAllData();
  }, [GetAllData]);

  return (
    <div className="Agents-wrapper view-wrapper">
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div style={{ display: "inline-block" }}></div>
          <div className="cards">
            {result &&
              result.map((s, index) => (
                <div class="card-container">
                  <span class="pro"> {s.User__c}</span>
                  <img id="avatar" src={psi} alt="lead"></img>
                  <h3>{s.New_Value__c}</h3>
                  <h3>{s.Old_Value__c}</h3>
                  <h6>{s.Last_Modified_Date__c}</h6>
                  <p>{s.Created_DateTime__c}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
