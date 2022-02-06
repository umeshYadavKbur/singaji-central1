
import {
    CButton,
    CModal,
    CModalBody,
    // CModalHeader,
    // CModalTitle,
    // CModalTitle,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import crossButton from "../assests/image/crossButton.svg";
import "./styles/createAdmin.css";
//   import { useNavigate } from "react-router-dom";
//   import LoaderButton from "../assests/common/LoaderButton";
//   import AllUrl from "../../redux/constants/url";
//   import axios from 'axios'

function ViewReceiptPopup({ data }) {
    // const token = localStorage.getItem("token");
    // const navigate = useNavigate();

    // console.log(adminData);

    const [visible, setVisible] = useState(false);

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
                View
            </CButton>
            <CModal

                alignment="center"
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
            >
                <CModalBody>
                    <div className="first_div createAdmin">
                        <div className="second_div " style={{ marginTop: "0px" }}>
                            <img onClick={() => setVisible(!visible)}
                                style={{ height: "20px", width: "20px", marginLeft: '110%', marginTop: "-10px", cursor: "pointer" }} src={crossButton} alt="close" className="logo_img" />
                            <h4 className=" text-aligns-center createAdminhead" style={{ color: '#5A607F', fontWeight: 'bold' }}>
                                Receipt data
                            </h4>
                            <h4 className="d-flex" style={{ color: '#5A607F', fontWeight: 'bold' }}>
                                {data.name}{data.fathersName} , {data.year} ,{data.report_remark}
                            </h4>

                        </div>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    );
}

export default ViewReceiptPopup;

