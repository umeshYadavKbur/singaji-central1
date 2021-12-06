import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/actions"

const initialState = {
  loading: false,
  loginSucces:false,
  role: '',
  token: '',
  userInfo: '',
  error: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        loading: false,
        loginSucces: true,
        role: action.payload.role,
        token: action.payload.token,
        userInfo: action.payload.user,
        error: ''
      }
    case LOGIN_FAIL:
      return {
        loading: false,
        loginSucces: false,
        role: '',
        token: '',
        userInfo: '',
        error: action.payload
      }
    default: return state
  }
}

export default userReducer