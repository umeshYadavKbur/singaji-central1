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
// import logo from "../../assests/image/ssism_si.svg";
import { createFeesStructure } from "../../../redux/actionDispatcher/createFeesStrucDispather";
import "./styles/createAdmin.css";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { baseUrl } from "../../../url/baseUrl";
import { baseUrl } from "../../../redux/constants/url";
// import swal from 'sweetalert';
import Edit_icon from "../../assests/image/Edit_icon.svg";

function FeesStructure({ adminData, createFees, edit, original }) {
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);
  const validationSchema = Yup.object({
    totalFees: Yup.string().required("Required*"),
    stream: Yup.string().required("Required*"),
    startYear: Yup.string().required("Required*"),
    endYear: Yup.string().required("Required*"),
  });

  const formik = useFormik({
    initialValues: {
      totalFees: "",
      startYear: "",
      endYear: "",
      stream: null,
    },
    validationSchema,

    onSubmit: async (values) => {
      var data = JSON.stringify({
        branch_name: formik.values.stream,
        starting_year: formik.values.startYear,
        ending_year: formik.values.endYear,
        total_fees: formik.values.totalFees,
      });
      var config = {
        method: "post",
        url: `${baseUrl}/api/create_schema`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log(config.data);
      createFees(config);
    },
  });
  // if (original) {
  //   formik.values.totalFees = original.total_fees;
  //   formik.values.startYear = original.starting_year;
  //   formik.values.endYear = original.ending_year;
  //   formik.values.stream = original.branch_name;
  // }

  return (
    <>
      {original ? (
        <img
          style={{ cursor: "pointer" }}
          src={Edit_icon}
          alt="Edit"
          onClick={() => setVisible(!visible)}
        />
      ) : (
        <CButton
          style={{
            borderWidth: "1px solid #ffc107 ",
            backgroundColor: "white",
            color: "orange",
            outline: "orange",
            borderColor: "orange",
            marginRight: "10px",
            padding: "5px 15px",
            fontWeight: "bold",
          }}
          onClick={() => setVisible(!visible)}
        >
          Create Fees Structure <i class="fas fa-plus pl-3"></i>
        </CButton>
      )}
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          formik.handleReset();
          setVisible(false);
        }}
      >
        <CModalHeader >
          <h2 className=" feestructurehead fs-3 ">{original ? "Update Fees Structure" : "Create Fees Structure"}</h2>
        </CModalHeader>

        <CModalBody>
          <div className="first_div createAdmin">
            <div className="second_div ">
              <form onSubmit={formik.handleSubmit}>
                <div className=" mb-3 ">
                <label for="stream" className="labels">Stream</label>
                  <select
                    name="stream"
                    id="stream"
                    className=" mt-2 form-select input-lg text-secondary  border-secondary  "
                    value={formik.values.stream}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // eslint-disable-next-line
                    type="text"
                  >
                    <option selected className="fields form-select">
                      Stream
                    </option>
                    <option className="fields form-select" value={"BCA"}>
                      BCA
                    </option>
                    <option className="fields form-select" value={"BBA"}>
                      BBA
                    </option>
                    <option className="fields form-select" value={"BA(CA)"}>
                      BA(CA)
                    </option>
                    <option className="fields form-select" value={"BSC(CS)"}>
                      BSC(CS)
                    </option>
                    <option className="fields form-select" value={"BSC(BT)"}>
                      BSC(BT)
                    </option>
                    <option className="fields form-select" value={"BSC(Micro)"}>
                      BSC(Micro)
                    </option>
                    <option className="fields form-select" value={"B.com(CA)"}>
                      B.com(CA)
                    </option>
                    <option
                      className="fields form-select"
                      value={"BEG Diploma"}
                    >
                      BEG Diploma
                    </option>
                    <option
                      className="fields form-select"
                      value={"MEG Diploma"}
                    >
                      MEG Diploma
                    </option>
                  </select>
                  <label for="startyear"  className="labels">Start year</label>
                  <input
                    value={formik.values.startYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // className="inputs"
                    name="startYear"
                    id="startyear"
                    type="datetime-local"
                    // eslint-disable-next-line
                    className="form-control input-lg fields"
                    placeholder="Starting year"
                  />
                  <label for="endyear"  className="labels">End year</label>
                  <input
                    value={formik.values.endYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // className="inputs"
                    name="endYear"
                    type="datetime-local"
                    id="endyear"
                    // eslint-disable-next-line
                    className="form-control input-lg fields"
                    placeholder="Ending year"
                  />
                  <label for="totalfees"  className="labels">total fees</label>
                  <input
                    value={formik.values.totalFees}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control input-lg fields"
                    name="totalFees"
                    type="text"
                    placeholder="Total-fees"
                  />
                  {formik.errors.totalFees && formik.touched.totalFees ? (
                    <div className="text-danger fs-6">
                      {formik.errors.totalFees}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  className="submit_btn mt-2 w-100 btn-md font-weight-bold text-light"
                  type="submit"
                >
                  {original ? "Update" : "Create"}
                </button>
              </form>
            </div>
          </div>
        </CModalBody>
      </CModal>
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
    createFees: (data) => dispatch(createFeesStructure(data)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(FeesStructure);
