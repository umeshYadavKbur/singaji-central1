import axios from "axios";
import {
  FETCH_STUDENTACCOUNT_DATA,
  STUDENTACCOUNT_TABLE_DATA_FAIL,
  STUDENTACCOUNT_TABLE_DATA_SUCCESS,
  // STUDENTACCOUNT_CHANGE_STATUS,
  // STUDENTACCOUNT_TABLE_CHANGE_SUCCESS,
  // STUDENTACCOUNT_TABLE_CHANGE_FAIL,
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
    payload:data
  }
}

const accStuDataFail = () => {
  return {
    type: STUDENTACCOUNT_TABLE_DATA_FAIL
  }
}

// const accStuDataStatusChange = () => {
//     return {
//         type: STUDENTACCOUNT_CHANGE_STATUS
//     }
// }

// const accStuDataStatusSuccess = () => {
//     return {
//         type: STUDENTACCOUNT_TABLE_CHANGE_SUCCESS
//     }
// }

// const accStuDataStatusFail = () => {
//     return {
//         type: STUDENTACCOUNT_TABLE_CHANGE_FAIL
//     }
// }