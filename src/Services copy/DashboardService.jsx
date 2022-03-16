import axios from "axios";
import { showError } from "../Helper/Tostify.Helper";
import { HttpServices } from "./HttpMethod.Helper";

const TokenMicrosoftAccount = async () => {
  try {
    const result = await axios.post(
      `https://apigateway.dev.psi-crm.com/CrmDfm/ExternalApis/GetTokenPublic`
    );
    return result;
  } catch (e) {
    return undefined;
  }
};
var formData = {
  accessLevel: "View",
 // datasetId: datasetId,
  allowSaveAs: "true",
  // identities: [
  //   {
  //     username: "user@user.com",
  //     datasets: [datasetId],
  //     customData: "MyCustomData"
  //   }
  // ]
};

//  const GenerateTokenreport = async () => {
//   const result =  axios.post(
//     'https://api.powerbi.com/v1.0/myorg/groups/ade8b8a2-c386-46c0-8afc-c9b19055740d/reports/3e78cb87-cca7-40d9-9372-6c389edc5307/GenerateToken',
//     {
//       headers: {
//         // "Content-Type": "application/json",
//         'Authorization': "Bearer " + JSON.parse(localStorage.getItem('AccountToken')),
//         'Accept':"application/json"
//       },
//       data: formData
     
//     }
//   )
//     .then((data) => data)
//     .catch((error) => showError("errooor"));
//   return result;
// };



        
export { TokenMicrosoftAccount  };
