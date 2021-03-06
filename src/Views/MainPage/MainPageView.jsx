import React, { useEffect, useState, useCallback, useRef } from "react";
import { showError, showSuccess } from "../../Helper/Tostify.Helper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import {
  CreateMainInfo_Case,
  DeleteInfo_Case,
  GetMainInfo_Case,
} from "../../Services/APIServices";
import { Origin, Priority, State } from "./Option/Option";
import { MainPageDialogView } from "./MainPageDialogView";
import { GetMainInfo_Contact } from "../../Services/APIServices_2";
import { ReportPage } from "./ReportPage";
import { Picture } from "./Picture";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import psi from "../../Views/sales.png";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@material-ui/core";
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import nocontact from "../../Views/nodata.png";

const getSteps = () => {
  return [
    "Fill Subject",
    "Select Contact",
    "Select Status",
    "Select Origin",
    "Select Priority",
  ];
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    margin: theme.spacing(1),
    width: "25ch",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    fontSize: "x-large",
    fontFamily: "fantasy",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export const MainPageView = () => {
  const [openD, setOpenD] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openn, setOpenn] = useState(false);
  const [o, setO] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [p, setP] = useState(false);
  const [res, setres] = useState();
  const [rescon, setrescon] = useState();
  const [EditVal, setEditVal] = useState();
  const [loading, setLoading] = useState(true);
  const [countcase, setcountcase] = useState();

  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    subject: "",
    status: "",
    origin: "",
    priority: "",
    contact: "",
  });
  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const classes = useStyles();
  const actions = [
    { icon: <AddIcon />, name: "Add", id: 1 },

    { icon: <PrintIcon />, name: "Print", id: 3 },
    { icon: <ShareIcon />, name: "Share", id: 4 },
  ];

  const handleOpenD = () => setOpenD(true);
  const handleCloseD = () => setOpenD(false);

  const GetAllData = useCallback(async () => {
    const result = await GetMainInfo_Case();
    if (result) {
      setcountcase(result.data.length);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setres(sortedResult);
    } else setres(null);
  }, []);
  const GetContact = useCallback(async () => {
    const result = await GetMainInfo_Contact();
    if (result) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setrescon(sortedResult);
    } else setres(null);
  }, []);

  const clearState = () => {
    setState({
      subject: "",
      status: "",
      origin: "",
      priority: "",
    });
    handleReset();
  };

  const hundle = () => {
  
    if (state.subject !== "") {
      handleCreateButton();
    

    } else showError("Fill Subject");
  };

  const handleCreateButton = async () => {
    setOpenD(false);
    const result = await CreateMainInfo_Case(state);
    if (result){
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    state.subject = "";
    clearState();
    handleReset();
    showSuccess("Create Successfully");
    GetAllData();
    handleClose();
    }else{
      handleClose();
      GetAllData();
    }
  };

  const handleDeleteButton = async (deletedId) => {
    const result = await DeleteInfo_Case(deletedId);
    if (result) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      showSuccess("Deleted Successfully");
      GetAllData();
    } else showError("Delete Failed");
  };

  const handleClickOpen = () => {
    setOpenn(true);
  };
  const handleClose = () => {
    setOpenn(false);
  };
  const openvalchange = () => {
    setOpen(false);
  };
  const openReport = () => {
    setO(false);
  };
  const openPicture = () => {
    setP(false);
  };
  const Open = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const Close = () => {
    setAnchorEl(null);
    handleClickOpen();
  };
  const steps = getSteps();

  useEffect(() => {
    GetAllData();
    GetContact();
  }, [GetAllData, GetContact]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              required
              id="outlined-required"
              label="Subject"
              variant="outlined"
              error={state.subject === "" ? "error" : null}
              value={state.subject}
              onChange={(event) => {
                setState((item) => ({ ...item, subject: event.target.value }));
              }}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <TextField
              id="outlined-required"
              select
              error={state.contact === "" ? "error" : null}
              className={classes.textField}
              label="Contact"
              value={state.contact}
              helperText="Please select Contact"
              variant="outlined"
              onChange={(event) => {
                setState((item) => ({ ...item, contact: event.target.value }));
              }}
            >
              {rescon &&
                rescon.map((option) => (
                  <MenuItem key={option.Id} value={option.Id}>
                    {option.Name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
        );
      case 2:
        return (
          <div>
            <TextField
              id="select-Status"
              select
              error={state.status === "" ? "error" : null}
              className={classes.textField}
              label="Status"
              value={state.status}
              helperText="Please select Status"
              variant="outlined"
              onChange={(event) => {
                setState((item) => ({ ...item, status: event.target.value }));
              }}
            >
              {State.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        );
      case 3:
        return (
          <div>
            <TextField
              id="select-origin"
              select
              error={state.origin === "" ? "error" : null}
              className={classes.textField}
              label="Origin"
              helperText="Please select Origin"
              variant="outlined"
              value={state.origin}
              onChange={(event) => {
                setState((item) => ({ ...item, origin: event.target.value }));
              }}
            >
              {Origin.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        );
      case 4:
        return (
          <div>
            <TextField
              id="select-priority"
              select
              error={state.priority === "" ? "error" : null}
              className={classes.textField}
              label="Priority"
              helperText="Please select Priority"
              variant="outlined"
              value={state.priority}
              onChange={(event) => {
                setState((item) => ({ ...item, priority: event.target.value }));
              }}
            >
              {Priority.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <div className="overflow">
      <div className="Agents-wrapper view-wrapper">
        {open && (
          <MainPageDialogView
            open={open}
            DTO={EditVal}
            GetAllData={() => GetAllData()}
            openvalchange={openvalchange}
            o={o}
            setO={setO}
          />
        )}
        {o && <ReportPage open={o} openReport={openReport} />}
        {p && <Picture open={p} openPicture={openPicture} />}

        
    
        <div>
          <div style={{ display: "inline-block" }}></div>
          {countcase !==0 ? (

        
<div>
          {res &&
            res.map((s, index) => (
              <div className="users-card-wrapper">
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Stack spacing={1}>
                      <Skeleton variant="text" />
                      <Skeleton variant="circular" width={50} height={50} />
                      <Skeleton
                        variant="rectangular"
                        width={350}
                        height={200}
                      />
                    </Stack>
                  </div>
                ) : (
                  // <CircularProgress />
                  <div className="cards-wrapper">
                    <div className="cards-header">
                      <div className="item-wrapper">
                        <img
                          id="avatar"
                          className="user-cover-image"
                          src={psi}
                          alt="lead"
                        ></img>
                      </div>
                      <div className="d-flex-column">
                        <div className="item-wrapper px-2">
                          <span className="item-header">{s.Subject}</span>
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header px-2">Status</span>
                          <span className="item-body">{s.Status}</span>
                        </div>
                        <div className="item-wrapper"></div>
                      </div>
                    </div>
                    <div className="cards-body">
                      <div className="item-wrapper">
                        <span className="item-header">
                          <span className="mdi mdi-account px-2" />
                          <span style={{ color: "red" }}>Case For:</span>
                        </span>
                        <span className="item-body" style={{ color: "red" }}>
                          {s.Contact.Name}
                        </span>
                      </div>
                      <div className="item-wrapper">
                        <span className="item-header">
                          <span className="mdi mdi-account px-2" />
                          <span>ContactId:</span>
                        </span>
                        <span className="item-body">{s.ContactId}</span>
                      </div>
                      <div className="item-wrapper">
                        <span className="item-header">
                          <span className="mdi mdi-phone px-2" />
                          <span>mobile:</span>
                        </span>
                        <span className="item-body">
                          {s.Contact.Phone || "N/A"}
                        </span>
                      </div>
                      <div className="item-wrapper flex-nowrap">
                        <div className="texts-truncate d-flex">
                          <span className="item-header">
                            <span className="mdi mdi-email-outline px-2" />
                            <span>email:</span>
                          </span>
                          <span className="item-body texts-truncate d-inline-block">
                            {s.Contact.Email || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="item-wrapper">
                        <span className="item-header">
                          <span className="mdi mdi-calendar-blank px-2" />
                          <span>register:</span>
                        </span>
                        <span className="item-body">
                          {(s.CreatedDate &&
                            moment(s.CreatedDate).format("DD/MM/YYYY")) ||
                            "N/A"}
                        </span>
                      </div>
                      <div className="item-wrapper">
                        <span className="item-header">
                          <span className="mdi mdi-account-check px-2" />
                          <span>Priority:</span>
                        </span>
                        <span className="item-body">{s.Priority}</span>
                      </div>
                      <div className="item-wrapper mb-3">
                        <span className="item-header">
                          <span className="mdi mdi-file-document-edit px-2" />
                          <span>Origin:</span>
                        </span>
                        <span className="item-body">{s.Origin}</span>
                      </div>
                    </div>
                    <div className="item-wrapper actions">
                      <IconButton
                        className="button"
                        size="small"
                        color="inherit"
                      >
                        <EditIcon
                          onClick={() => {
                            setOpen(true);
                            setEditVal(s);
                          }}
                        ></EditIcon>
                      </IconButton>
                      <IconButton
                        className="button"
                        size="small"
                        color="inherit"
                      >
                        <DeleteForeverIcon
                          onClick={() => handleDeleteButton(s.Id)}
                        ></DeleteForeverIcon>
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>
            ))}
            </div>): <div >
         <img style={{ borderRadius: '5px' , filter: 'drop-shadow(2px 4px 6px black)' ,width: '45%'}} src={nocontact}></img>
         </div>}
          <div className="speedDial no-printme">
            {/* <Backdrop open={openD} /> */}
            <SpeedDial
              ariaLabel="SpeedDial uncontrolled open example"
              icon={<SpeedDialIcon />}
              onClose={handleCloseD}
              onOpen={handleOpenD}
              open={openD}
              direction="left"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  id={action.id}
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleClickOpen(action.id)}
                />
              ))}
            </SpeedDial>
          </div>

          <div>
            <ToastContainer />

            <Dialog
              fullScreen={fullScreen}
              open={openn}
              maxWidth={"xl"}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              {loading ? (
                <Box>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </Box>
              ) : (
                <DialogContent>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                          <Typography>{getStepContent(index)}</Typography>
                          <div className={classes.actionsContainer}>
                            <div>
                              <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                              >
                                Back
                              </Button>
                              {activeStep === steps.length - 1 ? null : (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleNext}
                                  className={classes.button}
                                >
                                  Next
                                </Button>
                              )}
                                
                              {activeStep === steps.length - 1 ? (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={hundle}
                                  className={classes.button}
                                >
                                  Finish
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === steps.length && (
                    <Paper
                      square
                      elevation={0}
                      className={classes.resetContainer}
                    >
                      <Typography>
                        All steps completed - you&apos;re finished
                      </Typography>
                    </Paper>
                  )}
                  <ToastContainer />
                  {loading ? (
                    <CircularProgress size={50} />
                  ) : (
                    <div className="div1"></div>
                  )}
                </DialogContent>
              )}
              <DialogActions style={{ justifyContent: "center" }}>
                <ButtonGroup
                  variant="contained"
                  size="large"
                  color="primary"
                  aria-label="contained primary button group"
                >
                  {/* <Button onClick={hundle}>Save</Button> */}
                  <Button
                    color="inherit"
                    onClick={() => {
                      clearState();
                    }}
                  >
                    Clear
                  </Button>
                  <Button color="secondary" onClick={handleClose}>
                    Exit
                  </Button>
                </ButtonGroup>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
