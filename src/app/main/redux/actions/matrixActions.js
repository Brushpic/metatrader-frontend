/* eslint import/no-extraneous-dependencies: off */
import { showMessage } from "app/store/fuse/messageSlice";
import * as api from "../api/api";
import * as matrixConstant from "../constant/matrixConstant";

// eslint-disable-next-line import/prefer-default-export
export const getMatrix = (login) => async (dispatch) => {
  api
    .getMatrixData(login)
    .then((response) => {
      dispatch(showMessage({ message: "Matrix data successfully imported!" }));
      dispatch({
        type: matrixConstant.GET_MATRIXDATA,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};
