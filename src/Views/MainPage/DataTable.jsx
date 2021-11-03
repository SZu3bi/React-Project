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
      }, 3000);
    
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);
      setcount(result.data.length);
    } else setResult(null);
  
  }, []);

  const GetAllData_Case = useCallback(async () => {
 
    const result = await GetMainInfo_Case();
    setcountcase(result.data.length);
    if (result) {
      setTimeout(() => {
        setLoading(false); 
      }, 3000);
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setres(sortedResult);
      console.log('case',result);
    } else setres(null);
   
  }, []);

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
                             <Stack direction="row" spacing={2}>

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
   
    </div>
  );
};
