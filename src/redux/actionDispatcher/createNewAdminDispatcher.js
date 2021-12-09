import swal from "sweetalert";
import getData from "../../services/agent";
import {
  CREATE_NEW_ADMIN_FAIL,
  CREATE_NEW_ADMIN_REQUEST,
  CREATE_NEW_ADMIN_SUCCESS,
} from "../constants/actions";

export const createNewAdmin = (data) => {
  return async (dispatch) => {
    const newPassUrl = `/api/createNewAdmin`;
    dispatch(newAdminReq());
    var newAdminData = await getData(data, newPassUrl);
    console.log("The data is ", newAdminData);
    try {
      if (newAdminData.status === 200) {
        dispatch(newAdminReqSuccess());
        swal({
          title: "Admin Create Success",
          icon: "success",
        });
      } else if (newAdminData.status === 401) {
        dispatch(newAdminReqFail());
        swal({
          title: "Admin Create Success",
          icon: "success",
        });
      }
    } catch (error) {
      dispatch(newAdminReqFail(error));
      console.log(error);
    }
  };
};

export const newAdminReq = () => {
  return {
    type: CREATE_NEW_ADMIN_REQUEST,
  };
};

export const newAdminReqSuccess = () => {
  return {
    type: CREATE_NEW_ADMIN_SUCCESS,
  };
};

export const newAdminReqFail = (error) => {
  return {
    type: CREATE_NEW_ADMIN_FAIL,
    payload: error,
  };
};
