import React, { useEffect, useState, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { GetMainInfo_Contact } from "../../Services/APIServices_2";
import { GetMainInfo_Case } from "../../Services/APIServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Skeleton from '@mui/material/Skeleton';
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/system";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Budget } from "../../components/dashboard/Budget";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { DoughnutChart } from "../../components/dashboard/DoughnutChart";
import { PieChartGraph } from "../../components/dashboard/PieChartGraph";
import { Sales } from "../../components/dashboard/sales";
import  FreshdeskWidget  from "../../components/FreshdeskWidget";
import {Helmet} from "react-helmet";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models ,pbi, Report } from 'powerbi-client';


export const DataTable = () => {
  const [result, setResult] = useState();
  const [res, setres] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [page2, setPage2] = React.useState(0);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(2);
  const [loading, setLoading] = useState(true);
  const [count, setcount] = useState();
  const [countcase, setcountcase] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };
  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };

  const GetAllData = useCallback(async () => {
   
    const result = await GetMainInfo_Contact();
    if (result) {
      setTimeout(() => {
        setLoading(false); 
      }, 1500);
    
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);
      setcount(result.data.length);
      console.log('Contact',result);
    } else setResult(null);
    // setcount(0);

  }, []);

  const GetAllData_Case = useCallback(async () => {
 
    const result = await GetMainInfo_Case();
    if (result) {
      setTimeout(() => {
        setLoading(false); 
      }, 1500);
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setres(sortedResult);
      setcountcase(result.data.length);
      console.log('case',result);
    } else setres(null);
    // setcountcase(0);

   
  }, []);


//  const loadFreshDesk =(locale) => {
//     window.fwSettings = {
//        widget_id: MY_WIDGET_ID,
//        locale: MY_FRESH_DESK_LOCALE,
//     };
 
//     !(function() {
//        if ('function' !== typeof window.FreshworksWidget) {
//           const n = function() {
//              n.q.push(arguments);
//           };
//           (n.q = []), (window.FreshworksWidget = n);
//        }
//     })();
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://widget.freshworks.com/widgets/MY_WIDGET_ID.js';
//     document.getElementsByTagName('head')[0].appendChild(script);
//  }

const basicFilter = {
  $schema: "http://powerbi.com/product/schema#basic",
  target: {
    table: "Lead SP",
    column: "Contacts Type"
  },
  operator: "In",
  values: ["Seller"],
  filterType: models.FilterType.BasicFilter,
  requireSingleSelection: true
}
// var config = {
//   type: embedType,
//   embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNzQxOTNjNTktNmM1My00MTBjLWE3MTMtNjRhODEzZTNlNTk2IiwidCI6IjkxMDdlODQ0LTg4Y2MtNGM0MS04ZjU1LThjMDhiMjNkNDgxZiIsImMiOjl9&pageName=ReportSectiona45811a096da4ef98a2f",
//   id: embedId,
//   dashboardId: dashboardId,
//   filters: [basicFilter],
//   settings: {
//       filterPaneEnabled: false,
//       navContentPaneEnabled: true
//   }
// };

// let embedConfiguration = {
//   embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNzQxOTNjNTktNmM1My00MTBjLWE3MTMtNjRhODEzZTNlNTk2IiwidCI6IjkxMDdlODQ0LTg4Y2MtNGM0MS04ZjU1LThjMDhiMjNkNDgxZiIsImMiOjl9&pageName=ReportSectiona45811a096da4ef98a2f",
//   pageView: 'fitToWidth',
//   filters: [basicFilter],
//   type: 'dashboard'
// };

useEffect(() => {
  GetAllData();
  GetAllData_Case();

}, [GetAllData, GetAllData_Case]);


// const filter = {
//   $schema: "http://powerbi.com/product/schema#advanced",
//   target: {
//       table: "table name",
//       column: "column1"
//   },
//   operator: "In",
//   values: ["SomefilterValue"]
// };

// var config = {
//   type: 'report',
//   tokenType: models.TokenType.Embed,
//   embedUrl: "https://app.powerbi.com/reportEmbed?reportId=80c16fed-bc48-4603-ae7b-8b8327f80de7&groupId=eb31180a-7ca1-4a8d-b847-cee9bffcc291&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImFuZ3VsYXJPbmx5UmVwb3J0RW1iZWQiOnRydWUsImNlcnRpZmllZFRlbGVtZXRyeUVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwic2tpcFpvbmVQYXRjaCI6dHJ1ZX19",
//   id: '4e6691d7-5605-4c28-a1d4-2a48ae372871',
//   permissions: models.Permissions.Read,
//   settings: {
//       filterPaneEnabled: true,
//       navContentPaneEnabled: false
//   }
// };

// Get a reference to the embedded report HTML element
// var reportContainer = ('#reportContainer')[0];

// Embed the report and display it within the div container.
// var report = pbi.embed(reportContainer, config);

