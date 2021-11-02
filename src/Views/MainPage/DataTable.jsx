import React, { useEffect, useState, useCallback } from "react";
import { showError, showSuccess } from "../../Helper/Tostify.Helper";
import { ToastContainer } from "react-toastify";
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
import CircularProgress from "@material-ui/core/CircularProgress";

export const DataTable = () => {
  const [result, setResult] = useState();
  const [res, setres] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [page2, setPage2] = React.useState(0);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(2);
  const [loading, setLoading] = useState(true);
  const [count, setcount] = useState();
  const [countCon, setcountCon] = useState();
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
    setLoading(true);
    const result = await GetMainInfo_Contact();
    if (result) {
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);
      console.log("Array Result", result);
      setcount(result.data.length);
    } else setResult(null);
    setLoading(false);
  }, []);

  const GetAllData_Case = useCallback(async () => {
    setLoading(true);
    const result = await GetMainInfo_Case();
    if (result) {
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setres(sortedResult);
      // setcountCon(res.length);
      // console.log('case length',res.length);
      console.log('case',res);
    } else setres(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    GetAllData();
    GetAllData_Case();
  }, [GetAllData, GetAllData_Case]);

  return (
    <div style={{ width: "90%", margin: "1px auto" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {count !== 0 ? (
            <div>
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
              </TableContainer>
            </div>
          ) : (
            "No Data"
          )}
          <br />

          {countCon  !== 0 ? (
            <div>
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
            </div>
          ) : (
            "No Data"
          )}
        </div>
      )}
    </div>
  );
};
