import axios from "axios";
import {
  FETCH_FEES_STRUCT_TABLE_DATA,
  FEES_STRUCT_TABLE_DATA_FAIL,
  FEES_STRUCT_TABLE_DATA_SUCCESS,
} from "../constants/actions";
// import swal from "sweetalert";

export const fetchFeesTableData = (data) => {
  return (dispatch) => {
    dispatch(fetchTableData());
    try {
      axios(data)
        .then(function (response) {
          //Printing the response of the data
          console.log((response));
          if (response.status === 200) {
            dispatch(fetchSuccessTableData(response.data));
          }
        })
        .catch(function (error) {
          //   console.log(error);
          fetchFailTableData(error);
          // swal({
          //   title: "something problem",
          //   icon: "error",
          // });
        });
    } catch (error) {
      fetchFailTableData(error);
      //   console.log(error);
    }
  };
};

const fetchTableData = () => {
  return {
    type: FETCH_FEES_STRUCT_TABLE_DATA,
  };
};

const fetchSuccessTableData = (data) => {
  return {
    type: FEES_STRUCT_TABLE_DATA_SUCCESS,
    payload: data,
  };
};

const fetchFailTableData = (error) => {
  return {
    type: FEES_STRUCT_TABLE_DATA_FAIL,
    payload: error,
  };
};
