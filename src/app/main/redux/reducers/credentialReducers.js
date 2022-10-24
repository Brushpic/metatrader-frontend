import * as credentialAdminConstant from "../constant/credentialAdminConstant";

// eslint-disable-next-line import/prefer-default-export
export const credentialReducer = (
  state = { props: { open: false }, credentials: null },
  action
) => {
  switch (action.type) {
    case credentialAdminConstant.GET_ALLCREDENTIALS:
      return { ...state, credentials: action.payload };
    case credentialAdminConstant.ADD_NEWCREDENTIAL:
      return {
        ...state,
        credentials: [...state.credentials, action.payload],
      };
    case credentialAdminConstant.DELETE_CREDENTIAL:
      return {
        ...state,
        credentials: state.credentials.filter((element) => element.login !== action.payload),
      };
    case credentialAdminConstant.REGISTER_CREDENTIAL:
      return {
        ...state,
        credentials: state.credentials.map((element) => {
          if (element.login !== action.payload) return element;
          return {
            ...element,
            status: true,
          };
        }),
      };
    case credentialAdminConstant.OPEN_DIALOG:
      return {
        ...state,
        props: {
          open: true,
        },
      };
    case credentialAdminConstant.CLOSE_DIALOG:
      return {
        ...state,
        props: {
          open: false,
        },
      };
    default:
      return state;
  }
};
