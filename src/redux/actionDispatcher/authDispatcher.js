import axios from 'axios'
// import { history } from '../../helpers/history'
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from '../constants/actions'
import { baseUrl } from '../constants/url'

async function getData(data, loginUrl) {
  var url = `${baseUrl}${loginUrl}`
  try {
    let res = await axios.post(url, data)
    if (res.status === 200) {
      // console.log(res.data)
      return res.data
    }
    // Don't forget to return something   
    return res.data
  }
  catch (err) {
    console.error("Error ", err);
  }
}

export const fetchUsers = (data) => {
  return async (dispatch) => {
    const loginUrl = "/api/login"
    var userResData = await getData(data, loginUrl)
    console.log("Working or not working :::: ", userResData);
    try {

      if (userResData.token) {
        localStorage.setItem('user', userResData.user);
        localStorage.setItem('token', userResData.token);
        localStorage.setItem('role', userResData.role);
        // history.push('/');
        dispatch({
          type: LOGIN_SUCCESS,
          payload: userResData,
        })
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error,
      })
    }
  }



  // URL : "https://singaji-central-server.herokuapp.com/api/login"
  // console.log("Email", data.email)
  // console.log("Password ", data.password)
  // return async (dispatch) => {
  //   let url = `${baseUrl}/api/login`
  //   let response = await axios.post(url, data)
  //   if (response.status === 200) {
  //     console.log(response.data);
  //     localStorage.setItem('user', response.data.user);
  //     localStorage.setItem('token', response.data.token);
  //     localStorage.setItem('role', response.data.role);
  //     // history.push('/');
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: response.data,
  //     })
  //   }
  //   else {
  //     dispatch({
  //       type: LOGIN_FAIL,
  //       payload: response.status,
  //     });
  //   }
  // }
}


export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const loginSuccess = users => {
  return {
    type: LOGIN_SUCCESS,
    payload: users
  }
}

export const loginFailure = error => {
  return {
    type: LOGIN_FAIL,
    payload: error
  }
}