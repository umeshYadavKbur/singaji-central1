import {
  NEW_PASS_FAIL,
  NEW_PASS_REQUEST,
  NEW_PASS_SUCCESS,
} from "../../constants/actions";
import Swal from "sweetalert2";
import getData from "../../../services/agent";
import AllUrl from "../../constants/url";
import { toast } from "react-toastify";


export const newPasswordRequest = (data, navigate) => {
  return async (dispatch) => {

    const url = `${AllUrl.forgotPassword}${data.token}`;
    dispatch(newPassRequest());
    var newPasswordData = await getData(data, url);
    try {
      if (newPasswordData.status === 200) {
        dispatch(passReqSuccess());
        Swal.fire({
          title: "Password Reset Success",
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
          showClass: {
            backdrop: 'swal2-noanimation', // disable backdrop animation
            popup: '',                     // disable popup animation
            icon: ''                       // disable icon animation
          },
          hideClass: {
            popup: '',                     // disable popup fade-out animation
          }
        })
        navigate('/login')
      } else if (newPasswordData.request.status === 406) {
        // Swal.fire({
        //   title: "Oops! link expired",
        //   icon: "warning",
        //   showConfirmButton: false,
        //   timer: 2500
        // });
        toast.warn('Oops! link expired', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(passReqFail(newPasswordData));
      } else {
        toast.warn('Oops! link expired', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(passReqFail(newPasswordData));
      }
    } catch (error) {
      // dispatch(passReqFail(error));
      toast.error('Internal server error', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
