/* eslint import/no-extraneous-dependencies: off */
import { showMessage } from "app/store/fuse/messageSlice";
import * as api from "../api/api";
import * as userAdminConstant from "../constant/userAdminConstant";

// eslint-disable-next-line import/prefer-default-export
export const getUserList = () => async (dispatch) => {
  api
    .getAllUserData()
    .then((response) => {
      dispatch(showMessage({ message: "User data successfully imported!" }));
      dispatch({
        type: userAdminConstant.GET_ALLUSERS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const addNewUser = (userData) => async (dispatch) => {
  api
    .addNewUser(userData)
    .then((response) => {
      dispatch(showMessage({ message: "User data successfully added!" }));
      dispatch({ type: userAdminConstant.ADD_NEWUSER, payload: response.data });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const updateUser = (id, userData) => async (dispatch) => {
  api
    .updateUser(id, userData)
    .then((response) => {
      dispatch(showMessage({ message: "User data successfully updated!" }));
      dispatch({ type: userAdminConstant.UPDATE_USER, payload: response.data });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const deleteUser = (id) => async (dispatch) => {
  api
    .deleteUser(id)
    .then(() => {
      dispatch(showMessage({ message: "User data successfully deleted!" }));
      dispatch({ type: userAdminConstant.DELETE_USER, payload: id });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};