//Add filter to the report
// report.on('loaded', event => {
//   report.getFilters()
//     .then(filters => {
//         filters.push(filter);
//         return report.setFilters(filters);
//     });
// });

  return (
    <div style={{ width: "90%", margin: "1px auto" }}>
  
        <div>
                     {loading ? (

<div style={{display: 'flex'
  ,justifyContent: 'center'}}>
  <Box sx={{ width: 800 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
</div>


// <CircularProgress />
) : (
 
            <div>
               {count !== 0 ? (
              <TableContainer
                component={Paper}
                style={{ borderRadius: "20px" }}
              >
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#006186" }}>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        User
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        Name
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        Email
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        Phone
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        Rate
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        LeadSource
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result &&
                      result
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((s, index) => (
                          <TableRow>
                            
                            <TableCell
                             style={{
                              fontSize: "20px",
                              backgroundColor: "#ffffff",
                              height: "27px",
                              fontFamily: "revert",
                              color: "rgb(248 18 1)",
                          
                            }}
                              align="center"
                            >
                             <Stack direction="row" spacing={1}>

      <Avatar sx={{ bgcolor: deepOrange[500] }}> {s.Name.charAt(0)}</Avatar>
   
    </Stack>
                            </TableCell>
                            <TableCell
                             style={{
                              fontSize: "20px",
                              backgroundColor: "#ffffff",
                              height: "27px",
                              fontFamily: "revert",
                              color: "rgb(248 18 1)",
                            }}
                              align="center"
                            >
                              {s.Name}
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "15px",
                                backgroundColor: "#ffffff",
                                height: "27px",
                                fontFamily: "revert",
                                color: "#121212",
                              }}
                              align="center"
                            >
                              {s.Email}
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "15px",
                                backgroundColor: "#ffffff",
                                height: "27px",
                                fontFamily: "revert",
                                color: "#121212",
                              }}
                              align="center"
                            >
                              {s.Phone}
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "15px",
                                backgroundColor: "#ffffff",
                                height: "27px",
                                fontFamily: "revert",
                                color: "#121212",
                              }}
                              align="center"
                            >
                                  <Rating
                      name="text-feedback"
                      value={s.Rating__c}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "15px",
                                backgroundColor: "#ffffff",
                                height: "27px",
                                fontFamily: "revert",
                                color: "#121212",
                              }}
                              align="center"
                            >
                              {s.LeadSource}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[2, 10, 100]}
                  component="div"
                  count={
                    undefined !== result && result !== null && result.length
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>) :
                  <div style={{    display: 'flex',justifyContent: 'center',fontSize: 'xx-large'}}>
               
                  <div className="glitcH" title="No Contact">No Contact<span className="mdi mdi-alert-circle px-2" /></div>
                  
                  </div>
              
              
             }
            </div> 
)}
        
          <br />

          {loading ? (

<div style={{display: 'flex'
  ,justifyContent: 'center'}}>
  <Box sx={{ width: 800 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
</div>


// <CircularProgress />
) : (

 
            <div>
               {countcase !==0 ? (
              <TableContainer
                component={Paper}
                style={{ borderRadius: "20px" }}
              >
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#006186" }}>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        Subject
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        Status
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        Contact Name
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        Origin
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontFamily: "revert",
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                        align="center"
                      >
                        Priority
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {res &&
                      res
                        .slice(
                          page2 * rowsPerPage2,
                          page2 * rowsPerPage2 + rowsPerPage2
                        )
                        .map((r, index) => (
                          <TableRow>
                            <TableCell
                              style={{
                                fontSize: "20px",
                                backgroundColor: "#ffffff",
                                height: "27px",
                                fontFamily: "revert",
                                color: "rgb(248 18 1)",
                              }}
                              align="center"
                            >
                              {r.Subject}
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "15px",
                                backgroundColor: "#ffffff",
                                height: "27px",
                                fontFamily: "revert",
                                color: "#121212",
                              }}
                              align="center"
                            >
                              {r.Status}
                            </TableCell>
                            <TableCell
                               style={{
                                fontSize: "20px",
                                backgroundColor: "#ffffff",
                                height: "27px",
                                fontFamily: "revert",
                                color: "rgb(248 18 1)",
                              }}
                              align="center"
                            >
                              {r.Contact.Name}
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "15px",
                                backgroundColor: "#ffffff",
                                height: "27px",
                                fontFamily: "revert",
                                color: "#121212",
                              }}
                              align="center"
                            >
                              {r.Origin}
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "15px",
                                backgroundColor: "#ffffff",
                                height: "27px",
                                fontFamily: "revert",
                                color: "#121212",
                              }}
                              align="center"
                            >
                              {r.Priority}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[2, 10, 100]}
                  component="div"
                  count={undefined !== res && res !== null && res.length}
                  rowsPerPage={rowsPerPage2}
                  page={page2}
                  onPageChange={handleChangePage2}
                  onRowsPerPageChange={handleChangeRowsPerPage2}
                />
              </TableContainer>
               ) :
               
               <div style={{    display: 'flex',justifyContent: 'center',fontSize: 'xx-large'}}>
               
               <div className="glitcH" title="No Case">No Case<span className="mdi mdi-alert-circle px-2" /></div>
               
               </div>
               }
            </div>
           
          )}
          
       
        </div>
