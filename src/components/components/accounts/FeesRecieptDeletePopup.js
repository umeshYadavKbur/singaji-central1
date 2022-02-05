
import {
    CButton,
    CModal,
    CModalBody,
    // CModalHeader,
    // CModalTitle,
    // CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
// import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
// import logo from "../assests/image/User.svg";
// import crossButton from "../assests/image/crossButton.svg";
// import "./styles/createAdmin.css";
// import { createNewAdmin } from "../../redux/actionDispatcher/superAdmin/createNewAdminDispatcher";
import { useNavigate } from "react-router-dom";
// import LoaderButton from "../assests/common/LoaderButton";
// import AllUrl from "../../redux/constants/url";
import axios from 'axios';
// import logo from "../../assests/image/User.svg";
import crossButton from "../../assests/image/crossButton.svg";
import AllUrl from "../../../redux/constants/url";
import LoaderButton from "../../assests/common/LoaderButton";

function FeesRecieptDeletePopup({ data }) {
    const token = localStorage.getItem("token");
    const stdId = data.stdId
    const AccountsReceiptNo = data.AccountsReceiptNo
    // console.log(adminData);

    const [visible, setVisible] = useState(false);

    // console.log(data)

    const validationSchema = Yup.object({
        remark: Yup.string().required("Please fill the field above"),

    });

    const formik = useFormik({
        initialValues: {
            remark: "",

        },
        validationSchema,

         onSubmit: async (values) => {
            console.log(data.stdId);
            var resultData = JSON.stringify({
                stdId: stdId,
                AccountsReceiptNo: AccountsReceiptNo,
                report_remark: formik.values.remark,
                is_report: "true"
            });

            console.log(resultData)
            var config = {
                method: "post",
                url: AllUrl.deletereciept,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                data: resultData,
            };
            var resultOfAxios = await axios(config)
            console.log(resultOfAxios);

            // createNewAdmin(config, navigate);
        },
    });

    return (
        <div>
            <i className="fas fa-trash-alt mr-3 mt-3" style={{ cursor: "pointer" }} onClick={() => setVisible(!visible)} ></i>
            <CModal

                alignment="center"
                visible={visible}
                onClose={() => {
                    formik.handleReset();
                    setVisible(false);
                }}
            >
                <CModalBody>
                    <div className="first_div createAdmin">
                        <div className="second_div " style={{ marginTop: "0px" }}>
                            <div>
                                <img onClick={() => setVisible(!visible)}
                                    style={{ height: "20px", width: "20px", marginLeft: '110%', marginTop: "-10px", cursor: "pointer" }} src={crossButton} alt="close" className="logo_img" />
                                <h4 className=" text-aligns-center createAdminhead" style={{ color: '#5A607F', fontWeight: 'bold' }}>
                                    Delete Reciept
                                </h4>
                                {/* <img src={logo} alt="logo ssism" className="logo_img" />{" "} */}
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <textarea name="remark"
                                    class="form-control" id="exampleFormControlTextarea1 remark"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} value={formik.values.remark} rows="3"></textarea>
                                {formik.errors.remark && formik.touched.remark ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.remark}
                                    </div>
                                ) : (
                                    ""
                                )}
                                <button
                                    // disabled={adminData.loading}
                                    style={{ marginTop: '35px' }}
                                    className=" submit_btn w-100  btn-md text-light font-weight-bold"
                                    type="submit"
                                >
                                    {/* {adminData.loading ? <LoaderButton /> : "Request"} */}
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    );
}



//Connecting the component to our store
export default FeesRecieptDeletePopup;
