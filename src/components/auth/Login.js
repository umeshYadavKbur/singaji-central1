import React from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
//importing Components
import Singaji_logo from "../assests/image/Singaji_logo.svg";
import { fetchUsers } from "../../redux/actionDispatcher/authDispatcher";
import { useHistory } from "react-router";
// import swal from "sweetalert";
// import { useEffect } from "react";
// import { checkOnlineStatus } from "../../services/onlineOfflineStatus";
// import swal from "sweetalert";

function Login({ userData, fetchUsers }) {
  // setInterval(async () => {
  //   const result = await checkOnlineStatus();
  //   result ?console.log("online"):console.log("offline");
  // },300);

  const history = useHistory();

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

  console.log("maijn page", userData);
  if (userData.role === "SUPERADMIN") {
    history.push("/admindashboard");
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

  // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
  // const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})

  return (
    <>
      <div style={{ height: "100vh", width: "100vw", background: "rgb(207 207 207)" }}>
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
            <div className="d-flex justify-content-center fw-bold">
              <h4 className="h4 mb-3 text-secondary">Login</h4>
            </div>
            <div className="mb-3">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                type="text"
                className="form-control mb-2"
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
                className="form-control "
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
                  marginBottom:"5px"
                }}
              >
                Forgot password
              </Link>
            </div>
            <button
              className="w-100 btn btn-md btn-warning fw-bold text-light"
              type="submit"
              disabled={userData.loading}
            >
              {userData.loading ? "loading..." : "Submit"}
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
