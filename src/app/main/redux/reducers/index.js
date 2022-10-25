import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducers";
import { credentialReducer } from "./credentialReducers";
import { accountListReducer } from "./accountListReducers";
import { matrixReducer } from "./matrixReducers";

const userReducers = combineReducers({
  userReducer,
  credentialReducer,
  accountListReducer,
  matrixReducer,
});

export default userReducers;
