import {
    FETCH_STUDENTACCOUNT_DATA,
    // STUDENTACCOUNT_TABLE_DATA_FAIL,
    STUDENTACCOUNT_TABLE_DATA_SUCCESS,
    // STUDENTACCOUNT_CHANGE_STATUS,
    STUDENTACCOUNT_TABLE_CHANGE_SUCCESS,
    STUDENTACCOUNT_TABLE_CHANGE_FAIL,
} from "../../constants/actions";

const initialState = {
    second_loading: false,
    loading: false,
    table_data: [],
    error: "",
  };
  
  const StudentAccountTableReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_STUDENTACCOUNT_DATA:
        return {
          ...state,
          loading: true,
        };
  
      case STUDENTACCOUNT_TABLE_DATA_SUCCESS:
        return {
          loading: false,
          table_data: action.payload,
          error: "",
        };
  
    //   case STUDENTACCOUNT_TABLE_DATA_FAIL:
    //     return {
    //       loading: false,
    //       table_data: [],
    //       error: action.payload,
    //     };
  
    //   case STUDENTACCOUNT_CHANGE_STATUS:
    //     return {
    //       ...state,
    //       second_loading: true,
    //     };
  
      case STUDENTACCOUNT_TABLE_CHANGE_SUCCESS:
        return {
          ...state,
          second_loading: false,
        };
  
      case STUDENTACCOUNT_TABLE_CHANGE_FAIL:
        return {
          ...state,
          second_loading: false,
        };
  
      default:
        return state;
    }
  };
  
  export default StudentAccountTableReducer;
  