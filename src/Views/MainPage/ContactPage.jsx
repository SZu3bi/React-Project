import React, { useEffect, useState, useCallback, useRef } from "react";
import { showError, showSuccess } from "../../Helper/Tostify.Helper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import {
  CreateMainInfo_Contact,
  GetMainInfo_Contact,
  DeleteInfo_Contact,
  Clone_Contact,
} from "../../Services/APIServices_2";
import { Source } from "./Option/Option";
import { GetMainInfo_Case } from "../../Services/APIServices";
import { ContactPageupsert } from "./ContactPageupsert";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import psi from "../../Views/sales.png";
import nocontact from "../../Views/nodata.png";
import { Rating, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Fab, IconButton } from "@material-ui/core";
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Spinner } from "../MainPage/SpinnerComponent/Spinner";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import token from '../../config/token-address.json'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
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
}));

export const ContactPage = (props) => {
  const [states, setStates] = useState({
    name: "",
    phone: "",
    email: "",
    firstname: "",
    leadSource: "",
    rate: 0,
    active: false,
    amount: 0,
  });

 

  const [isLoading, setIsLoading] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openContactAdd, setOpenContactAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState();
  const [casedata, setCasedata] = useState();
  const [EditVal, setEditVal] = useState();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [collapseView, setCollapseView] = useState(false);
  const [count, setcount] = useState();
  const [Count, setCount] = useState();
  const [countcase, setcountcase] = useState();
  const [openm, setOpenm] = useState(false);
  const handleOpenm = () => setOpenm(true);
  const handleClosem = () => setOpenm(false);
  const timerIdRef = useRef(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleOpenD = () => setOpenD(true);


  const handleCloseD = () => 
  {
  setOpenD(false);
  }
  
  const classes = useStyles();
  const openvalchangeContact = () => {
    setOpen(false);
  };

  const startHandler = () => {
    if (timerIdRef.current) {
      return;
    }
    timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
  };

  const stopHandler = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = 0;
  };

  const clearState = () => {
    setStates({
      name: "",
      phone: "",
      email: "",
      firstname: "",
      leadSource: "",
      rate: 0,
      active: false,
      amount: 0,
    });
  };

  const handleClickOpen = (id) => {
    //   console.log('subject: ', name.subject);
    if (id == 1) {
      setOpenContactAdd(true);
    } else if (id == 3) {
      window.print();
    }
  };
  const handleClose = () => {
    setOpenContactAdd(false);
  };

  const actions = [
    { icon: <AddIcon />, name: "Add", id: 1 },
    { icon: <PrintIcon />, name: "Print", id: 3 },
    { icon: <ShareIcon />, name: "Share", id: 4 },
  ];

  const OpenAdd = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const CloseAdd = () => {
    setAnchorEl(null);
    handleClickOpen();
  };

  const handleChange = (panel) => (index, collapseView) => {
    setCollapseView(collapseView ? panel : false);
  };

  const info = (id, name) => {
    showSuccess(`${id}` + "\n" + `${name}`);
  };

 


  const GetAllData = useCallback(async () => {
    const result = await GetMainInfo_Contact();
    if (result) {

      setcount(result.data.length);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);

    } else setResult(null);
  }, []);

  // const CaseData = useCallback(async () => {
  //   const result = await GetMainInfo_Case();
  //   if (result) {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 3000);
  //     const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
  //     setCasedata(sortedResult);
  //   } else setCasedata(null);
  // }, []);


  
  const hundle = () => {
    if (states.name !== "") {
      handleCreateButtons_2();

    } else showError("Fill Name ");
  };

  const handleCreateButtons_2 = async () => {
    setLoading(true);
    handleCloseD();
    const result = await CreateMainInfo_Contact(states);
    if (result){
     clearState();
    showSuccess("Create Successfully");
    setSuccess(false);
    GetAllData();
    setLoading(false);
    handleClose();
    }else{
      GetAllData();
      handleClose();
    }
  };

  const handleDeleteButton = async (deletedId) => {
    setLoading(false);
    setOpenm(false);
    const result = await DeleteInfo_Contact(deletedId);
    if (result) {
      GetAllData();
      showSuccess("Deleted Successfully");
    } else {
      showError("Delete Failed");
    }
  };
  const clone = async (clonedId) => {
    setLoading(false);
    setOpenm(false);
    const result = await Clone_Contact(clonedId);
    if (!(result && result.LeadSource && result.LeadSource !== 'Web' )) {
      showSuccess('Contact cloned successfully');
      GetAllData();

      setIsLoading(false);
    } else { showError('Contact clone failed');}
  };

  const handleStaffRatingChange = (event) => {
    setStates((item) => ({ ...item, rate: event.target.value }));
  };

  const textArea = useRef(null);

  const textAreaRefnum = useRef(null);
  const copyTextToClipboard = (Id) => {
    if (Id) {
      const context = textArea.current;
      context.value = Id;
      context.select();
      document.execCommand('copy');
      showSuccess(`Copy id successfully  (${Id})`);
      console.log('id', Id)

    
    }
  };



  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);

  useEffect(() => {
    GetAllData();
  }, [GetAllData]);
  useEffect(() => {
    localStorage.getItem('tokenapi');
  }, []);

  return (
    <div className="Agents-wrapper view-wrapper">
      {open && (
        <ContactPageupsert
          open={open}
          DTO={EditVal}
          GetAllData={() => GetAllData()}
          openvalchangeContact={openvalchangeContact}
        />
      )}

      <div>
        {count !== 0 ? (
          <div>
            {result &&
              result.map((s, index) => (
                <div className="users-card-wrapper">
                  {loading ? (
                    <div className="users-card-wrapper">
                      <Stack spacing={1}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={50} height={50} />
                        <Skeleton
                          variant="rectangular"
                          width={300}
                          height={200}
                        />
                      </Stack>
                    </div>
                  ) : (
                    // <CircularProgress />
                    <div
                      className={
                        s.Active__c === true
                          ? "cards-wrapper-active"
                          : "cards-wrapper-notactive"
                      }
                    >
                      <Spinner isActive={isLoading} isAbsolute />
                      <div className="cards-header">
                        <div className="item-wrapper">
                        <div style={{display:'flex'}}>
                          <div>
                          <img
                            id="avatar"
                            className="user-cover-image"
                            src={psi}
                            alt="lead"
                          ></img>
                          </div>
                          {/* <div>Timer: {count}s</div>
      <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
      </div> */}
         <div style={{marginLeft:'15%'}}>
                        
                        {(((s &&
                        s.LeadSource === 'Web') && (
                          <div style={{display: 'flex'}}>
                            <div style={{    display: 'flex',
    alignItems: 'center' , marginRight: '10%',
    fontFamily: 'cursive',
    fontWeight: 'bold'}}>
                            <span>Clone</span>
                            </div>
                            <div>
                           <Tooltip title="Clone">
                              <Fab
                                size='small'
                                aria-label='clone'
                                label='clone'
                                onClick={() => clone(s.Id)}
                              >
                                <span className='mdi mdi-animation-outline mdi-18px' />
                              </Fab>
                            </Tooltip>
                            </div>
                            </div>
                         
                        )) ||
                        '')}
                        {/* <Tooltip title="Clone">
                              <Fab
                                size='small'
                                aria-label='clone'
                                label='clone'
                                onClick={() => clone(s.Id)}
                              >
                                <span className='mdi mdi-animation-outline mdi-18px' />
                              </Fab>
                            </Tooltip> */}
                    
                       </div>
                       </div>
                        </div>
                        <div className="d-flex-column">
                          <div className="item-wrapper px-2">
                            
                            <span className="item-header-ellipsis">
                             
                            </span>
                          </div>
                          {/* <div className="item-wrapper">
                            <span className="item-header-ellipsis px-2">
                              username
                            </span>
                            <span className="item-body">
                              {s.FirstName || "N/A"}
                            </span>
                          </div> */}
                          <div className="item-wrapper"></div>
                        </div>
                      </div>
                      <div className="cards-body">
                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-account px-2" />
                            <span>Name:</span>
                          </span>
                          <span className="item-header-ellipsis"> {s.Name}</span>
                   
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-account px-2" />
                            <span>Id:</span>
                            {s.Id}
                            <textarea readOnly aria-disabled value={s.Id} ref={textArea} />

                          </span>
                          <Tooltip title="Copy">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              copyTextToClipboard(s.Id);
                            }}
                            className='mdi mdi-content-copy'
                          />
                        </Tooltip>
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-phone px-2" />
                            <span>mobile:</span>
                          </span>
                          <span className="item-body">{s.Phone || "N/A"}</span>
                        </div>
                        {/* <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-phone px-2" />
                            <span>Active:</span>
                          </span>
                          <span className="item-body">
                            {" "}
                            {s.Active__c === true ? "Active" : "Not Active"}
                          </span>
                        </div> */}
                        <div className="item-wrapper flex-nowrap">
                          <div className="texts-truncate d-flex">
                            <span className="item-header">
                              <a
                                style={{ textDecoration: "auto", color: "red" }}
                                href={`mailto:${s.Email}&text=Hi ${s.Name} From Psi Amman.`}
                              >
                                {" "}
                                <span className="mdi mdi-email-outline px-2" />
                                Email:
                              </a>

                              <span></span>
                            </span>
                            <span
                              className="item-body texts-truncate d-inline-block"
                              // title={email|| 'N/A'}
                            >
                              {s.Email || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header">
                            <a
                              style={{ textDecoration: "auto", color: "green" }}
                              href={`https://api.whatsapp.com/send/?phone=${s.Phone}&text=Hi ${s.Name} From Psi Amman.`}
                              target="_blank"
                            >
                              {" "}
                              <span className="mdi mdi-whatsapp px-2" />
                              WhatsApp
                            </a>
                          </span>
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-map-marker px-2" />
                            <span>nationality:</span>
                          </span>
                          <span className="item-body">Jordan</span>
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-calendar-blank px-2" />
                            <span>register:</span>
                          </span>
                          <span className="item-body">
                            {/* {s.CreatedDate} */}
                            {(s.CreatedDate &&
                              moment(s.CreatedDate).format("DD/MM/YYYY")) ||
                              "N/A"}
                          </span>
                        </div>

                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-currency-usd px-2" />
                            <span>Amount:</span>
                          </span>
                          <span className="item-body">{s.Amount__c}</span>
                        </div>
                        <div className="item-wrapper mb-3">
                          <span className="item-header">
                            <span className="mdi mdi-file-document-edit px-2" />
                            <span>data-source:</span>
                          </span>
                          <span className="item-body">{s.LeadSource}</span>
                        </div>

                        <div className="item-wrapper-%">
                          <span className="item-header">
                            <span className="mdi mdi-focus-field-horizontal px-2" />
                            <span>Field Fill Status</span>
                          </span>
                          {/* <span className="item-body">{s.Fill__c || null}</span> */}
                        </div>
                        <div>
                          <Box>
                            <Box sx={{ width: "100%", mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={s.Fill__c}
                              />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >{`${Math.round(s.Fill__c)}%`}</Typography>
                            </Box>
                          </Box>
                        </div>
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
                      </div>
                      <div className="item-wrapper actions">
                        <IconButton
                          size="small"
                          color="inherit"
                          className="button-edit"
                        >
                          <EditIcon
                            onClick={() => {
                              setOpen(true);
                              setEditVal(s);
                            }}
                          ></EditIcon>
                        </IconButton>
                        <div>
                          <IconButton
                            size="small"
                            color="inherit"
                            className="button"
                          >
                            <DeleteForeverIcon
                              onClick={handleOpenm}
                            ></DeleteForeverIcon>
                          </IconButton>
                          <Modal
                            open={openm}
                            onClose={handleClosem}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className="MuiBox-root"
                          >
                            <Box sx={style}>
                              <div>
                                <div>
                                  {" "}
                                  "Do you really want to delete this Contact?"
                                </div>
                                <br/>
                                <div className="confirmbtn">
                                  <ButtonGroup
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    aria-label="contained primary button group"
                                  >
                                    <Button
                                      onClick={() => {
                                        handleDeleteButton(s.Id);
                                      }}
                                    >
                                      Yes
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={handleClosem}
                                    >
                                      No
                                    </Button>
                                  </ButtonGroup>
                                 
                                </div>
                              </div>
                            </Box>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

            <br />
          </div>
        ) : (
          <div>
            <img
            alt="ss"
              style={{
                borderRadius: "5px",
                filter: "drop-shadow(2px 4px 6px black)",
                width: "45%",
              }}
              src={nocontact}
            ></img>
          </div>
        )}

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
                // onClick={()=>console.log("id",action.id)}
              />
            ))}
          </SpeedDial>
        </div>
        <div>
          <ToastContainer />

          <Dialog
            fullScreen={fullScreen}
            open={openContactAdd}
            className="D1"
            maxWidth={"xl"}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <ToastContainer />
              {loading ? (
                <Box>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </Box>
              ) : (
                <div className="div1">
                  <div>
                    <Checkbox
                      checked={states.active}
                      onChange={(event) => {
                        setStates((item) => ({
                          ...item,
                          active: event.target.checked,
                        }));
                      }}
                      label="Active"
                      color="success"
                    ></Checkbox>
                    <span>Active</span>
                  </div>
                  <form className={classes.root} noValidate autoComplete="off">
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        variant="outlined"
                        error={states.name === "" ? "error" : null}
                        value={states.name}
                        onChange={(event) => {
                          setStates((names) => ({
                            ...names,
                            name: event.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="User Name"
                        variant="outlined"
                        error={states.firstname === "" ? "error" : null}
                        value={states.firstname}
                        onChange={(event) => {
                          setStates((names) => ({
                            ...names,
                            firstname: event.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Phone"
                        variant="outlined"
                        error={states.phone === "" ? "error" : null}
                        value={states.phone}
                        onChange={(event) => {
                          setStates((item) => ({
                            ...item,
                            phone: event.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        variant="outlined"
                        error={states.email === "" ? "error" : null}
                        value={states.email}
                        onChange={(event) => {
                          setStates((item) => ({
                            ...item,
                            email: event.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Amount"
                        variant="outlined"
                        error={states.amount === "" ? "error" : null}
                        value={states.amount}
                        onChange={(event) => {
                          setStates((item) => ({
                            ...item,
                            amount: event.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        select
                        error={states.leadSource === "" ? "error" : null}
                        className={classes.textField}
                        label="Lead Source"
                        helperText="Please select lead Source"
                        variant="outlined"
                        value={states.leadSource}
                        onChange={(event) => {
                          setStates((item) => ({
                            ...item,
                            leadSource: event.target.value,
                          }));
                        }}
                      >
                        {Source.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </form>
                  <div className="rate-class">
                    <Rating
                      name="text-feedback"
                      value={states.rate}
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                      onChange={handleStaffRatingChange}
                    />
                    <span>Rate</span>
                  </div>
                </div>
              )}
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <ButtonGroup
                variant="contained"
                size="large"
                color="primary"
                aria-label="contained primary button group"
              >
                <Button onClick={hundle}>Save</Button>
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
  );
};
