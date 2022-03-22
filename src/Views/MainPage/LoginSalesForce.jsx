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
import { HttpServices } from "../../Services copy/HttpMethod.Helper";
export const  LoginSalesForce =() =>{
  const [tokenapi, settokenapi] = useState();

const[cmp , setcmp] = useState(true);
 
  const [states, setStates] = useState({
    username : "samjad@gmail.com",
    password : "Salah11223344",
    token:"",
    showPassword: false,
    username2 : "Zaid-Lawi@gmail.com",
    password2 : "Zaid1122",
    token2:"",
    showPassword2: false,

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
      axios.post(`${configlogin.server_address}?grant_type=${configlogin.RESPONSE_TYPE}&client_id=${configlogin.CLIENT_ID}&client_secret=${configlogin.client_Secret}&username=${states.username}&password=${states.password}53Ob6e5N7DM0BR3W196u1eC2c`)
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
              {/* <div style={{    padding: '5%'}}>
              <TextField
               InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
                        label="Email"
                        value={states.username}
                        onChange={(event) => {
                          setStates((item) => ({
                            ...item,
                            username: event.target.value,
                          }));
                        }}
                      />
     
          </div> */}
          {/* <div>
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

         
</div> */}
{/* 
<div style={{    padding: '5%'}}>
          <Button   type="Submit" color="facebook" disabled={states.username ===""}>
            Log in
          </Button>
          </div> */}
          <div style={{    padding: '5%'}}>
          <Button   type="Submit" color="facebook" >
            {states.username}
                      </Button>
          </div>
{/* <div style={{    padding: '5%'}}>
          <Button   type="Submit" color="facebook" >
          {states.username2}
                      </Button>
          </div> */}
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


// import React, { useState } from 'react';

// function ShoppingCart() {
//   const [cart, setCart] = useState([]);

//   function addItemToCart(e) {
//     const item = e.target.value;
//     console.log(item);
//     setCart([...cart, item]);
//   }

//   return (
//     <div className="app">
//       <div className="items">
//         <button value="MacBook Pro" onClick={addItemToCart}> MacBook Pro</button>
//         <button value="iPhone XS" onClick={addItemToCart}>iPhone XS</button>
//         <button value="Gem" onClick={addItemToCart}> Gem</button>
//         <button value="Teddy Bear" onClick={addItemToCart}> Teddy Bear</button>
//       </div>
//       <div className="cart">
//         Cart
//         <ul>
//           {cart.map(item => <li key={item}>{item}</li>)}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCart;