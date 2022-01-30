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
<div style={{display:'flex' , justifyContent:'center'}}>
        <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual and qna
		id: '4e6691d7-5605-4c28-a1d4-2a48ae372871',
		embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=4e6691d7-5605-4c28-a1d4-2a48ae372871&groupId=eb31180a-7ca1-4a8d-b847-cee9bffcc291&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImFuZ3VsYXJPbmx5UmVwb3J0RW1iZWQiOnRydWUsImNlcnRpZmllZFRlbGVtZXRyeUVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwic2tpcFpvbmVQYXRjaCI6dHJ1ZX19',
		accessToken: 'H4sIAAAAAAAEACWWtc7GDHaE7-VvHclMkbYwM7M702tmdpR7z5fd5lSjU4xGM8___GNn7zBn5T___Q8F4nWYbA4zGPHcfdspktJd5ONPYUo5OTw8LF39-aLXuwXGmryVsx4us_IhJbZm5oa1goMeQJQKR6JefYfCITKu-g0StjDj1xx5sjPpZvgMtwwlcmzJD9bsspLB4xNRBC7cfG9CBWkCK4hSFFRa9ULDzOHXoyRUZNJ-ox3ha4rwZMpelSD4ZEDLoi91DLdv07GMj-sWc_VDQc8_1B1ZO6HXPlEwfXiFEsxeY0fiexiA8RiA7OHI9ZwahtaKWGDaOuXxdQZqUNR66bzPD9crma7QRPMnFTAYxO8uXQZApBXr2qcON8GwjFT3xJmeixVUz9sAKjfSEdlYeRhH_TyaT-M00uqCHa1eTjh5GbKr2AHYudCE-cB0nKgb9UralbxsMZpFcbklm9RjdmVI2kOlZTKkIVu1XQozll3EzGwPKT6bLVQ2M6eqL2qap-1E4unNs5EgCxPT0qkp3HOzSGFb8muv-PAJ7gD2m8ZWncvCKfLUUpaBHjs5anzCssvukVE_CiORnoxrSKcSke1LQqT8fnQZs5-OtZMpD2a0uAw0805dUgf9QPDFDhkGnaPqYLFAdZ4QGd-er9FuLsNteoTGJIR3yzkwqoX2KJh9wARmlN7KiHAoTl03Vq6RS6Ae-rFopAkwG2b-DqjTKaZr5-SpYgUSO2yLGg7LMdo96SfvsJViXa31OBdqjDbemhOHcz0yt3M7kgwRYyFn1wKP0im19YNcEJMsWNTwUcbfXFlClBGvYl2a4ukRWRXy1DBNYtg-lcm_kXEj69aGkghehT2A0gBw87glEbqUKLOoUcbmHHU4x5-CEqovIFx1-HoAZosYqRzDmlMKTFKt14xAb75FBd8kVK_QK0nx39fn0ejUVCchDN1JUtRBUQ7li_7UYdf0zTBSuvrVy7yHznGdCd_yPHNprmJDUft7f69Fon3vQ23xKDocMB9JpJfNgou8cy0oHSEqO3qwWbESPtqpXkG9Jm55wAFSVNnsPbxmhXu4PtFZXpEySc0aVCxx7T5XcG3YoYeSqNEwBS6IoMJDwD6Qn-TwZQH0ilCYO0B81CtQuhbDiunGnZI1qc8p7eWUczbtOCUfe0ow1_542aHvVoyPUCKd_2RtioRT-sL2Y0-bpewlj4qNkjz1eu7wOIIQZEc34Qh3aqRDHRhRvo2QmhRVGe-44R8RQf3f9-Ep-H0CeNjCSki9fR1U7b4VcKpvzi6Uad8z9en0MVIWUV-3BFRvhclP_x1coD7eKqpIW0N6UdJ1v2EhEwobWvMJ_8VZx4JioI-_D4_b0VNiM1KOzPyB4ko4nhjE-U2HwBQah3Nmk_NOX1EDCQggKrmZbHLQLl0fQwGkoPAi-loLe_YhNcSOIEf15JTknumRKB8SNR4FO3rX-Vl1PeFBZZ9yODUFShjsOmMWpX_h8rpWTd8GN-3sdc3ZHEK0iu2UuUl79iR7uVrOCexiiWlszinQBCaY_RfIHijbLzzlSeBgE0_LIwX1b149Lbi_5kKS4ibabEuCuwnH2Y3o9yUP0QMXGBow-7LZsDw4d0Jtwel3llnkOMqSmfarjMAP0k_UxIS5pg6l8wxzepQ3VHvwiHBO25f1dPFVOJFyaz8UnJ0x-Y8hskCOuuHGEVGdHyrY-5HdkwhOgWsEX_YRO8-Kh-jtdjyWKVsozIPUQUcCm8VEq3i4AFQH-ZM8Oq0V2g4zkBQH9Cmw8liNSF_W3pn8Vk_BSE9HZyZ5gFjBV9fcn4cFNtWh4eDlwMA0aldB6a8-PPkviaMgoPON9p2EMq1LF7PGAPv2t0H7yeRL__ZeaE5ywQS-y-Z6iQK2tHmE6TKQFoPMk7-HyqQBwkzHkaw05jmwuTbob9kSFD1tQA_Jrzd78rX51-yljkKT8VqffCcQyhjSW-j_cjYwJ__p6pzKG9QEhU3ZPQixHqaweYkJaHQui3UjI8thqFKlSDbKTpQV45el8kBa1zKgNQA0XfccOsXf9QuqlYEjPmnXYZ5X97NKCNrYf0fHStHyG6IBvxe3y0NpnW2bq2PWnvMLZ6GZXj61WoCBOlEccz4RpftcBZawlb2g5E5fhwSCjRgmVWxNGtaM6HnBjd1zrvzUMn-YWPf1ok8rmsNLXvrIsqHeHrghWI8h02MosyVLJpQtzDoO5TykxpWCpYf_-5YyfFImTMnaZUBPNbCvLkGH3x5xAiyFFq7VUsngTraPVhRHrQH_gF5u7V5k-Bjy7p_GvOZHfGlH_tU8Z3340jGF5ZiILJ-pYqhBiASuSzpg3yic4I35hN27bXxH1r2Fnsx8WT-I_gcBzwQzgGQpaNxQCPVWMmECDfTRRO479b2IlTjBge_XmUN5GUX87Yx1CKve_sp2ElK40HJrl6ZZQxOzasQnmyrvc5V6ohtslijNLdJv7nb_2HQ1osXdC1HT3vshUeziYaJJqTBHuTWLKlThAem4oXM550yBGoUNAgF90GCnbJbgadT86XJn-nFuuHEYUQOHghEz-byXX3HjTT2SZTiuJqhbBJZ8kuA8ERl4a-JVaJQhBSDGdgGrimPNmfVsyF9wPIiZitFQGX6J81YDN5fjPCaVRAe_1FAaLuCSlDc7pKBckfRbUd1pcoMH_gLXbdqIlnWhhookVU2Gr42lLH-4B2rdiZNME2bxNkxVINOB8o1Mc3JPY5nyAvzt1YNXTvoOu433uwM9wa94IyluvIapNfV3l7FB9MPytyVJATQWbhPMyh0FDhlUujVIGgbXYVz8Q8QFUZ5OdyvAXkPgffuYOQDBqr7AXjoe0-HMQ4MaU__rX__81z_c9i5_0a_eP8zlN0BuRHQdo7nD1UtvoHXCvXY_myuYFzewQ_L0AbjtNp_nnww-yFD4RdXzosdSPBIP-zWtHw3RFQsSpZ5ctoko8zYlsHM_jDV9nZ9WhieQeAvhDnJcvp5Dyj7UiFOAFv46QVhsMoi-g4LAcGXudrz6Enx5AEI83cIfDpaIRwYE_9kIjbLsAHrWGeVvu52I5n6zel2buoQjs5du04vB-rJg19kR8Rnth7-6fErOH-GYmsbGHPeS2NXNPd1iTYxb4nmwcaxIkbpQr5c46piDXBlOkWgQkwk4lGkOFKWpihv1fAtIz-DClSfHKKvpR2BoNPP7kXgybWpv8vof443KX2E6DX3_x-Z3aapNCf9crj9ppN_Hv--oFbZEgoe5Z51_q7y2nrLj3Ko_2fZmqPuNNYybgBCi0Fg4GNOqMPxK3tn3v-2P0wtOqwJAGCv54wiDpgO5kp1pxi_145FMtyvNz9gfwhbyrv6Z5QJGmDAyMS75jpUmExw8igGZ59RKESv0GzzoNKOS3X8GQXvhQoMU08379EcQrRjgu1QUDr0MRf-8DgjCqVqZsRdSHyG2ktOvtV8jpvKylH7awsiU6BDvK407VBffRLghwiJM7VlH2j5Kj99KGCRBH3Z9gv0qxkpBMTJC502oXU2NhEjciEcAHiIxv3bUX3ECkMKAsdD2JzwkoFK1EsubpncQJSzecuA3IrjhlUMmoh3sJJyXcgeQ75wzDxmGPow4E1b8_5n_3_8D1QuwHdoNAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0=',
		tokenType: models.TokenType.Embed,
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
</div>
<button onClick={GenerateToken}>Refresh</button>
      
    </div>
  );
};
