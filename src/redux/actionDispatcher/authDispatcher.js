import axios from 'axios'
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from '../constants/actions'

export const fetchUsers = () => {
  // return (dispatch) => {
  //   dispatch(loginRequest())
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/users')
  //     .then(response => {
  //       // response.data is the users
  //       const users = response.data
  //       dispatch(loginSuccess(users))
  //     })
  //     .catch(error => {
  //       // error.message is the error message
  //       dispatch(loginFailure(error.message))
  //     })
  // }
  return (dispatch) => {
    try {
      dispatch(loginRequest())
      const { data } = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
      })
      dispatch(loginSuccess(users))
      return data;
    } catch (e) {
      console.log(e);
      dispatch(loginFailure(error.message))
      return e.message
    }
  }
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