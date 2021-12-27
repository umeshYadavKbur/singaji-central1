import {
  FETCH_FEES_STRUCT_TABLE_DATA,
  FEES_STRUCT_TABLE_DATA_FAIL,
  FEES_STRUCT_TABLE_DATA_SUCCESS,
  FEES_STRUCTURE_CHANGE_STATUS,
  FEES_STRUCTURE_CHANGE_FAIL,
  FEES_STRUCTURE_CHANGE_SUCCESS,
} from "../../constants/actions";

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

    case FEES_STRUCTURE_CHANGE_STATUS:
      return {
        ...state,
        second_loading: true,
      };

    case FEES_STRUCTURE_CHANGE_SUCCESS:
      return {
        ...state,
        second_loading: false,
      };

    case FEES_STRUCTURE_CHANGE_FAIL:
      return {
        ...state,
        second_loading: false,
      };

    default:
      return state;
  }
};

export default feesStructureTableReducer;
