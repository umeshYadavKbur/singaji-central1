import {
  NEW_PASS_FAIL,
  NEW_PASS_REQUEST,
  NEW_PASS_SUCCESS,
} from "../constants/actions";
import getData from "../../services/agent";

export const newPasswordRequest = (data) => {
 
  return async (dispatch) => {

    console.log("data from dispatcher ::",data);

    
    const newPassUrl = `/api/resetPasswordLink/${data.token}`;
    dispatch(newPassRequest());
    var userResData = await getData(data, newPassUrl);
    // console.log("Working  :::: ", userResData);
    try {
      if (userResData.token) {
        // history.push('/');
        dispatch(passReqSuccess(userResData));
      } else {
        dispatch(passReqFail(userResData));
      }
    } catch (error) {
      dispatch(passReqFail(error));
    }
  };
};

export const newPassRequest = () => {
  return {
    type: NEW_PASS_REQUEST,
  };
};

export const passReqSuccess = (users) => {
  return {
    type: NEW_PASS_SUCCESS,
    payload: users,
  };
};

export const passReqFail = (error) => {
  return {
    type: NEW_PASS_FAIL,
    payload: error,
  };
};
