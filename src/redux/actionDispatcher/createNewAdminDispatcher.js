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
          alert("admin created")
            let timerInterval
          //   Swal.fire({
          //     icon: 'success',
          //     text: 'New Admin has been created Successfully!',
          //     timer: 2500,
              
          //     didOpen: () => {
          //       Swal.showLoading()
          //       const b = Swal.getHtmlContainer().querySelector('b')
          //       timerInterval = setInterval(() => {
          //         b.textContent = Swal.getTimerLeft()
          //       }, 100)
          //     },
          //     willClose: () => {
          //       clearInterval(timerInterval)
          //     }
          //   }).then((result) => {
          //     /* Read more about handling dismissals below */
          //     if (result.dismiss === Swal.DismissReason.timer) {
          //       console.log('I was closed by the timer')
          //     }
          //   })
          } else if (response.status === 208) {
            dispatch(newAdminReqSuccess());
          
            let timerInterval
            Swal.fire({
              icon: 'info',
              text: 'Admin already created!',
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
          } else if (response.status === 404) {
            dispatch(newAdminReqSuccess());
          
            let timerInterval
            Swal.fire({
            
              text: '404 status',
              icon: 'info',
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
          }
        })
        .catch(function (error) {
          console.log(error);
          dispatch(newAdminReqFail(error));
          
          let timerInterval
          Swal.fire({
            icon: 'error',
            text: 'Sorry problem occured!',
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
