import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../components/assests/image/Singaji_logo.svg";

function Modal() {
    const token = localStorage.getItem("token");

    const [visible, setVisible] = useState(false)
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
                    Authorization:
                        `Bearer ${token}`,
                    // token,
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
    });

    return (
        <>
            <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton>
            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>
                //         <div className="modal-dialog modal-dialog-centered ">
                        <div className="modal-content">
                            <div className="first_div">
                                <div className="second_div ">
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
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
                </CModalBody>
            </CModal>
        </>
    )
}

export default Modal
