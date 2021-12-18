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
// import logo from "../../assests/image/ssism_si.svg";
import { createFeesStructure } from "../../../redux/actionDispatcher/createFeesStrucDispather";
import "./styles/createAdmin.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../url/baseUrl";
// import swal from 'sweetalert';


function FeesStructure({ adminData, createFees }) {

  console.log(adminData);

  const token = localStorage.getItem('token');
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
      console.log("====================================");
      console.log(values);
      console.log("====================================");
      var data = JSON.stringify({
        branch_name: formik.values.stream,
        starting_year: formik.values.startYear,
        ending_year: formik.values.endYear,
        total_fees: formik.values.totalFees
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

  return (
    <>
      <CButton
        style={{
          backgroundColor: "white",
          color: "#5A607F",
          outline: "none",
          borderColor: "#5A607F",
          marginRight: "10px",
          border: "none",
          fontWeight: "bold"
        }}
        onClick={() => setVisible(!visible)}
      >
        Fees Structure <i class="fas fa-user-edit"></i>
      </CButton>
      <CModal
        // size="md"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>

        </CModalHeader>

        <CModalBody>
          <div className="first_div createAdmin">
            <div className="second_div ">
              <form onSubmit={formik.handleSubmit}>

                <div className=" mb-3 ">
                  <select
                    name="stream"
                    className="fields form-select "
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

                  <input
                    value={formik.values.startYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // className="inputs"
                    name="startYear"
                    type="text"
                    // eslint-disable-next-line
                    className="form-control input-lg"
                    placeholder="Starting year"
                  />
                  <input
                    value={formik.values.endYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // className="inputs"
                    name="endYear"
                    type="text"
                    // eslint-disable-next-line
                    className="form-control input-lg"
                    placeholder="Ending year"
                  />
                  <input
                    value={formik.values.totalFees}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control input-lg"
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
                  Create
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
