import axios from "axios";

import { baseUrl } from "../redux/constants/url";
// const responseBody = (res) => res.body;

const requests = {
  post: (url, body) => {
    console.log("body", body, url);
    axios
      .post(`${baseUrl}${url}`, body)
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  },
};

const AuthServices = {
  login: (email, password) => {
    console.log("data ", email, password);
    requests.post("/api/login", { email, password });
  },
};
//eslint-disable-next-line
export default { AuthServices };
