import {
  FETCH_STUDENT_TABLE_DATA,
  STUDENT_TABLE_DATA_FAIL,
  STUDENT_TABLE_DATA_SUCCESS,
} from "../../constants/actions";

const initialState = {
  loading: false,
  table_data: [],
  error: "",
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENT_TABLE_DATA:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_TABLE_DATA_SUCCESS:
      return {
        loading: false,
        table_data: action.payload,
        error: "",
      };

    case STUDENT_TABLE_DATA_FAIL:
      return {
        loading: false,
        table_data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default tableReducer;