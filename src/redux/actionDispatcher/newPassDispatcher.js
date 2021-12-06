import {
  NEW_PASS_FAIL,
  NEW_PASS_REQUEST,
  NEW_PASS_SUCCESS,
} from "../constants/actions";
import getData from "../../services/agent";

export const newPasswordRequest = (data) => {
  return async (dispatch) => {
    const newPassUrl = `/api/resetPasswordLink/${data.token}`;
    dispatch(newPassRequest());
    var newPasswordData = await getData(data, newPassUrl);
    try {
      if (newPasswordData.status === 200) {
        dispatch(passReqSuccess())
      }
      else {
        dispatch(passReqFail(newPasswordData));
      }
    }
    catch (error) {
      // dispatch(passReqFail(error));
      console.log(error);
    }
  };
};

export const newPassRequest = () => {
  return {
    type: NEW_PASS_REQUEST,
  };
};

export const passReqSuccess = () => {
  return {
    type: NEW_PASS_SUCCESS,
  };
};

export const passReqFail = (error) => {
  return {
    type: NEW_PASS_FAIL,
    payload: error,
  };
};
