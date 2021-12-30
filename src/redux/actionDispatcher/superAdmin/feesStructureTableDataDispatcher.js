import axios from "axios";
import {
  FETCH_FEES_STRUCT_TABLE_DATA,
  FEES_STRUCT_TABLE_DATA_FAIL,
  FEES_STRUCT_TABLE_DATA_SUCCESS,
  FEES_STRUCTURE_CHANGE_STATUS,
  FEES_STRUCTURE_CHANGE_SUCCESS,
  FEES_STRUCTURE_CHANGE_FAIL,
} from "../../constants/actions";
import AllUrl, { baseUrl } from "../../constants/url";
import { toast } from 'react-toastify'


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
          if (response.status === 400) {
            dispatch(fetchFailTableData(response.data));
          }
        })
        .catch(function (error) {
          dispatch(fetchFailTableData(error));
        });
    } catch (error) {
      dispatch(fetchFailTableData(error));
    }
  };
};

export const changeFeesStructureStatus = (data, setVisible, visible) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {

    const getUpdatedTableData = async () => {
      var config = {
        method: "GET",
        url: AllUrl.allSchemaList,
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
      toast.success('Update successfully !', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(feesStructureStatusSuccess());
      getUpdatedTableData();
    } else if (response.status === 400) {
      if (visible) {
        setVisible(!visible)
      }
      let value = JSON.stringify(response.status);
      dispatch(feesStructureStatusFailed(value));
      toast.warn('Internal Server Error', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if (response.status === 500) {
      if (visible) {
        setVisible(!visible)
      }
      let value = JSON.stringify(response.status);
      dispatch(feesStructureStatusFailed(value));
      toast.error("Internal Server Error", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      if (visible) {
        setVisible(!visible)
      }
      toast.error("Internal Server Error", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
