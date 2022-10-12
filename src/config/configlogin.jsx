export const configlogin = {
  server_address: 'https://samjad-dev-ed.my.salesforce.com/services/oauth2/token',
  RESPONSE_TYPE : 'password',
  CLIENT_ID : '3MVG9l2zHsylwlpRT5qAzO2.FdO9_6HqBTzuUidVrxVFWQjDq3.5Od_fmnlJOZZIkfFH95QZkgZYbfhhbtE64',
  client_Secret :'4BCC027C085744A0D20F5141589CF93F0A265937D13B2BAA7FC0F610EDAE116D',
  // refresh_token : 'QTVgM8rTi9wIU3iCnY8GJ1YLi',
  server_port: '80',
  timeZone: 'Asia/Amman'
};
export const configlogin_2 = {
  server_address: 'https://samjad-dev-ed.my.salesforce.com/services/oauth2/token',
  RESPONSE_TYPE : 'password',
  CLIENT_ID : '3MVG9l2zHsylwlpRT5qAzO2.FdO9_6HqBTzuUidVrxVFWQjDq3.5Od_fmnlJOZZIkfFH95QZkgZYbfhhbtE64',
  client_Secret :'4BCC027C085744A0D20F5141589CF93F0A265937D13B2BAA7FC0F610EDAE116D',
  // refresh_token : 'PeM4Ov4p4M2nlbW6Q1vbFYv2',
  server_port: '80',
  timeZone: 'Asia/Amman'
};
   // 'https://samjad-dev-ed.my.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9l2zHsylwlpRT5qAzO2.FdO9_6HqBTzuUidVrxVFWQjDq3.5Od_fmnlJOZZIkfFH95QZkgZYbfhhbtE64&client_secret=4BCC027C085744A0D20F5141589CF93F0A265937D13B2BAA7FC0F610EDAE116D&username=samjad@gmail.com&password=Salah112233YqOC4NL7ixGAWBlzh376tblJi&'
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