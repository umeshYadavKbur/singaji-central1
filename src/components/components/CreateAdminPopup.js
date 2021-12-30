import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  // CModalTitle,
  // CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assests/image/User.svg";
import "./styles/createAdmin.css";
import { createNewAdmin } from "../../redux/actionDispatcher/superAdmin/createNewAdminDispatcher";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../assests/common/LoaderButton";
import AllUrl from "../../redux/constants/url";

function CreateAdminPopup({ adminData, createNewAdmin }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // console.log(adminData);

  const [visible, setVisible] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format*")
      .required("Please fill the field above"),
    name: Yup.string().required("Please fill the field above"),
    role: Yup.string().required("Please fill the field above"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      role: null,
    },
    validationSchema,

    onSubmit: (values) => {
      var data = JSON.stringify({
        email: formik.values.email,
        name: formik.values.name,
        role: formik.values.role,
      });
      var config = {
        method: "post",
        url: AllUrl.createNewAdmin,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      createNewAdmin(config , navigate);
    },
  });

  return (
    <div>
      <CButton
        style={{
          backgroundColor: "#F7922A",
          color: "white",
          outline: "none",
          border: "none",
          fontWeight: "bold",
          marginLeft: "15px",
        }}
        onClick={() => setVisible(!visible)}
      >
        Create Admin <i className="fas fa-plus"></i>
      </CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          formik.handleReset();
          setVisible(false);
        }}
      >
        <CModalHeader>

          <h2 style={{ marginLeft: "129px", color: "#5A607F" }}>
            Create Admin
          </h2>


        </CModalHeader>
        <CModalBody>
          <div className="first_div createAdmin">
            <div className="second_div " style={{ marginTop: "0px" }}>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  {/* <h4 className=" text-aligns-center createAdminhead">
                    Create Admin
                  </h4> */}
                  <img src={logo} alt="logo ssism" className="logo_img" />{" "}
                  {/* <br /> */}
                </div>
                <div>
                  <label for="gmail" className="labels mb-1">
                    Username
                  </label>
                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="inputs mb-2"
                    // aria-label="email"
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Enter name "
                  />
                  <label for="gmail" className="labels mb-1">
                    Email
                  </label>
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="inputs mb-2"
                    // aria-label="email"
                    name="email"
                    type="text"
                    id="gmail"
                    placeholder="xyz@gmail.com"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-danger fs-6">
                      {formik.errors.email}
                    </div>
                  ) : (
                    ""
                  )}

                  <label for="role" className="labels mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    className="form-select text-secondary  border-secondary "
                    value={formik.values.role}
                    // defaultValue="null"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // eslint-disable-next-line
                    id="role"
                    type="text"
                  >
                    <option selected className="form-select">
                      Role
                    </option>
                    <option className="form-select" value={1}>
                      Super Admin
                    </option>
                    <option className="form-select" value={2}>
                      Admin
                    </option>
                  </select>
                </div>
                <button
                  disabled={adminData.loading}
                  className=" submit_btn mt-2 w-100  btn-md text-light font-weight-bold"
                  type="submit"
                >
                  {adminData.loading ? <LoaderButton /> : "Create"}
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
    createNewAdmin: (config , navigate) => dispatch(createNewAdmin(config , navigate)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminPopup);
