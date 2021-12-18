import axios from "axios";
import {
  FETCH_STUDENT_TABLE_DATA,
  STUDENT_TABLE_DATA_FAIL,
  STUDENT_TABLE_DATA_SUCCESS,
} from "../constants/actions";
import swal from "sweetalert";

export const fetchStudentTable = (data) => {
  return (dispatch) => {
    dispatch(fetchTableData());
    console.log("getting table data", data);
    // axios(data)
    //   .then(function (response) {
    //     console.log(response)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    try {
      axios(data)
        .then(function (response) {
          //Printing the response of the data
          console.log(( response));
          if (response.status === 200) {
            dispatch(fetchSuccessTableData(response.data));
            swal({
              title: "Table data successfully fatched",
              icon: "success",
            });
          }
        })
        .catch(function (error) {
          //   console.log(error);
          fetchFailTableData(error);
          swal({
            title: "something problem",
            icon: "error",
          });
        });
    } catch (error) {
      fetchFailTableData(error);
      //   console.log(error);
    }
  };
};

const fetchTableData = () => {
  return {
    type: FETCH_STUDENT_TABLE_DATA,
  };
};

const fetchSuccessTableData = (data) => {
  return {
    type: STUDENT_TABLE_DATA_SUCCESS,
    payload: data,
  };
};

const fetchFailTableData = (error) => {
  return {
    type: STUDENT_TABLE_DATA_FAIL,
    payload: error,
  };
};
