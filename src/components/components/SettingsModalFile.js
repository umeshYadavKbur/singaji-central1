import {
  CButton,
  CModal,
  CModalBody,
  // CModalHeader,
  // CModalTitle,
  // CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import crossButton from "../assests/image/crossButton.svg";
import "./styles/createAdmin.css";
import { createNewAdmin } from "../../redux/actionDispatcher/superAdmin/createNewAdminDispatcher";
// import { useNavigate } from "react-router-dom";
import LoaderButton from "../assests/common/LoaderButton";
// import AllUrl from "../../redux/constants/url";
// import axios from 'axios';
import personal_png from "../assests/image/personal-profile.svg"
import { useAnimate } from "react-simple-animate";
function CreateAdminPopup({ adminData, createNewAdmin }) {

  const myname = localStorage.getItem("user");
  const userEmail = localStorage.getItem("email");
  console.log("------------------------------")
  console.log(myname)

  // const token = JSON.stringify(localStorage.getItem("token"));
  // const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [visible, setVisibleSe] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Please fill the field above"),
    password: Yup.string().required("Please fill the field above"),
  });

  const formik = useFormik({
    initialValues: {
      name: myname ? myname : "",
      password: '',
    },
    validationSchema,

    // onSubmit: (values) => {
    //   var data = JSON.stringify({
    //     name: formik.values.name,
    //     password: formik.values.role,
    //   });
    //   var config = {
    //     method: "post",
    //     url: AllUrl.createNewAdmin,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     data: data,
    //   };
    //   createNewAdmin(config, navigate);
    // },
  });


  return (
    <div>
      <CButton
        className="personal-setting-button"
        onClick={() => setVisibleSe(!visible)}
      >
        {/* <i className="fas fa-plus"></i> */}
        Settings
      </CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          formik.handleReset();
          setVisibleSe(false);
        }}
      >
        <CModalBody className="my-modal-body" >
          <div className="first_div createAdmin ">
            <div className=" cross-btn-div d-flex ">
              <img onClick={() => setVisibleSe(!visible)}
                style={{ height: "22px", width: "22px", cursor: "pointer", marginRight: "14px", marginTop: "15px" }} src={crossButton} alt="close" className="logo_img" />
            </div>
            <div className="second_div justify-content-center  " style={{ marginTop: "0px" }}>
              <form onSubmit={formik.handleSubmit} className="d-flex justify-content-center flex-column" >

                <div className="row d-flex justify-content-center" style={{ marginTop: "-85px" }}  >
                  <img src={personal_png} alt="logo ssism" className="personal-profile" />{" "}
                </div>
                <div className="row d-flex justify-content-center mt-2 " style={{ color: "#5a607f" }}>{userEmail}</div>
                <div className="row d-flex justify-content-center fw-bold mt-2 " style={{ color: "#5a607f", fontSize: "22px" }}>Edit Profile</div>

                <div className="d-flex flex-column justify-content-center" style={{ alignItems: "center" }}>

                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="inputs"
                    // onClick={(e) => (e.stopPropagation())}
                    // aria-label="email"
                    name="name"
                    type="text"
                    style={{ width: "270px", marginTop: "32px", height: "40px" }}
                    id="name"
                  // placeholder="Enter name "
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <div className="text-danger fs-6">
                      {formik.errors.name}
                    </div>
                  ) : (
                    ""
                  )}
                  <input
                    value={formik.values.pass}
                    onChange={formik.handleChange}
                    onClick={() => setShow(!show)}

                    onBlur={formik.handleBlur}
                    className="inputs"
                    // aria-label="email"
                    name="password"
                    type=""
                    style={{ width: "270px", marginTop: "38px", height: "40px" }}
                    id="password"
                    placeholder="Current password"
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <div className="text-danger fs-6">
                      {formik.errors.name}
                    </div>
                  ) : (
                    ""
                  )}

                  <div >
                    {
                      show ? <div id="box" className="box d-flex flex-column justify-content-center"  >
                        <input type="text" style={{ width: "270px", marginTop: "38px", height: "40px" }} className="" />
                        <input type="text" style={{ width: "270px", marginTop: "38px", height: "40px" }} className="" />
                      </div> : ""
                    }
                  </div>

                </div>
                <div style={{ height: "35px" }} ></div>
                <button
                  disabled={adminData.loading}

                  className=" setting-save-btn mx-auto"
                  type="submit"
                >
                  {adminData.loading ? <LoaderButton /> : "Save"}
                </button>
              </form>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </div>
  );
}

//Getting the state from the store
const mapStateToProps = (state) => {
  return {
    adminData: state.createAdmin,
  };
};

//passing the userData in createNewAdmin function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    createNewAdmin: (config, navigate) => dispatch(createNewAdmin(config, navigate)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminPopup);
