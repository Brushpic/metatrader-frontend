import * as accountListConstant from "../constant/accountListConstant";

// eslint-disable-next-line import/prefer-default-export
export const accountListReducer = (
  state = { props: { open: false, data: null }, accounts: null },
  action
) => {
  switch (action.type) {
    case accountListConstant.GET_ALLACCOUNTS:
      return { ...state, accounts: action.payload };
    case accountListConstant.OPEN_DIALOG:
      return {
        ...state,
        props: {
          ...state.props,
          open: true,
        },
      };
    case accountListConstant.CLOSE_DIALOG:
      return {
        ...state,
        props: {
          open: false,
          data: null,
        },
      };
    case accountListConstant.GET_CREDENTIAL:
      return {
        ...state,
        props: {
          ...state.props,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
