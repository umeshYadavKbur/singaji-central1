import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoaderButton from "../assests/common/LoaderButton";

//importing Components
import { ToastContainer } from 'react-toastify';
import Singaji_logo from "../assests/image/Singaji_logo.svg";
import { fetchUsers } from "../../redux/actionDispatcher/authDispatcher";
import '../superAdmin/components/styles/Login.css';

function Login({ userData, fetchUsers }) {


  // setInterval(async () => {
  //   const result = await checkOnlineStatus();
  //   result ?console.log("online"):console.log("offline");
  // },300);
  var navigate = useNavigate();
  
  // useEffect(() => {
  //   if (localStorage.getItem('role') === 'SUPERADMIN') {
  //     history.push('/home')
  //   }
  //   else if (localStorage.getItem('role') === 'STUDENT') {
  //     history.push('/student')
  //   }
  //   else if (localStorage.getItem('role') === 'ADMIN') {
  //     history.push('/admin')
  //   }
  // })
  // console.log(userData)


  if (userData.role === "SUPERADMIN") {
    navigate("/admindashboard");
  } else if (userData.role === "ACCOUNTADMIN") {
    navigate("/admindashboard");
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Format*").required("Please Enter Email"),
    password: Yup.string().required("Please Enter Password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,


    onSubmit: (values) => {
      console.log(values);
      const data = {
        email: formik.values.email,
        password: formik.values.password,
      };

      //passing the data in fetchUsers which contain the dispatch method
      //Add new lines and response in fetchUsers function
      fetchUsers(data);
    },
  });


  // useEffect(() => {
  //   if (userData.error === "400") {
  //     toast.error("Login unsuccessfull");
  //   }
  //   return () => {
  //   }
  // }, [userData.error])


  return (
    <>
      <div className="bg-login">
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div
          className="position-absolute top-50 start-50 translate-middle login-card "
        >

          <form onSubmit={formik.handleSubmit} className="login-form">
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
            <div className="d-flex justify-content-center fw-bold">
              <h4 className="h4 mb-3 " style={{ color: "black" }}>Login</h4>
            </div>
            <div className="mb-3 input-login-box">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                type="text"
                className="form-control mb-2 login-input"
                placeholder="Email"
                disabled={userData.loading}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-danger fs-6">{formik.errors.email}</div>
              ) : (
                ""
              )}
              <input

                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                type="password"
                className="form-control login-input "
                placeholder="Password"
                disabled={userData.loading}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-danger fs-6">{formik.errors.password}</div>
              ) : (
                ""
              )}
            </div>
            <div className="d-flex justify-content-end mb-1">
              <Link
                disabled={userData.loading}
                to="/forgetpassword"
                style={{
                  color: "gray",
                  cursor: "pointer",
                  textDecoration: "none",
                  marginBottom: "5px"
                }}
              >
                Forgot password
              </Link>
            </div>
            <button
              className="w-100 btn btn-md btn-warning fw-bold text-light button-color"
              type="submit"
              disabled={userData.loading}
            >
              {userData.loading ? (<LoaderButton />) : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

//Getting the state from the store
const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (data) => dispatch(fetchUsers(data)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(Login);
