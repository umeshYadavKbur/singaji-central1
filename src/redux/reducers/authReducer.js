import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/actions"

const initialState = {
  loading: false,
  users: [],
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
        users: action.payload,
        error: ''
      }
    case LOGIN_FAIL:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
    default: return state
  }
}

export default userReducer