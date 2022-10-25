import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducers";
import { credentialReducer } from "./credentialReducers";
import { accountListReducer } from "./accountListReducers";

const userReducers = combineReducers({
  userReducer,
  credentialReducer,
  accountListReducer,
});

export default userReducers;
