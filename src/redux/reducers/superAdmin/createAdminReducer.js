import {
  CREATE_NEW_ADMIN_FAIL,
  CREATE_NEW_ADMIN_REQUEST,
  CREATE_NEW_ADMIN_SUCCESS,
} from "../../constants/actions";

const initialState = {
  loading: false,
  newAdmin: false,
  error: "",
};

const newAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_NEW_ADMIN_SUCCESS:
      return {
        loading: false,
        newAdmin: true,
        error: "",
      };
    case CREATE_NEW_ADMIN_FAIL:
      return {
        loading: false,
        newAdmin: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default newAdminReducer;
