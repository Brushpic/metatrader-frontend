/* eslint import/no-extraneous-dependencies: off */
import { showMessage } from "app/store/fuse/messageSlice";
import * as api from "../api/api";
import * as credentialAdminConstant from "../constant/credentialAdminConstant";

// eslint-disable-next-line import/prefer-default-export
export const getCredentialList = () => async (dispatch) => {
  api
    .getAllCredentialData()
    .then((response) => {
      dispatch(showMessage({ message: "Credential data successfully imported!" }));
      dispatch({
        type: credentialAdminConstant.GET_ALLCREDENTIALS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const addNewCredential = (credentialData) => async (dispatch) => {
  api
    .addNewCredential(credentialData)
    .then((response) => {
      dispatch(showMessage({ message: "Credential data successfully added!" }));
      dispatch({ type: credentialAdminConstant.ADD_NEWCREDENTIAL, payload: response.data });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const deleteCredential = (id) => async (dispatch) => {
  api
    .deleteCredential(id)
    .then(() => {
      dispatch(showMessage({ message: "Credential data successfully deleted!" }));
      dispatch({ type: credentialAdminConstant.DELETE_CREDENTIAL, payload: id });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};
