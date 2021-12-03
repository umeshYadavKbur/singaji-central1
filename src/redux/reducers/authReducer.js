import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/actions";

const initialState = {
  loading: false,
  token: "",
  userInfo: [],
  role: "",
  error: "",
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        error: "",
      };

    case LOGIN_FAIL:
      return {
        loading: false,
        userInfo: [],
        error: action.error,
      };

    default:
      return state;
  }
};
