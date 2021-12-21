import {
  ACTIVATE_STUDENT,
  DEACTIVATE_STUDENT,
  FAIL_STATUS_REQUEST,
  REQUEST_STATUS_CHANGE,
} from "../constants/actions";
// import getData from "../../services/agent";
import axios from "axios";
import swal from "sweetalert";

export const changeStatus = (data) => {
  // const token = localStorage.getItem("token");

  return async (dispatch) => {
    // Console the data getting from the form of create admin
    // console.log("The data is ", data);
    try {
      // dispatch(newAdminReq());
      axios(data)
        .then(function (response) {
          //Printing the response of the data
          console.log(("Response is  :::", response));

          if (response.status === 208) {
            // dispatch(newAdminReqSuccess());
            swal({
              title: "Changed status",
              icon: "info",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
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


export const statusRequest = () => {
  return {
    type: REQUEST_STATUS_CHANGE,
  };
};

export const deactivateStudent = (users) => {
  return {
    type: DEACTIVATE_STUDENT,
    payload: users,
  };
};

export const activateStudent = (error) => {
  return {
    type: ACTIVATE_STUDENT,
    payload: error,
  };
};

export const statusReqestFail = () => {
  return {
    type: FAIL_STATUS_REQUEST,
  };
};
