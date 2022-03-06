import { HttpServices } from "./HttpMethod.Helper";

const TokenMicrosoftAccount = async () => {
  try {
    const result = await HttpServices.post(
      `https://apigateway.dev.psi-crm.com/CrmDfm/ExternalApis/GetTokenPublic`
    );
    return result;
  } catch (e) {
    return undefined;
  }
};

export { TokenMicrosoftAccount };
