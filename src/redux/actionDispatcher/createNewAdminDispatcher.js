import axios from "axios";
import swal from "sweetalert";
// import getData from "../../services/agent";

import {
  CREATE_NEW_ADMIN_FAIL,
  CREATE_NEW_ADMIN_REQUEST,
  CREATE_NEW_ADMIN_SUCCESS,
} from "../constants/actions";

export const createNewAdmin = (data) => {
  return async (dispatch) => {
    // Console the data getting from the form of create admin
    // console.log("The data is ", data);
    try {
      dispatch(newAdminReq());
      axios(data)
        .then(function (response) {
          if (response.status === 200) {
            dispatch(newAdminReqSuccess());
            swal({
              title: "New admin has been Created",
              icon: "success",
            });
          } else if (response.status === 208) {
            dispatch(newAdminReqSuccess());
            swal({
              title: "Admin already created",
              icon: "info",
            });
          } else if (response.status === 404) {
            dispatch(newAdminReqSuccess());
            swal({
              title: "404 status",
              icon: "info",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          dispatch(newAdminReqFail(error));
          swal({
            title: "something problem",
            icon: "error",
          });
        });
    } catch (error) {
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
