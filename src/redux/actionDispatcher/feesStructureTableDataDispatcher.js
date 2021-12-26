import axios from "axios";
import {
  FETCH_FEES_STRUCT_TABLE_DATA,
  FEES_STRUCT_TABLE_DATA_FAIL,
  FEES_STRUCT_TABLE_DATA_SUCCESS,
  FEES_STRUCTURE_CHANGE_STATUS,
  FEES_STRUCTURE_CHANGE_SUCCESS,
  FEES_STRUCTURE_CHANGE_FAIL,
} from "../constants/actions";
import { baseUrl } from "../constants/url";

export const fetchFeesTableData = (data) => {
  return (dispatch) => {
    dispatch(fetchTableData());
    try {
      axios(data)
        .then(function (response) {
          //Printing the response of the data
          console.log(response);
          if (response.status === 200) {
            dispatch(fetchSuccessTableData(response.data));
          }
        })
        .catch(function (error) {
          fetchFailTableData(error);
        });
    } catch (error) {
      fetchFailTableData(error);
    }
  };
};

export const changeFeesStructureStatus = (data, setVisible, visible) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {

    const getUpdatedTableData = async () => {
      var config = {
        method: "GET",
        url: `${baseUrl}/api/list_schema`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      var response = await axios(config);
      dispatch(fetchSuccessTableData(response.data));
    }

    dispatch(feesStructureStatusChange());
    var response = await axios(data);
    console.log(response);
    if (response.status === 200) {
      if (visible) {
        setVisible(!visible)
      }
      dispatch(feesStructureStatusSuccess());
      getUpdatedTableData();
    } else {
      dispatch(feesStructureStatusFailed(response))
    }
  }
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

const feesStructureStatusChange = () => {
  return {
    type: FEES_STRUCTURE_CHANGE_STATUS,
  };
};
const feesStructureStatusSuccess = () => {
  return {
    type: FEES_STRUCTURE_CHANGE_SUCCESS,
  };
};
const feesStructureStatusFailed = (error) => {
  return {
    type: FEES_STRUCTURE_CHANGE_FAIL,
  };
};
