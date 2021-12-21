import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  // CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assests/image/ssism_si.svg";
import "./styles/createAdmin.css";
import { createNewAdmin } from "../../../redux/actionDispatcher/createNewAdminDispatcher";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../../assests/common/LoaderButton";
import { baseUrl } from "../../../redux/constants/url";

function CreateAdminPopup({ adminData, createNewAdmin }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log(adminData);

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
        url: `${baseUrl}/api/createNewAdmin`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      createNewAdmin(config);
    },
  });

  return (
    <div>
      <CButton
        style={{
          backgroundColor: "white",
          color: "#5A607F",
          outline: "none",
          // borderColor: "#5A607F",
          border: "none",
          fontWeight: "bold",
        }}
        onClick={() => setVisible(!visible)}
      >
        Create Admin <i class="fas fa-plus"></i>
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
          {/* <CModalTitle>Create new admin  </CModalTitle> */}
        </CModalHeader>
        <CModalBody>
          <div className="first_div createAdmin">
            <div className="second_div ">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <img src={logo} alt="logo ssism" className="logo_img" />{" "}
                  <br />
                </div>
                <div className=" mb-3 ">
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="inputs"
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-danger fs-6">
                      {formik.errors.email}
                    </div>
                  ) : (
                    ""
                  )}

                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="inputs"
                    name="name"
                    type="text"
                    // eslint-disable-next-line
                    className="mt-2 mb-2"
                    placeholder="Name"
                  />
                  <select
                    name="role"
                    className=" form-select "
                    value={formik.values.role}
                    // defaultValue="null"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // eslint-disable-next-line
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
                    {/* <option className="form-select" value={3}>
                      Student
                    </option> */}
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
    createNewAdmin: (config) => dispatch(createNewAdmin(config)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminPopup);
