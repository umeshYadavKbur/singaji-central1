import axios from "axios";
import {
  FETCH_ADMIN_TABLE_DATA,
  ADMIN_TABLE_DATA_FAIL,
  ADMIN_TABLE_DATA_SUCCESS,
  FETCH_ADMIN_TABLE_DATA_SEC,
  FETCH_ADMIN_TABLE_DATA_SUCCESS,
  FETCH_ADMIN_TABLE_DATA_FAIL
} from "../../constants/actions";
import { toast } from 'react-toastify'


export const fetchAdminTableData = (data) => {
  return (dispatch) => {
    dispatch(fetchTableData());
    try {
      axios(data)
        .then(function (response) {
          console.log((response));
          if (response.status === 200) {
            dispatch(fetchSuccessTableData(response.data));
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
          toast.warn('Internal Server Error', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchFailTableData(error);
        });
    } catch (error) {
      toast.warn('Internal Server Error', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchFailTableData(error);
      //   console.log(error);
    }
  };
};

export const getAdminTableData = (data) => {
  return (dispatch) => {
    dispatch(fetchTableDataSec());
    try {
      axios(data)
        .then(function (response) {
          console.log((response));
          if (response.status === 200) {
            dispatch(fetchSuccessSecTableData(response.data));
          }
        })
        .catch(function (error) {
          toast.warn('Internal Server Error', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchSuccessfailTableData()
        });
    } catch (error) {
      toast.warn('Internal Server Error', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchSuccessfailTableData()
    }
  }
}

const fetchTableData = () => {
  return {
    type: FETCH_ADMIN_TABLE_DATA,
  };
};
export const fetchTableDataSec = () => {
  return {
    type: FETCH_ADMIN_TABLE_DATA_SEC,
  };
};
const fetchSuccessSecTableData = (data) => {
  return {
    type: FETCH_ADMIN_TABLE_DATA_SUCCESS,
    payload: data
  };
};
const fetchSuccessfailTableData = () => {
  return {
    type: FETCH_ADMIN_TABLE_DATA_FAIL,
  };
};

const fetchSuccessTableData = (data) => {
  return {
    type: ADMIN_TABLE_DATA_SUCCESS,
    payload: data,
  };
};

const fetchFailTableData = (error) => {
  return {
    type: ADMIN_TABLE_DATA_FAIL,
    payload: error,
  };
};
