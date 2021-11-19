import React, { useState } from 'react';
import axios from 'axios';
import { Middleware } from "../../Helper/Middleware.Helper";

export const  Login =() =>{

  const [tokenapi, settokenapi] = useState();
  const [state , setState] = useState();
  const username = useFormInput('');
  const password = useFormInput('');

    const AUTHORIZATION_URL = 'https://samjad-dev-ed.my.salesforce.com/services/oauth2/token';
    const RESPONSE_TYPE = 'password';
    const CLIENT_ID = '3MVG9l2zHsylwlpRT5qAzO2.FdO9_6HqBTzuUidVrxVFWQjDq3.5Od_fmnlJOZZIkfFH95QZkgZYbfhhbtE64';
    const client_Secret='4BCC027C085744A0D20F5141589CF93F0A265937D13B2BAA7FC0F610EDAE116D';
  const  your_refresh_token = 'YqOC4NL7ixGAWBlzh376tblJi';


    const handleLogin = () => {
                // 'https://samjad-dev-ed.my.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9l2zHsylwlpRT5qAzO2.FdO9_6HqBTzuUidVrxVFWQjDq3.5Od_fmnlJOZZIkfFH95QZkgZYbfhhbtE64&client_secret=4BCC027C085744A0D20F5141589CF93F0A265937D13B2BAA7FC0F610EDAE116D&username=samjad@gmail.com&password=Salah112233YqOC4NL7ixGAWBlzh376tblJi&'

      axios.post(`${AUTHORIZATION_URL}?grant_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&client_secret=${client_Secret}&username=${username.value}&password=${password.value}YqOC4NL7ixGAWBlzh376tblJi`)
        .then((response) => {
          settokenapi(response.data.access_token);
          // let data = localStorage.getItem('tokenapi'); 
          // setState(JSON.parse(data)); 
          localStorage.setItem('tokenapi', JSON.stringify(tokenapi));
          console.log(response.data.access_token)
          console.log(retrievedObject);
        })
        .catch((error) => {
          console.error(error)
        });

      }

      var retrievedObject = localStorage.getItem('tokenapi');

      return (
        <div>
        
        <div>
            Username<br />
            <input type="text" {...username}  />
          </div>
          <div style={{ marginTop: 10 }}>
            Password<br />
            <input type="password" {...password}  />
          </div>
    
          {tokenapi}
          <div>

              <button onClick={ ()=>handleLogin()}>Login</button>
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

