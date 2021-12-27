import axios from "axios";
import {
  FETCH_ADMIN_TABLE_DATA,
  ADMIN_TABLE_DATA_FAIL,
  ADMIN_TABLE_DATA_SUCCESS,
  FETCH_ADMIN_TABLE_DATA_SEC,
  FETCH_ADMIN_TABLE_DATA_SUCCESS,
  FETCH_ADMIN_TABLE_DATA_FAIL
} from "../../constants/actions";

export const fetchAdminTableData = (data) => {
  return (dispatch) => {
    dispatch(fetchTableData());
    // console.log("getting table data", data);
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
          console.log((response));
          if (response.status === 200) {
            dispatch(fetchSuccessTableData(response.data));
          }
        })
        .catch(function (error) {
          fetchFailTableData(error);
        });
    } catch (error) {
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
          fetchSuccessfailTableData()
        });
    } catch (error) {
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
