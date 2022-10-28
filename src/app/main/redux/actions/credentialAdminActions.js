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

export const createAccount = (data) => async (dispatch) => {
  dispatch(
    showMessage({ message: "Please wait until creation completed, it might be take 30 seconds!" })
  );

  api
    .createAccount(data)
    .then((response) => {
      dispatch(showMessage({ message: "Credential data successfully created!" }));
      dispatch({ type: credentialAdminConstant.ADD_NEWCREDENTIAL, payload: response.data });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const registeCredential = (data) => async (dispatch) => {
  const { login, password, serverName, name, userEmail } = data;
  api
    .registeCredential({ login, password, serverName, name, userEmail })
    .then(() => {
      dispatch(showMessage({ message: "Credential data successfully registered!" }));
      dispatch({ type: credentialAdminConstant.REGISTER_CREDENTIAL, payload: login });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const openCreateAccountDialog = () => async (dispatch) => {
  dispatch({ type: credentialAdminConstant.OPEN_DIALOG });
};

export const closeCreateAccountDialog = () => async (dispatch) => {
  dispatch({ type: credentialAdminConstant.CLOSE_DIALOG });
};
