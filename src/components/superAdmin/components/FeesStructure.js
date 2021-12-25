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
import { createFeesStructure } from "../../../redux/actionDispatcher/createFeesStrucDispather";
import "./styles/createAdmin.css";
import AllUrl, { baseUrl } from "../../../redux/constants/url";
import Edit_icon from "../../assests/image/Edit_icon.svg";
import axios from "axios";
import Swal from "sweetalert2";

function FeesStructure({ adminData, createFees, original }) {
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);
  const validationSchema = Yup.object({
    totalFees: Yup.string().required("Required*"),
    stream: Yup.string().required("Required*"),
    startYear: Yup.string().required("Required*"),
    endYear: Yup.string().required("Required*"),
  });

  // if (original) {
  //   formik.values.totalFees = original.total_fees;
  //   formik.values.startYear = original.starting_year;
  //   formik.values.endYear = original.ending_year;
  //   formik.values.stream = original.branch_name;
  // }

  const [fieldData, setFieldData] = useState([
    {
      "id": 0,
      "subjects": "Loading..."
    }
  ])

  const formik = useFormik({
    initialValues: {
      totalFees: original ? original.total_fees : "",
      startYear: original ? original.starting_year : "",
      endYear: original ? original.ending_year : "",
      stream: original ? original.branch_name : "",
    },
    validationSchema,

    onSubmit: async (values) => {
      if (original) {
        var update = JSON.stringify({
          branch_schema_code: formik.values.stream + formik.values.starting_year,
          total_fees: formik.values.total_fees,
        })

        var config = {
          method: 'post',
          url: AllUrl.updateSchema,
          headers: {
            'Content-Type': 'application/json'
          },
          data: update
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });


      }
      else {
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
        // console.log(config.data);
        createFees(config);
      }
    },
  });



  const getData = async () => {
    setVisible(!visible)
    if (!visible) {
      let url = `${baseUrl}/api/list_branch`
      var dropdownData = await axios(url)
      if (dropdownData.status === 200) {
        var data = dropdownData.data
        setFieldData(data)

      } else {
        Swal.fire({
          position: 'top-center',
          icon: 'warning',
          title: 'Network problem ! ',
          showConfirmButton: false,
          timer: 2500
        })
      }
    }


  }

  return (
    <>
      {original ? (
        <img
          style={{ cursor: "pointer" }}
          src={Edit_icon}
          alt="Edit"
          onClick={() => { getData() }}
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
          onClick={() => { getData() }}
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
        <CModalHeader>
          <h2 className=" feestructurehead fs-3 ">
            {original ? "Update Fees Structure" : "Create Fees Structure"}
          </h2>
        </CModalHeader>

        <CModalBody>
          <div className="first_div createAdmin">
            <div className="second_div ">
              <form onSubmit={formik.handleSubmit}>
                <div className=" mb-3 ">
                  <label for="stream" className="labels">

                    Stream

                  </label>
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
                      {
                        original ? `${original.branch_name}` : "Stream"
                      }
                    </option>
                    {
                      fieldData.map((data) => {
                        return (
                          <option key={data.id} className="fields form-select" value={data.subjects}>
                            {data.subjects}
                          </option>
                        )

                      })
                    }

                  </select>
                  <label for="startyear" className="labels">
                    Start year
                  </label>
                  <input
                    value={formik.values.startYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // className="inputs"
                    name="startYear"
                    id="startyear"
                    type="number"
                    min="1900"
                    max="2099"
                    // eslint-disable-next-line
                    className="form-control input-lg fields"
                    placeholder="Starting year"
                  />
                  <label for="endyear" className="labels">
                    End year
                  </label>
                  <input
                    value={formik.values.endYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // className="inputs"
                    name="endYear"
                    type="number"
                    min="1900"
                    max="2099"
                    id="endyear"
                    // eslint-disable-next-line
                    className="form-control input-lg fields"
                    placeholder="Ending year"
                  />
                  <label for="totalfees" className="labels">
                    total fees
                  </label>
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
