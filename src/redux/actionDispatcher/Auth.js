import { axios } from "axios";
// import baseUrl from "../constants/url";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/actions";

export const fetchUserInfo = (data) => {
  console.log("on the action field");
  const baseUrl = "https://singaji-central-server.herokuapp.com";

  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .get(`${baseUrl}/api/login`, data)
      .then((response) => {
        const users = response.data;
        console.log(response.data);
        dispatch(loginSuccess(users));
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
        dispatch(loginFailure(errorMsg));
      });
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

// export const login = (userData) => {
//   return (dispatch) => {
//     let apiEndpoint = "auths";
//     let payload = { userData };
//     userService.post(apiEndpoint, payload).then((response) => {
//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("auth", response.data.auth);
//         dispatch(setUserDetails(response.data));
//         history.push("/home");
//       }
//     });
//   };
// };
