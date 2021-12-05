import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS} from '../constants/actions'
import getData from '../../services/agent'
import swal from 'sweetalert';


export const fetchUsers = (data) => {
  return async (dispatch) => {


    const loginUrl = "/api/login"
    dispatch(loginRequest())
    var userResData = await getData(data,loginUrl)
    console.log("Working  :::: ", userResData);
    try {
      if(userResData.status ===200) {
        localStorage.setItem('user',userResData.user);
        localStorage.setItem('token',userResData.token);
        localStorage.setItem('role',userResData.role);
     
        
       
  swal({
    title: "Login Success",
    icon: "success",
  })
  dispatch(loginSuccess(userResData))
      }
     
      else{
        dispatch(loginFailure(userResData))
      }
    } catch(error) {
      if(error.status === 404) {
        swal({
          title: "Login Success",
          icon: "warning",
        })
      }
      // console.log("errror in login ::",error)
      dispatch(loginFailure(error))
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
