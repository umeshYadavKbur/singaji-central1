import axios from "axios";
import {
  FETCH_STUDENT_TABLE_DATA,
  STUDENT_TABLE_DATA_FAIL,
  STUDENT_TABLE_DATA_SUCCESS,
} from "../../constants/actions";
import Swal from "sweetalert2";
import { toast } from 'react-toastify'

export const fetchStudentTable = (data) => {
  return (dispatch) => {
    dispatch(fetchTableData());
    try {
      axios(data)
        .then(function (response) {
          //Printing the response of the data
          // console.log((response));
          if (response.status === 200) {
            dispatch(fetchSuccessTableData(response.data.reverse()));
          }
          if (response.status === 400) {
            toast.warn('No data found !', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch(fetchFailTableData(response.data));
          }
          if (response.status === 500) {
            toast.warn('Internal Server Error', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch(fetchFailTableData(response.data));
          }
        })
        .catch(function (error) {
          //   console.log(error);
          fetchFailTableData(error);
          Swal.fire({
            title: "Some Problem Occurred",
            icon: "warning",
            showConfirmButton: false,
            timer: 2500
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
