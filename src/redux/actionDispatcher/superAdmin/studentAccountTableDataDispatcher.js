import axios from "axios";
import {
  FETCH_STUDENTACCOUNT_DATA,
  STUDENTACCOUNT_TABLE_DATA_FAIL,
  STUDENTACCOUNT_TABLE_DATA_SUCCESS,
  GET_DAILY_REPORT,
  CHANGE_DAILY_REPORT,
} from "../../constants/actions";
// import AllUrl from "../../constants/url";


export const fetchStudentAccountData = (data) => {
  return (dispatch) => {
    dispatch(fetchStuAccData());
    try {
      axios(data)
        .then(function (response) {
          console.log("THe data is ________________", response);
          //Printing the response of the data
          console.log(response);
          if (response.status === 200) {
            dispatch(accStuDataSuccess(response.data));
          }
          if (response.status === 400) {
            dispatch(accStuDataFail(response.data));
          }
        })
        .catch(function (error) {
          dispatch(accStuDataFail(error));
        });
    } catch (error) {
      dispatch(accStuDataFail(error));
    }
  };
};












const fetchStuAccData = () => {
  return {
    type: FETCH_STUDENTACCOUNT_DATA
  }
}

const accStuDataSuccess = (data) => {
  return {
    type: STUDENTACCOUNT_TABLE_DATA_SUCCESS,
    payload: data
  }
}

const accStuDataFail = () => {
  return {
    type: STUDENTACCOUNT_TABLE_DATA_FAIL
  }
}

export const getDailyReport = (data) => {
  return {
    type: GET_DAILY_REPORT,
    payload: data
  }
}
export const changeDailyReport = () => {
  return {
    type: CHANGE_DAILY_REPORT,
  }
}

