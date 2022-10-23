import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducers";
import { credentialReducer } from "./credentialReducers";

const userReducers = combineReducers({
  userReducer,
  credentialReducer,
});

export default userReducers;
