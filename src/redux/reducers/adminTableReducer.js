import {
  FETCH_ADMIN_TABLE_DATA,
  ADMIN_TABLE_DATA_FAIL,
  ADMIN_TABLE_DATA_SUCCESS,
} from "../constants/actions";

const initialState = {
  loading: false,
  table_data: [],
  error: "",
};

const adminTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_TABLE_DATA:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_TABLE_DATA_SUCCESS:
      return {
        loading: false,
        table_data: action.payload,
        error: "",
      };

    case ADMIN_TABLE_DATA_FAIL:
      return {
        loading: false,
        table_data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default adminTableReducer;
