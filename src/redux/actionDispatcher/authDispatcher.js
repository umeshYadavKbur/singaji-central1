import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/actions";
import getData from "../../services/agent";
import { loginUrl } from "../constants/url";
import { toast } from 'react-toastify'



export const fetchUsers = (data) => {
  return async (dispatch) => {
    const url = loginUrl;
    // wait untill the data not received so getData function take data and url part
    dispatch(loginRequest());
    var userResData = await getData(data, url);
    // console.log("the response is ::", userResData.request.status);
    // changing the userResData if we need token so userResData.data.toke will be used
    try {
      if (userResData.request.status === 200) {
        //setting the Items in localStorage
        localStorage.setItem("user", userResData.data.user);
        localStorage.setItem("token", userResData.data.token);
        localStorage.setItem("role", userResData.data.role);
        localStorage.setItem("email", userResData.data.email);
        //Redirect to the home page remaining
        // history.push('/');
        //dispatch action and store data in it
        dispatch(loginSuccess(userResData.data));
      } else if (userResData.request.status === 404) {
        toast.error('User not found', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(loginFailure(userResData.data));
      } else if (userResData.request.status === 400) {
        let value = JSON.stringify(userResData.request.status);
        dispatch(loginFailure(value));
        toast.warn('Invalid credentials', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        let value = JSON.stringify(userResData.request.status);
        dispatch(loginFailure(value));
        toast.error('Internal server error', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return userResData.request.status;
    } catch (error) {
      //if crudential fails than Login fail action dispatch
      let value = JSON.stringify(userResData.request.status);
      dispatch(loginFailure(value));
      toast.error('Internal server error', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (users) => {
  return {
    type: LOGIN_SUCCESS,
    payload: users,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
