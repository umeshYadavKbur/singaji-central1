import React from "react";

// import './login.css'
import Singaji_logo from '../assests/image/Singaji_logo.svg'
import {useFormik} from 'formik';
import {connect} from 'react-redux';
import {fetchUserEmail} from '../../redux/actionDispatcher/forgotpassDispatcher';
import *as Yup from 'yup'
// import { useHistory } from 'react-router';
import LoaderButton from '../assests/common/LoaderButton';
import { useNavigate } from "react-router-dom";

function ForgotPassword({ passData, fetchUserEmail }) {
  const navigate = useNavigate();
  // const history = useHistory()
  // const navigate = useNavigate();

  if (passData.success) {
    navigate("/login");
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Format*").required("Enter the Email!"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const email = { email: formik.values.email };
      console.log("Email", email);
      fetchUserEmail(email);
    },
  });
  // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
  // const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "rgb(207 207 207)",
        }}
      >
        <div
          className="position-absolute top-50 start-50 translate-middle m-auto bg-light px-5 pt-2 pb-5 shadow rounded-5"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-center">
              <img
                onClick={() => {
                  navigate("/login");
                }}
                src={Singaji_logo}
                alt="logo ssism"
                width={100}
                height={82}
              />
            </div>
            <div className="d-flex justify-content-center">
              <h4 className="h4 mb-3 text-secondary">Enter your Email</h4>
            </div>
            <div className="mb-3">
              <input
                disabled={passData.loading}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="email"
                type="text"
                className="form-control"
                placeholder="Email"
              />
              {formik.errors.email && formik.touched.email ? (<div className="text-danger fs-6">{formik.errors.email}</div> ) : (  ""  )}
            </div>

            <button disabled={passData.loading} className="w-100 btn btn-md btn-warning fw-bold text-light" type="submit">{
                            passData.loading ? (<LoaderButton />) : "Get Link"
                        }</button>
          </form>
        </div>
      </div>
    </>
  );
}

//Getting the state from the store
const mapStateToProps = (state) => {
  return {
    passData: state.response,
  };
};

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserEmail: (email) => dispatch(fetchUserEmail(email)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
