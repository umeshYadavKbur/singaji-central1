import axios from 'axios'
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from '../constants/actions'

export const fetchUsers = (bodyjson) => {
  return async (dispatch) => {
    let url = LOGIN_PATH + "username=" + bodyjson.userName + "&password" + "=" + bodyjson.password;
    let response = await post(url, bodyjson)
    if (response.status === 200) {
      localStorage.setItem('user', bodyjson.userName);
      localStorage.setItem('access_token', response.payload.access_token);
      history.push('/');
      dispatch({
        type: LOGIN_SUCCESS,
        data: response.payload,
      })
      // let newApiResponse = await post(newUrl, newBodyjson)
      //Do stuffs with new api response
    }
    else {
      dispatch({
        type: LOGIN_FAILED,
        data: response.status,
      });
    }
  }
}

// first type of fetching the data
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

//Second type of fetching the data 
// return () => async (dispatch) => {
//   try {
//     dispatch(loginRequest())
//     const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
//     dispatch(loginSuccess(data))
//     return data;
//   } catch (e) {
//     console.log(e);
//     dispatch(loginFailure(e.message))
//     return e.message
//   }
// }

//perfect for getting the data
// return async (dispatch) => {
//   try {
//     dispatch(loginRequest())
//     const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
//     dispatch(loginSuccess(data))
//     return data;
//   } catch (e) {
//     console.log(e);
//     dispatch(loginFailure(e.message))
//     return e.message
//   }
// }
// }


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