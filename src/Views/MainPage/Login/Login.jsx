import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Middleware } from "../../../Helper/Middleware.Helper";
import { Button, TextField } from '@material-ui/core';
import "./Login.scss";
import { showError, showSuccess } from '../../../Helper/Tostify.Helper';
import { ToastContainer } from 'react-toastify';
import psi from "../../../Views/sales.png";
import { Home } from '../Home';
import {configlogin} from '../../../config/configlogin'
export const  Login =() =>{

  const [tokenapi, settokenapi] = useState();
  const [errors, seterror] = useState();

const[cmp , setcmp] = useState(true);
  const [states, setStates] = useState({
    username: null,
    password: null
  });



  const handleLogin = (props) => {

      axios.post(`${configlogin.server_address}?grant_type=${configlogin.RESPONSE_TYPE}&client_id=${configlogin.CLIENT_ID}&client_secret=${configlogin.client_Secret}&username=${states.username}&password=${states.password}${configlogin.refresh_token}`)
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
  
        {cmp ? (
          
              <div className='login-wrapper'>

      <div className='login-content-wrapper'>
        
        <div className='box-section-wrapper'>
       

          <div className='box-content'>
            <div className='d-flex-v-center-h-between'>
            <img  style={{    width: '15%'}} src={psi} alt="lead"></img>
            </div>
            <form noValidate className='form-wrapper'>
         
            <TextField
                        required
                        id="outlined-required"
                        label="User Name"
                        variant="outlined"
                        error={states.username === "" ? "error" : null}
                        value={states.username || ''}
                        autoComplete="User Name"

                        onChange={(event) => {
                          setStates((item) => ({
                            ...item,
                            username: event.target.value,
                          }));
                        }}
                      />
               <TextField
                        required
                      
                        id="outlined-required"
                        label="password"
                        variant="outlined"
                        type="password"
                        error={states.password === "" ? "error" : null}
                        value={states.password || ''}
              

                        onChange={(event) => {
                          setStates((item) => ({
                            ...item,
                            password: event.target.value,
                          }));
                        }}
                      />
              <div className='d-flex-v-center-h-between mb-3'>

              </div>
              <div className='d-flex-v-center-h-end'>
              <div>
                  <Button class="glow-on-hover" onClick={ ()=>handleLogin()}>
                    <span>Login</span>
                  </Button>
                </div>
                <br/>
              </div>
            </form>
            

          </div>
        </div>
      </div>
      <ToastContainer />
    </div>):(<div>
<Home closeHome={closeHome}/>
    </div>)}


    </div>
);
}




