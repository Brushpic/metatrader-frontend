/* eslint import/no-extraneous-dependencies: off */
import { showMessage } from "app/store/fuse/messageSlice";
import * as api from "../api/api";
import * as accountListConstant from "../constant/accountListConstant";

// eslint-disable-next-line import/prefer-default-export
export const getAccountList = (email) => async (dispatch) => {
  console.log("action:", email);
  api
    .getAccountData(email)
    .then((response) => {
      dispatch(showMessage({ message: "Credential data successfully imported!" }));
      dispatch({
        type: accountListConstant.GET_ALLACCOUNTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const getAllAccountList = () => async (dispatch) => {
  api
    .getAllAccountData()
    .then((response) => {
      dispatch(showMessage({ message: "Credential data successfully imported!" }));
      dispatch({
        type: accountListConstant.GET_ALLACCOUNTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const openCredentialAccountDialog = (login) => async (dispatch) => {
  api
    .getCredentialDetail(login)
    .then((response) => {
      dispatch(showMessage({ message: "Credential data successfully imported!" }));
      dispatch({
        type: accountListConstant.GET_CREDENTIAL,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
  dispatch({ type: accountListConstant.OPEN_DIALOG });
};

export const closeCredentialAccountDialog = () => async (dispatch) => {
  dispatch({ type: accountListConstant.CLOSE_DIALOG });
};
