import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/actions";
import getData from "../../services/agent";
import swal from "sweetalert";



export const fetchUsers = (data) => {
  // const notify = () => toast("Wow so easy!");
  return async (dispatch) => {
    // Sending the additional url to be attached on baseUrl in other function
    const loginUrl = "/api/login";

    // wait untill the data not received so getData function take data and url part
    dispatch(loginRequest());
    var userResData = await getData(data, loginUrl);
    console.log("the response is ::", userResData.request.status);
    // changing the userResData if we need token so userResData.data.toke will be used
    try {
      if (userResData.request.status === 200) {
        //setting the Items in localStorage
        localStorage.setItem("user", userResData.data.user);
        localStorage.setItem("token", userResData.data.token);
        localStorage.setItem("role", userResData.data.role);
        //Redirect to the home page remaining
        // history.push('/');
        //dispatch action and store data in it
        dispatch(loginSuccess(userResData.data));
        // swal({
        //   title: "Login Success",
        //   icon: "success",
        // });
        
        
      } else if (userResData.request.status === 404) {
        dispatch(loginFailure(userResData.data));
        swal({
          title: "User not Found",
          icon: "warning",
        });
        dispatch(loginFailure(userResData.data));
      } else if (userResData.request.status === 400) {
        swal({
          title: "Invalid Credential",
          icon: "warning",
        });
        dispatch(loginFailure(userResData.data));
      } else {
        dispatch(loginFailure(userResData.data));
      }
      return userResData.request.status;
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

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
