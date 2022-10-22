import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducers";

const userReducers = combineReducers({
  userReducer,
});

export default userReducers;
