import axios from "axios";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../redux/constants/actions";
import { baseUrl } from "../redux/constants/url";

const requests = {
  post: (url, body, dispatch) => {
    // console.log("body", body, url)
    axios
      .post(`${baseUrl}${url}`, body)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .then((err) => {
        console.log(err);
        dispatch({ type: LOGIN_FAIL, payload: err });
      });
  },
};

const AuthServices = {
  login: (email, password, dispatch) => {
    console.log("data ", email, password);
    requests.post("/api/login", { email, password }, { dispatch });
  },
};
//eslint-disable-next-line
export default { AuthServices };
