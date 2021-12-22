import axios from "axios";
// import swal from "sweetalert";
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
            let timerInterval
            Swal.fire({
              icon: 'warning',
              text: 'This fees structure is Already created!',
              timer: 2500,
             
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
          } else if (response.status === 200) {
            dispatch(feesReqSuccess());

            let timerInterval
            Swal.fire({
              icon: 'success',
              text: 'Fees structure created successfully!',
              timer: 2500,
              
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
          } else if (response.status === 401) {
            dispatch(feesReqSuccess());

          }
        })
        .catch(function (error) {
          dispatch(feesReqFail(error));
          // swal({
          //   title: "Request failed",
          //   icon: "error",
          // });
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
