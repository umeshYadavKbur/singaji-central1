import axios from "axios";
// import swal from "sweetalert";
import Swal from "sweetalert2";
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
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'New admin has been successfully created!',
              showConfirmButton: false,
              timer: 2500
            })
            
          } else if (response.status === 208) {
            dispatch(newAdminReqSuccess());
            Swal.fire({
              position: 'top-center',
              icon: 'info',
              title: 'Admin already created!',
              showConfirmButton: false,
              timer: 2500
            })
          } else if (response.status === 404) {
            dispatch(newAdminReqSuccess());
            Swal.fire({
              position: 'top-center',
              icon: 'warning',
              title: '404 status!',
              showConfirmButton: false,
              timer: 2500
            })
        
          }
        })
        .catch(function (error) {
          console.log(error);
          dispatch(newAdminReqFail(error));
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'problem occured!',
            showConfirmButton: false,
            timer: 2500
          })
      
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
