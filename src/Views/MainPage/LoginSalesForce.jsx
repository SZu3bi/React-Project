import React, { Component, useCallback, useEffect, useState } from "react";
import "../../../src/App.css";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import axios from 'axios';
import { showError, showSuccess } from '../../Helper/Tostify.Helper';
import { ToastContainer } from 'react-toastify';
import { Home } from '../../Views/MainPage/Home';
import {configlogin} from '../../config/configlogin'
import psi from "../../Views/sales.png";
import Sur from "../../Views/sur.jpg";
import Salesforce from "../../Views/salesforce.gif";
import './LoginSalesForce.scss'
import { Input } from "@mui/material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@material-ui/core";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export const  LoginSalesForce =() =>{
  const [tokenapi, settokenapi] = useState();

const[cmp , setcmp] = useState(true);
 
  const [states, setStates] = useState({
    username : "samjad@gmail.com",
    password : "Salah1122",
    token:"",
    showPassword: false,

  });

 
  const onFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    if(states.username === "Zaid-Lawi@gmail.com"){
      axios.post(`${configlogin.server_address}?grant_type=${configlogin.RESPONSE_TYPE}&client_id=${configlogin.CLIENT_ID}&client_secret=${configlogin.client_Secret}&username=${states.username}&password=${states.password}Q1E6OOQuzAy74GyWBXK9Kwhy`)
      .then((response) => {
        settokenapi(response.data.access_token);
        localStorage.setItem('tokenapi', JSON.stringify(tokenapi));
        console.log(response.data.access_token)
        console.log(retrievedObject);
        showSuccess("Login Successfully");

        setTimeout(() => {
          setcmp(false);
        }, 500);
     
    
      })
      .catch((error) => {
        console.log(error,'error');
        showError("Login Fail");

        console.error(error)
      });
    }else{
      axios.post(`${configlogin.server_address}?grant_type=${configlogin.RESPONSE_TYPE}&client_id=${configlogin.CLIENT_ID}&client_secret=${configlogin.client_Secret}&username=${states.username}&password=${states.password}PeM4Ov4p4M2nlbW6Q1vbFYv2`)
      .then((response) => {
        settokenapi(response.data.access_token);
        localStorage.setItem('tokenapi', JSON.stringify(tokenapi));
        console.log(response.data.access_token)
        console.log(retrievedObject);
        showSuccess("Login Successfully");

        setTimeout(() => {
          setcmp(false);
        }, 500);
     
    
      })
      .catch((error) => {
        console.log(error,'error');
        showError("Login Fail");

        console.error(error)
      });
    }
   

      })

      const logout =()=>{
        localStorage.setItem('tokenapi',null);

        setStates({
          username: "",
          password: "",})

      }

      const closeHome = () =>{
        setcmp(true);
      }

 

      useEffect(() => {
      
        if(tokenapi!==undefined)
        localStorage.setItem('tokenapi', JSON.stringify(tokenapi));

        localStorage.getItem('tokenapi');
      }, [tokenapi]);

      var retrievedObject = localStorage.getItem('tokenapi');

      const handleChange = (prop) => (event) => {
        setStates({ ...states, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setStates({
          ...states,
          showPassword: !states.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    return (
<div >
      <ToastContainer />

{cmp ? (
<div >
<div className='d-flex-v-center-h-between' style={{    marginTop: '1%'}}>
            </div>
<div className="designform">
<div  className="designformSec">
<img  className="picdesign" src={Salesforce} alt="lead"></img>
                </div>
            <div className="designformInput">
            <form onSubmit={onFormSubmit}>
              <div style={{    padding: '5%'}}>
              <TextField
               InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
                        label="Email"
                        // variant="filled"                     
                        value={states.username}
                        onChange={(event) => {
                          setStates((item) => ({
                            ...item,
                            username: event.target.value,
                          }));
                        }}
                      />
     
          </div>
          <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={states.showPassword ? 'text' : 'password'}
            value={states.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {states.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
          {/* <TextField
                        label="password"
                        variant="filled"             
                        value={states.password}
                        onChange={(event) => {
                          setStates((item) => ({
                            ...item,
                            password: event.target.value,
                          }));
                        }}
                      /> */}
         
</div>
<div style={{    padding: '5%'}}>
          <Button   type="Submit" color="facebook" disabled={states.username ===""}>
            Log in
          </Button>
          </div>
        </form>
              
              </div>
           
              </div>
      {/* <div className="App">
        <form className="form" onSubmit={onFormSubmit}>
          <CustomInput
            labelText="Email"
            id="email"
            value={states.username}
            formControlProps={{
              fullWidth: true
            }}
            handleChange={(event) => {
              setStates((item) => ({
                ...item,
                username: event.target.value,
              }));
            }}
            type="text"
          />
          <CustomInput
            labelText="Password"
            id="password"
            value={states.password}
            formControlProps={{
              fullWidth: true
            }}
            handleChange={(event) => {
              setStates((item) => ({
                ...item,
                password: event.target.value,
              }));
            }}
            type="password"
          />

          <Button type="button" type="Submit" color="primary" className="form__custom-button">
            Log in
          </Button>
        </form>
      </div> */}
      </div>):(<div>
        <Home closeHome={closeHome} states={states}/>
    
    
    </div>)}
   
  </div>
   );
}