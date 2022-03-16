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
import axios from 'axios';
import {DashboardWeb} from '../../DashboardWeb/DashboardWeb'

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


const basicFilter = {
  $schema: "http://powerbi.com/product/schema#basic",
  target: {
    table: "Lead SP",
    column: "Leads Type"
  },
  operator: "In",
  values: ["Seeker"],
  filterType: models.FilterType.BasicFilter,
  requireSingleSelection: true
}



const [tokenapi, settokenapi] = useState();


const GenerateToken = () => {
  axios.post('https://api.powerbi.com/v1.0/myorg/groups/eb31180a-7ca1-4a8d-b847-cee9bffcc291/reports/4e6691d7-5605-4c28-a1d4-2a48ae372871/GenerateToken',
  {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOTEwN2U4NDQtODhjYy00YzQxLThmNTUtOGMwOGIyM2Q0ODFmLyIsImlhdCI6MTY0MjY3MTIwMiwibmJmIjoxNjQyNjcxMjAyLCJleHAiOjE2NDI2NzU3NDksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJFMlpnWUpETnZNYkF6VzQvdmV2K3l2eEt2NHRscWp1MU44a3FXakNzRElwcUtaOS9ZUW9BIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjhlOWRmNWU4LWRjMTgtNGFiMS1iMGQ1LTYyNzdlYmQ5Y2FlNSIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiQWwgV2FsaWVkIiwiZ2l2ZW5fbmFtZSI6IlNoZXJpZW4iLCJpcGFkZHIiOiI0Ni4xODUuMTYxLjE2MiIsIm5hbWUiOiJTaGVyaWVuIEFsIFdhbGllZCIsIm9pZCI6ImIyZmY0ODZlLWRmNmItNDgyOS1iNDZkLTc5NDQ3NDEzYzg4YSIsInB1aWQiOiIxMDAzMjAwMDM1NjY3QjIyIiwicmgiOiIwLkFUd0FST2dIa2N5SVFVeVBWWXdJc2oxSUgtajFuWTRZM0xGS3NOVmlkLXZaeXVVOEFDdy4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBQaXBlbGluZS5EZXBsb3kgUGlwZWxpbmUuUmVhZC5BbGwgUGlwZWxpbmUuUmVhZFdyaXRlLkFsbCBSZXBvcnQuUmVhZC5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic3ViIjoiWUhQaERickwwRUhmNnY3VmZmbldCS3JvajZfVHVlcGU2SmhWVXhJODVOdyIsInRpZCI6IjkxMDdlODQ0LTg4Y2MtNGM0MS04ZjU1LThjMDhiMjNkNDgxZiIsInVuaXF1ZV9uYW1lIjoic2hlcmllbkBwc2ludi5uZXQiLCJ1cG4iOiJzaGVyaWVuQHBzaW52Lm5ldCIsInV0aSI6IjBCRExDcHdKeFV5Sm9OaWVkN3A5QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImE5ZWE4OTk2LTEyMmYtNGM3NC05NTIwLThlZGNkMTkyODI2YyIsIjExNjQ4NTk3LTkyNmMtNGNmMy05YzM2LWJjZWJiMGJhOGRjYyIsImZkZDdhNzUxLWI2MGItNDQ0YS05ODRjLTAyNjUyZmU4ZmExYyIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.kWXE0EwklBnWAVAvcgQ3slLJE7G44aQkYxt40VF7upuSKZqHdLxVu3L_Nr62oEhnYWI1iMzUjNEFDPrSJRMPplIelLAarNBhvNIYHXEK2qcrmdRGdUseDN1SOKbXZ8iZHePHRueuA9Potwnu_doYTNS9ZazIVrs3m2xPdVYdW30_WDmuwTSca4ILWjBJ1-bFQ34yioTGyfrP9Q118KwsOtCRMpb4p3fSE-o4U2SVaKxTN_1yI7cJZIJ8wP7R869YYQUtwArvmtkjUlNp0f-7ppBgqSTIl26T8_5FpS6nwbSkS7eERIG23eGh8GBj9FGPAl5zpD2OGVaf1_0A02-BCQ',
        "Content-Type": 'application/json',
        Accept:'application/json'  
      },
      data : {
          "accessLevel": "View",
          "allowSaveAs": "false"
        }  
  }
  ) .then((response) => {
      GenerateToken();
      settokenapi(response);
      console.log(response ,'ss')
    })
    .catch((error) => {
      console.log(error,'error');
    });
  
  }

  useEffect(() => {
    GetAllData();
    GetAllData_Case();

  
  }, [GetAllData, GetAllData_Case]);
  return (
    <div style={{ width: "90%", margin: "1px auto"}}>
  <div style={{display:'flex' , justifyContent:'center'}}>
<DashboardWeb />
      </div>
      <br/>
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
          {/* <Budget />
          <br/>
          <LatestOrders/>
          <br/>
          <DoughnutChart/>
          <br/>
          <PieChartGraph/>
          <br/>
          <Sales/> */}
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

    </div>
  );
};
