import { axios } from "axios";
// import baseUrl from "../constants/url";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/actions";

export const fetchUserInfo = (data) => {
  const baseUrl = "https://singaji-central-server.herokuapp.com";
  console.log("on the action field", data);

  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .get(`${baseUrl}/api/login`, data)
      .then((response) => {
        const users = response.data;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("role", response.data.role);
        console.log(response.data);
        dispatch(loginSuccess(users));
        // history.push('/');
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
        dispatch(loginFailure(errorMsg));
      });
  };
};

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (users) => {
  return {
    type: LOGIN_SUCCESS,
    payload: users,
  };
};

const loginFailure = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};
