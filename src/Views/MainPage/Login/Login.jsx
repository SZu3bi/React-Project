import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Middleware } from "../../../Helper/Middleware.Helper";
import { Button, TextField } from '@material-ui/core';
import "./Login.scss";
import { showError, showSuccess } from '../../../Helper/Tostify.Helper';
import { ToastContainer } from 'react-toastify';
import psi from "../../../Views/sales.png";

export const  Login =() =>{

  const [tokenapi, settokenapi] = useState();
  const [state , setState] = useState();
  const username = useFormInput('');
  const password = useFormInput('');

  const [states, setStates] = useState({
    username: "",
    password: ""
  });



    const AUTHORIZATION_URL = 'https://samjad-dev-ed.my.salesforce.com/services/oauth2/token';
    const RESPONSE_TYPE = 'password';
    const CLIENT_ID = '3MVG9l2zHsylwlpRT5qAzO2.FdO9_6HqBTzuUidVrxVFWQjDq3.5Od_fmnlJOZZIkfFH95QZkgZYbfhhbtE64';
    const client_Secret='4BCC027C085744A0D20F5141589CF93F0A265937D13B2BAA7FC0F610EDAE116D';
  const  your_refresh_token = 'YqOC4NL7ixGAWBlzh376tblJi';

  const handleLogin = () => {
   
                // 'https://samjad-dev-ed.my.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9l2zHsylwlpRT5qAzO2.FdO9_6HqBTzuUidVrxVFWQjDq3.5Od_fmnlJOZZIkfFH95QZkgZYbfhhbtE64&client_secret=4BCC027C085744A0D20F5141589CF93F0A265937D13B2BAA7FC0F610EDAE116D&username=samjad@gmail.com&password=Salah112233YqOC4NL7ixGAWBlzh376tblJi&'

      axios.post(`${AUTHORIZATION_URL}?grant_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&client_secret=${client_Secret}&username=${states.username}&password=${states.password}YqOC4NL7ixGAWBlzh376tblJi`)
        .then((response) => {

          settokenapi(response.data.access_token);
          localStorage.setItem('tokenapi', JSON.stringify(tokenapi));
          console.log(response.data.access_token)
          console.log(retrievedObject);
          showSuccess("Login Successfully");
      
        })
        .catch((error) => {
          console.error(error)
        });

      }

      useEffect(() => {

        if(tokenapi!==undefined)
        localStorage.setItem('tokenapi', JSON.stringify(tokenapi));

        localStorage.getItem('tokenapi');
      }, [tokenapi]);

      var retrievedObject = localStorage.getItem('tokenapi');

      return (
              <div className='login-wrapper'>

      <div className='login-content-wrapper'>
        
      <ToastContainer />
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
                        value={states.username}
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
                        value={states.password}
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
                {/* <div>
                {tokenapi}
                </div> */}
              </div>
            </form>

          </div>
        </div>
      </div>
  
    </div>
                   );

}
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

// &username=samjad@gmail.com&password=Salah112233YqOC4NL7ixGAWBlzh376tblJi&
// https://login.salesforce.com/services/oauth2/callback

// public HttpResponse getResponse(String url) {
//   Http httpProtocol = new Http();
//   HttpRequest request = new HttpRequest();
//   request.setEndPoint(url);
//   request.setMethod('GET');
//   string encodedHeaderValue = EncodingUtil.base64Encode(Blob.valueOf(
//           this.connectioninfo.username + ':' + 
//           this.connectionInfo.password));
//   request.setHeader('Authorization', 'Basic ' + encodedHeaderValue);
//   HttpResponse response = httpProtocol.send(request);
//   return response;
// }

