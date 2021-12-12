import axios from "axios";
import swal from "sweetalert";
// import getData from "../../services/agent";
import {
  CREATE_FEES_FAILED,
  CREATE_FEES_STRUCTURE,
  CREATE_FEES_SUCCESS,
} from "../constants/actions";

export const createFeesStructure = (data) => {
  return async (dispatch) => {
    // Console the data getting from the form of create admin
    // console.log("The data is ", data);
    try {
      dispatch(feesReq());
      axios(data)
        .then(function (response) {
          //Printing the response of the data
          // console.log(("Response is  :::", response));
          // console.log(("The response code is ::", response.status));

          if (response.status === 208) {
            swal({
              title: "Admin already created",
              icon: "info",
            });
          } else if (response.status === 200) {
            dispatch(feesReqSuccess());
            swal({
              title: "New admin has been Created",
              icon: "success",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          dispatch(feesReqFail(error));
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const feesReq = () => {
  return {
    type: CREATE_FEES_STRUCTURE,
  };
};

export const feesReqSuccess = () => {
  return {
    type: CREATE_FEES_SUCCESS,
  };
};

export const feesReqFail = (error) => {
  return {
    type: CREATE_FEES_FAILED,
    payload: error,
  };
};
