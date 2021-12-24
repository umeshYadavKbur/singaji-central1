import {  useParams } from "react-router";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import '../superAdmin/components/styles/Login.css'
import Singaji_logo from "../assests/image/Singaji_logo.svg";
import { newPasswordRequest } from "../../redux/actionDispatcher/newPassDispatcher";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



function ResetPassword({ newPassword, newPasswordRequest }) {
  console.log(newPassword);
  const { token } = useParams();
  // const history = useHistory();
  const navigate = useNavigate();


  console.log(newPassword);

  // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
  // const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})
  // const redirection = () => {
  //   history.push('./login')
  // }
  if(newPassword.newPass) {
    toast.error("Login unsuccessfull");
    // navigate('/login');
  }
  const validationSchema = Yup.object({
    password: Yup.string().required("Required*"),
    confirm: Yup.string().required("Required*"),
  })

 
  const formik = useFormik({
    initialValues: {
      confirm: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      
      if(formik.values.confirm === formik.values.password){
      const data = {
        password: formik.values.password,
        token:token
      }
// console.log(values);
      // //passing the data in fetchUsers which contain the dispatch method
      // //Add new lines and response in fetchUsers function
        newPasswordRequest(data)
    }
    },
  });
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
                onClick={() => {
                  navigate("/login");
                }}
                className="mb-2 cursor-pointer "
                src={Singaji_logo}
                alt="logo ssism"
                width={100}
                height={82}
                style={{ alignItems: "center", borderRadius: "40px" }}
              />{" "}
              <br />
            </div>
            <div className="d-flex justify-content-center">
              <h4 className="h4 mb-3 text-secondary">Enter New Password</h4>
            </div>
            <div className="mb-3 input-login-box button-color">
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                type="text"
                className="form-control mb-2"
                placeholder="Password"
              />
              {formik.errors.password && (
                <div className="text-danger fs-6">{formik.errors.password}</div>
              )}
              <input
                value={formik.values.confirm}
                onChange={formik.handleChange}
                name="confirm"
                type="text"
                className="form-control"
                placeholder="Confirm Password"
              />
              {formik.errors.confirm && (
                <div className="text-danger fs-6">{formik.errors.confirm}</div>
              )}
            </div>
            <button
              style={{ color: "white", fontWeight: "500" }}
              className="w-100 btn btn-md btn-warning"
             type="submit"
              disabled={newPassword.loading}
            >
              {newPassword.loading ? "loading..." : "Submit"}
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
    newPassword: state.newPassword,
  };
};

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    newPasswordRequest: (data) => dispatch(newPasswordRequest(data)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
