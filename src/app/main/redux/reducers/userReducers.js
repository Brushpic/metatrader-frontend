import * as userAdminConstant from "../constant/userAdminConstant";

// eslint-disable-next-line import/prefer-default-export
export const userReducer = (state = { users: null }, action) => {
  switch (action.type) {
    case userAdminConstant.GET_ALLUSERS:
      return { ...state, users: action.payload };
    case userAdminConstant.ADD_NEWUSER:
      return {
        ...state,
        users: {
          results: [...state.users.results, action.payload],
        },
      };
    case userAdminConstant.UPDATE_USER:
      return {
        ...state,
        users: {
          results: state.users.results.map((element) =>
            element.id === action.payload.id ? action.payload : element
          ),
        },
      };
    case userAdminConstant.DELETE_USER:
      return {
        ...state,
        users: {
          results: state.users.results.filter((element) => element.id !== action.payload),
        },
      };
    default:
      return state;
  }
};
