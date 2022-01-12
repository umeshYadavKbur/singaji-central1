import {
  FORGETPASSWORD_FAIL,
  FORGETPASSWORD_REQUEST,
  FORGETPASSWORD_SUCCESS,
} from "../../constants/actions";
import getData from "../../../services/agent";
import Swal from "sweetalert2";
import AllUrl from "../../constants/url";
import { toast } from "react-toastify";

// import {history} from '../../helpers/history'
export const fetchUserEmail = (data, navigate) => {
  return async (dispatch) => {
    const url = AllUrl.resetPassword;
    dispatch(forgotPasswordRequest());
    var forgetPasswordData = await getData(data, url);
    if (forgetPasswordData.status === 200) {
      Swal.fire({
        title: 'Mail sent successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500,
      })
      navigate('./login');
      dispatch(forgotPasswordSuccess(forgetPasswordData));
    } else if (forgetPasswordData.request.status === 400) {
      // Swal.fire({
      //   title: "Email not Found",
      //   icon: "warning",
      //   showConfirmButton: false,
      //   timer: 2500
      // });
      toast.warn('Email not found', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(forgotPasswordFailure(forgetPasswordData.data));
    }

    else {
      toast.error('Internal server error', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(forgotPasswordFailure(forgetPasswordData));
    }
  };
};

// export {fetchUserEmail}
export const forgotPasswordRequest = () => {
  return {
    type: FORGETPASSWORD_REQUEST,
  };
};

export const forgotPasswordSuccess = (users) => {
  return {
    type: FORGETPASSWORD_SUCCESS,
    payload: users,
  };
};

export const forgotPasswordFailure = (error) => {
  return {
    type: FORGETPASSWORD_FAIL,
    payload: error,
  };
};
