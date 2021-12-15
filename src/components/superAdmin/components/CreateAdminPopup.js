import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assests/image/ssism_si.svg";
import "./styles/createAdmin.css";
import { createNewAdmin } from "../../../redux/actionDispatcher/createNewAdminDispatcher";

function CreateAdminPopup({ createAdmin, createNewAdmin }) {
  const token = localStorage.getItem("token");

  const [visible, setVisible] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Format*").required("Required*"),
    name: Yup.string().required("Required*"),
    role: Yup.string().required("Required*"),
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
        url: "https://singaji-central-server.herokuapp.com/api/createNewAdmin",
        headers: {
          Authorization: `Bearer ${token}`,
          // token,
          "Content-Type": "application/json",
        },
        data: data,
      };
      createNewAdmin(config);

      // axios(config)
      //     .then(function (response) {
      //         console.log(JSON.stringify(response.data));
      //     })
      //     .catch(function (error) {
      //         console.log(error);
      //     });
    },
  });

  return (
    <div >

      <CButton
        style={{
          backgroundColor: "white",
          color: "#5A607F",
          outline: "none",
          borderColor: "#5A607F",
        }}
        onClick={() => setVisible(!visible)}
      >
        Create Admin
      </CButton>
      <CModal
        size="md"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Create new admin</CModalTitle>
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
                    className="fields form-select "
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // eslint-disable-next-line
                    type="text"
                  >
                    <option selected className="fields form-select">
                      Role
                    </option>
                    <option className="fields form-select" value={1}>
                      Super Admin
                    </option>
                    <option className="fields form-select" value={2}>
                      Admin
                    </option>
                    <option className="fields form-select" value={3}>
                      Student
                    </option>
                  </select>
                </div>
                <button
                  className=" submit_btn mt-2 w-100  btn-md  font-weight-bold"
                  type="submit"
                >
                  Create
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
    createNewAdmin: (data) => dispatch(createNewAdmin(data)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminPopup);
