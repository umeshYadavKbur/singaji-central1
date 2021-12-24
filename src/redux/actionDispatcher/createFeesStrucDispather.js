import axios from "axios";
import Swal from 'sweetalert2'
// import getData from "../../services/agent";
import {
  CREATE_FEES_FAILED,
  CREATE_FEES_STRUCTURE,
  CREATE_FEES_SUCCESS,
} from "../constants/actions";

export const createFeesStructure = (data) => {
  console.log("The data is ", data.data);
  return async (dispatch) => {
    // Console the data getting from the form of create admin
    try {
      dispatch(feesReq());
      axios(data)
        .then(function (response) {
          //Printing the response of the data
          console.log(("Response is  :::", response));
          console.log(("The response code is ::", response.status));

          if (response.status === 208) {
            // Swal.fire({
            //  icon:'warning',
            //  text: 'This fees structure is Already createrd!',

            //  timer: 2000,
            // });
            Swal.fire({
              position: 'top-center',
              icon: 'warning',
              title: 'This fees structure is Already createrd!',
              showConfirmButton: false,
              timer: 2500
            })
          } else if (response.status === 200) {
            dispatch(feesReqSuccess());

            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Fees structure created successfully!',
              showConfirmButton: false,
              timer: 2500
            })
          } else if (response.status === 401) {
            dispatch(feesReqSuccess());

          }
        })
        .catch(function (error) {
          dispatch(feesReqFail(error));
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Request failed!',
            showConfirmButton: false,
            timer: 2500
          })
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
