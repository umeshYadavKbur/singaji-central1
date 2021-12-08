// import { useParams } from "react-router";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
// import { Link } from "react-router-dom";`
import logo from "../../../assests/image/ssism_si.svg";
import "../styles/createAdmin.css";
import { createNewAdmin } from "../../../../redux/actionDispatcher/createNewAdminDispatcher";

function CreateAdmin({ createAdmin, createNewAdmin }) {
  const token = localStorage.getItem("token");
  console.log("The token is  ", token);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

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
      var data = {
        email: formik.values.email,
        name: formik.values.name,
        role: formik.values.role,
        token: token,
      };

      console.log(data);
      createNewAdmin(data);
      //passing the data in createNewAdmin which contain the dispatch method
      //Add new lines and response in createNewAdmin function
    },
  });

  return (
    <>
      <button
        type="button"
        class="btn btn-light"
        data-toggle="modal"
        data-target="#myModal"
        onClick={toggleModal}
      >
        create admin <i class="fas fa-plus"></i>
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="first_div">
              <div className="second_div ">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                >
                  <span aria-hidden="true" className="white-text">
                    ×
                  </span>
                </button>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <img src={logo} alt="logo ssism" className="logo_img" />{" "}
                    <br />
                  </div>
                  <div classname=" mb-3 ">
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
                      classname="mt-2 mb-2"
                      placeholder="Name"
                    />
                    <select
                      name="role"
                      className="fields form-select "
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="role"
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
          </div>
        </div>
      </Modal>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateAdmin);
