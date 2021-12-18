import {
  CREATE_FEES_FAILED,
  CREATE_FEES_STRUCTURE,
  CREATE_FEES_SUCCESS,
} from "../constants/actions";

const initialState = {
  loading: false,
  feesStructure: false,
  error: "",
};

const createNewFeesStructure = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEES_STRUCTURE:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FEES_SUCCESS:
      return {
        loading: false,
        feesStructure: true,
        error: "",
      };
    case CREATE_FEES_FAILED:
      return {
        loading: false,
        feesStructure: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createNewFeesStructure;
