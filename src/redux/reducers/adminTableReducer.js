import {
  FETCH_ADMIN_TABLE_DATA,
  ADMIN_TABLE_DATA_FAIL,
  ADMIN_TABLE_DATA_SUCCESS,
  FETCH_ADMIN_TABLE_DATA_SEC,
  FETCH_ADMIN_TABLE_DATA_SUCCESS,
} from "../constants/actions";

const initialState = {
  second_loading: false,
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
        ...state,
        loading: false,
        table_data: action.payload,
        error: "",
      };

    case ADMIN_TABLE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        table_data: [],
        error: action.payload,
      };

    case FETCH_ADMIN_TABLE_DATA_SEC:
      return {
        ...state,
        second_loading: true
      };

    case FETCH_ADMIN_TABLE_DATA_SUCCESS:
      return {
        ...state,
        second_loading: false,
        table_data: action.payload,
      };


    default:
      return state;
  }
};

export default adminTableReducer;
