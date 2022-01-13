import { config, HttpServices } from "../config";
import { showError } from "../Helper/Tostify.Helper";


var retrievedObject = JSON.parse(localStorage.getItem('tokenapi'));



export const GetMainInfo_Case = async () => {
  const result = await HttpServices.get(`${config.server_address}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenapi'))}`,
    },
  })
    .then((data_2) => data_2);
    // .catch((error) => showError(""));
  return result;
};
export const GetCredit = async () => {
  const result = await HttpServices.get(`${config.credit_api}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenapi'))}`,
    },
  })
    .then((data_2) => data_2);
    // .catch((error) => showError(""));
  return result;
};

export const GetMainhistory = async () => {
  const result = await HttpServices.get(`${config.server_address_h}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenapi'))}`,
    },
  })
    .then((data_3) => data_3)
    .catch((error) => showError("Get Main Info Filed"));
  return result;
};

export const CreateMainInfo_Case = async (body) => {
  const result = await HttpServices.post(`${config.server_address}`, body, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenapi'))}`,
    },
  })
    .then((data_2) => data_2)
    .catch((error) => showError("Create Filed"));
  return result;
};

export const DeleteInfo_Case = async (id) => {
  const result = await HttpServices.delete(`${config.server_address}/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenapi'))}`,
    },
  })
    .then((data) => data)
    .catch((error) => showError("Delete Filed"));
  return result;
};
export const DeleteCredit = async (id) => {
  const result = await HttpServices.delete(`${config.credit_api}/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenapi'))}`,
    },
  })
    .then((data) => data)
    .catch((error) => showError("Delete Filed"));
  return result;
};

export const EditInfo_Case = async (id, body) => {
  const result = await HttpServices.put(
    `${config.server_address}/${id}`,
    body,
    {
      headers: {
        Authorization:`Bearer ${JSON.parse(localStorage.getItem('tokenapi'))}`,
      },
    }
  )
    .then((data) => data)
    .catch((error) => showError("Edit Filed"));
  return result;
};

// export const EditInfo_Case = async (id, body) => {
//   const result = await HttpServices.put(
//     `${config.server_address}/${id}`,
//     body,
//     {
//       headers: {
//         Authorization: `Bearer ${config.token}`,
//       },
//     }
//   )
//     .then((data) => data)
//     .catch((error) => showError("Edit Filed"));
//   return result;
// };


// trigger CreateAccountContact on Account (after insert, after update){

//   if(Trigger.isInsert){
  
//       List<Contact> ct = new List <Contact>();
  
//       for(Account acc : trigger.new){
  
//           Contact c = new Contact(LastName = acc.name,
//                       AccountId=acc.id,
//                       Fax=acc.Fax,
//                       MailingStreet=acc.BillingStreet,
//                       MailingCity=acc.BillingCity,
//                       /* similarly add all fields which you want */
//                       MailingState=acc.BillingState,
//                       MailingPostalCode=acc.BillingPostalCode,
//                       MailingCountry=acc.BillingCountry,
//                       Phone=acc.Phone);
  
//           ct.add(c);
//       }
//       insert ct; 
//   }
