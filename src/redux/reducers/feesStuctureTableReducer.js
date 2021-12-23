import {
  FETCH_FEES_STRUCT_TABLE_DATA,
  FEES_STRUCT_TABLE_DATA_FAIL,
  FEES_STRUCT_TABLE_DATA_SUCCESS,

} from "../constants/actions";

const initialState = {
  second_loading: false,
  loading: false,
  table_data: [],
  error: "",
};

const feesStructureTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEES_STRUCT_TABLE_DATA:
      return {
        ...state,
        loading: true,
      };
    case FEES_STRUCT_TABLE_DATA_SUCCESS:
      return {
        loading: false,
        table_data: action.payload,
        error: "",
      };

    case FEES_STRUCT_TABLE_DATA_FAIL:
      return {
        loading: false,
        table_data: [],
        error: action.payload,
      };



    default:
      return state;
  }
};

export default feesStructureTableReducer;
