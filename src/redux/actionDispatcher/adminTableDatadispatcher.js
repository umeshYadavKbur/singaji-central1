import axios from "axios";
import {
  FETCH_ADMIN_TABLE_DATA,
  ADMIN_TABLE_DATA_FAIL,
  ADMIN_TABLE_DATA_SUCCESS,
} from "../constants/actions";

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

const fetchTableData = () => {
  return {
    type: FETCH_ADMIN_TABLE_DATA,
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
