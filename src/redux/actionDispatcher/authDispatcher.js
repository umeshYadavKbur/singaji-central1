import { axios } from "axios";
// import baseUrl from "../constants/url";
// import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/actions";

export const fetchUserInfo = (data) => {
  console.log(data);
  var config = {
    method: "post",
    url: "https://singaji-central-server.herokuapp.com/api/login",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpeWF5LmJjYTIwMjBAc3Npc20ub3JnIiwicm9sZSI6IlNVUEVSQURNSU4iLCJ0aWQiOiJrbGFkc2Zyb3dpdWlqNDU3NHdlOThyNzg5c2Q3ZiIsImV4cCI6MTYzNjYyMzAzNCwiaWF0IjoxNjM2NjE5NDM0fQ.nplyqj91jX8KEqR7YZ7D_Dpw3Z1YFgAHeQy8jYxYFiQ",
      "Content-Type": "application/json",
    },
    data: data,
  };

  async function submitForm() {
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  submitForm();
  // const baseUrl = "https://singaji-central-server.herokuapp.com";
  // console.log("on the action field", data);

  // return (dispatch) => {
  //   dispatch(loginRequest());
  //   axios
  //     .get(`${baseUrl}/api/login`, data)
  //     .then((response) => {
  //       const users = response.data;
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("user", response.data.user);
  //       localStorage.setItem("role", response.data.role);
  //       console.log(response.data);
  //       dispatch(loginSuccess(users));
  //       // history.push('/');
  //     })
  //     .catch((error) => {
  //       const errorMsg = error.message;
  //       console.log(errorMsg);
  //       dispatch(loginFailure(errorMsg));
  //     });
  // };
};

// const loginRequest = () => {
//   return {
//     type: LOGIN_REQUEST,
//   };
// };

// const loginSuccess = (users) => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: users,
//   };
// };

// const loginFailure = (error) => {
//   return {
//     type: LOGIN_FAIL,
//     payload: error,
//   };
// };
