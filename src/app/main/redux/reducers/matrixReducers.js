import * as matrixConstant from "../constant/matrixConstant";

// eslint-disable-next-line import/prefer-default-export
export const matrixReducer = (state = { historyTrade: null }, action) => {
  switch (action.type) {
    case matrixConstant.GET_MATRIXDATA:
      return { ...state, historyTrade: action.payload };
    default:
      return state;
  }
};
