import React from "react";
// import {useMediaQuery} from 'react-responsive';
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Singaji_logo from "../assests/image/Singaji_logo.svg";
import { connect } from "react-redux";
import { fetchUserInfo } from "../../redux/actionDispatcher/authDispatcher";
// import './login.css'
// import logo from './assets/logo.png'
// import axios from "axios";
// import { baseUrl } from "../../redux/constants/url";
// import { useHistory } from "react-router";

function Login() {
  //   const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.password) {
        errors.password = "Required!";
      }
      if (!values.email) {
        errors.email = "Required!";
      } else if (
        // eslint-disable-next-line
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          values.email
        )
      ) {
        errors.email = "Invalid email format!";
      }
      return errors;
    },
    onSubmit: async (values) => {
      var data = JSON.stringify({
        email: formik.values.email,
        password: formik.values.password,
      });
      // console.log(data);
      fetchUserInfo(data);
    },
  });

  // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
  // const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})

  return (
    <>
      <div style={{ height: "100vh", width: "100vw", background: "#f3eded" }}>
        <div
          className="position-absolute top-50 start-50 translate-middle "
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "25px 45px 45px 45px",
            margin: "auto",
            background: "white",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-center">
              <img
                src={Singaji_logo}
                alt="logo ssism"
                width={100}
                height={82}
                style={{ alignItems: "center", borderRadius: "40px" }}
              />{" "}
              <br />
            </div>
            <div className="d-flex justify-content-center">
              <h4 className="h4 mb-3 " style={{ fontWeight: "bold" }}>
                Login
              </h4>
            </div>
            <div className="mb-3">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                type="text"
                className="form-control mb-2"
                placeholder="Email"
              />
              {formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                type="text"
                className="form-control "
                placeholder="Password"
              />
              {formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
            <div className="d-flex justify-content-end mb-1">
              <Link
                to="/forgetpassword"
                style={{
                  color: "gray",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Forgot password
              </Link>
            </div>
            <button
              style={{ color: "white", fontWeight: "500" }}
              className="w-100 btn btn-md btn-warning"
              type="submit"
            >
              Sumbit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: (data) => dispatch(fetchUserInfo(data)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
