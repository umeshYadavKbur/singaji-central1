import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/actions";
import getData from "../../services/agent";

export const fetchUsers = (data) => {
  return async (dispatch) => {
    // Sending the additional url to be attached on baseUrl in other function
    const loginUrl = "/api/login";

    // wait untill the data not received so getData function take data and url part
    dispatch(loginRequest());
    var userResData = await getData(data, loginUrl);
    // Printing the data is coming or not
    // console.log("Working  :::: ", userResData);
    try {
      if (userResData.token) {
        //setting the Items in localStorage
        localStorage.setItem("user", userResData.user);
        localStorage.setItem("token", userResData.token);
        localStorage.setItem("role", userResData.role);
        //Redirect to the home page remaining
        // history.push('/');

        //dispatch action and store data in it
        dispatch(loginSuccess(userResData));
      }
    } catch (error) {
      //if crudential fails than Login fail action dispatch
      dispatch(loginFailure(error));
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
