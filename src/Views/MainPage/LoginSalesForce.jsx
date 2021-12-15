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

export const  LoginSalesForce =() =>{
  const [tokenapi, settokenapi] = useState();

const[cmp , setcmp] = useState(true);
 
  const [states, setStates] = useState({
    username: "samjad@gmail.com",
    password: "Salah122",
    token:""
  });

 
  const onFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    if(states.username === "Zaid-Lawi@gmail.com"){
      axios.post(`${configlogin.server_address}?grant_type=${configlogin.RESPONSE_TYPE}&client_id=${configlogin.CLIENT_ID}&client_secret=${configlogin.client_Secret}&username=${states.username}&password=${states.password}QTVgM8rTi9wIU3iCnY8GJ1YLi`)
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


    return (
<div>
      <ToastContainer />

{cmp ? (
<div >
<div className='d-flex-v-center-h-between' style={{    marginTop: '1%'}}>
            <img  style={{    width: '20%'}} src={psi} alt="lead"></img>
            </div>
      <div className="App">
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
      </div>
      </div>):(<div>
        <Home closeHome={closeHome} states={states}/>
    
    
    </div>)}
   
  </div>
   );
}