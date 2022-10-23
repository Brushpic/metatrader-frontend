import * as credentialAdminConstant from "../constant/credentialAdminConstant";

// eslint-disable-next-line import/prefer-default-export
export const credentialReducer = (state = { credentials: null }, action) => {
  switch (action.type) {
    case credentialAdminConstant.GET_ALLCREDENTIALS:
      return { ...state, credentials: action.payload };
    case credentialAdminConstant.ADD_NEWCREDENTIAL:
      return {
        credentials: [...state.credentials, action.payload],
      };
    case credentialAdminConstant.DELETE_CREDENTIAL:
      return {
        credentials: state.credentials.filter((element) => element.login !== action.payload),
      };
    default:
      return state;
  }
};
