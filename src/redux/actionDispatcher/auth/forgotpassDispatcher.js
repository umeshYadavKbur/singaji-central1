import {
  FORGETPASSWORD_FAIL,
  FORGETPASSWORD_REQUEST,
  FORGETPASSWORD_SUCCESS,
} from "../../constants/actions";
import getData from "../../../services/agent";
import Swal from "sweetalert2";
import AllUrl from "../../constants/url";

// import {history} from '../../helpers/history'
export const fetchUserEmail = (data) => {
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
      dispatch(forgotPasswordSuccess(forgetPasswordData));
    } else if (forgetPasswordData.request.status === 404) {
      Swal.fire({
        title: "Email not Found",
        icon: "warning",
        showConfirmButton: false,
        timer: 2500
      });
      dispatch(forgotPasswordFailure(forgetPasswordData.data));
    } else {
      console.log("Catch block");
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