<br/>
<br/>
        <div >
          <Budget />
          <br/>
          <LatestOrders/>
          <br/>
          <DoughnutChart/>
          <br/>
          <PieChartGraph/>
          <br/>
          <Sales/>
{/* 
          <FreshdeskWidget 
            url="https://support.freshdesk.com"
            type="pop-up"
            buttonType="text"
            buttonText="Send feedback!"
            buttonColor="yellow"
            buttonBackgroundColor="#012471"
        /> */}



        </div>

        <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual and qna
		id: '80c16fed-bc48-4603-ae7b-8b8327f80de7',
		embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=80c16fed-bc48-4603-ae7b-8b8327f80de7&groupId=eb31180a-7ca1-4a8d-b847-cee9bffcc291&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImFuZ3VsYXJPbmx5UmVwb3J0RW1iZWQiOnRydWUsImNlcnRpZmllZFRlbGVtZXRyeUVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwic2tpcFpvbmVQYXRjaCI6dHJ1ZX19',
		accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOTEwN2U4NDQtODhjYy00YzQxLThmNTUtOGMwOGIyM2Q0ODFmLyIsImlhdCI6MTY0MjA3MTU0NSwibmJmIjoxNjQyMDcxNTQ1LCJleHAiOjE2NDIwNzY2NzQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFkb2hTVEtFbng3NnBTSEtrc1JSYWFNTnloM213bmtYNlhFZXhaRHlYY1YvRlljMlJLMDdnV2gxbGR4YWRvY3VJIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiQWwgV2FsaWVkIiwiZ2l2ZW5fbmFtZSI6IlNoZXJpZW4iLCJpcGFkZHIiOiI0Ni4xODUuMTYxLjE2MiIsIm5hbWUiOiJTaGVyaWVuIEFsIFdhbGllZCIsIm9pZCI6ImIyZmY0ODZlLWRmNmItNDgyOS1iNDZkLTc5NDQ3NDEzYzg4YSIsInB1aWQiOiIxMDAzMjAwMDM1NjY3QjIyIiwicmgiOiIwLkFUd0FST2dIa2N5SVFVeVBWWXdJc2oxSUh3OEJISWRoWHJGUGc2eVlZUXAta1JBOEFDdy4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJZSFBoRGJyTDBFSGY2djdWZmZuV0JLcm9qNl9UdWVwZTZKaFZVeEk4NU53IiwidGlkIjoiOTEwN2U4NDQtODhjYy00YzQxLThmNTUtOGMwOGIyM2Q0ODFmIiwidW5pcXVlX25hbWUiOiJzaGVyaWVuQHBzaW52Lm5ldCIsInVwbiI6InNoZXJpZW5AcHNpbnYubmV0IiwidXRpIjoiMDNCcDRWeGtYRXlCZlhxNHdHcGRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYTllYTg5OTYtMTIyZi00Yzc0LTk1MjAtOGVkY2QxOTI4MjZjIiwiMTE2NDg1OTctOTI2Yy00Y2YzLTljMzYtYmNlYmIwYmE4ZGNjIiwiZmRkN2E3NTEtYjYwYi00NDRhLTk4NGMtMDI2NTJmZThmYTFjIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.ugAy8nIu8MQMN8CDJquH76XEwLrZ2G6fBgXtLdrzAXtr56TluDUzBnAfNEzKHeJHepAEXHn4gC9ieD9tePDfw_xRlYkuvff5fq8UB4_ZeYDBAu2qJcWQcoVvnNTvGi0x25bA-etmP_ELDfAgk6iNewb_6eXHIPS14z8ZTTsiFjYvvX6O6T6S1KwKJj5SkF7JdkLAqdJWZkpUkN5dgVSLwgcK-yD0ZualFWF_8bnj4peMDzJKCRh5bXXEvoHlUXq-8_83o5YeLFmKTSkIJfQlvd-lbU-FOvNHpalB5pVpdR1OPk624BLRTuciOot87z-k1aAdrMccO85gDc2yjFqBDA',
		tokenType: models.TokenType.Aad,
    filters: [basicFilter],
		settings: {
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = { 
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}]
		])
	}
		
	cssClassName = { "report-style-class" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport;
	}}
/>

        {/* <div style={{display:'flex', justifyContent:'center'}} id="reportContainer">
        <iframe title="Sales Ahlam Team Lead" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiNzQxOTNjNTktNmM1My00MTBjLWE3MTMtNjRhODEzZTNlNTk2IiwidCI6IjkxMDdlODQ0LTg4Y2MtNGM0MS04ZjU1LThjMDhiMjNkNDgxZiIsImMiOjl9&pageName=ReportSectiona45811a096da4ef98a2f" frameborder="0" allowFullScreen="true"></iframe></div> */}
    </div>
  );
};
