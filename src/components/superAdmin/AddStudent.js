import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import AddNewStudent from '../../redux/actionDispatcher/addNewStudentDispatcher';

function AddStudent() {

 const validationSchema= Yup.object({
   firstName: Yup.string().required("Required!"),
   lastName: Yup.string().required("Required!"),
   branchName: Yup.string().required("Required!"),
   fatherName: Yup.string().required("Required!"),
   dob: Yup.string().required("Required!"),
   mobileNo: Yup.string().required("Required!"),
   email: Yup.string().required("Required!"),
   traceName: Yup.string().required("Required!"),
   schoolName: Yup.string().required("Required!"),
   school12Subject: Yup.string().required("Required!"),
   percentage12: Yup.string().required("Required!"),
   percentage11: Yup.string().required("Required!"),
   percentage10: Yup.string().required("Required!"),
   aadharNumber: Yup.string().required("Required!"),
   fatherOccupation: Yup.string().required("Required!"),
   fatherIncome: Yup.string().required("Required!"),
   category: Yup.string().required("Required!"),
   village: Yup.string().required("Required!"),
   tehsil: Yup.string().required("Required!"),
   district: Yup.string().required("Required!"),
   registrationFees: Yup.string().required("Required!"),
   gender: Yup.string().required("Required!"),
   schemeFees: Yup.string().required("Required!"),
  //  courseFees: Yup.string().required("Required!"),
  //  postmatricScholarship: Yup.string().required("Required!"),
  //  postmatricScholarshipOwner: Yup.string().required("Required!"),
  //  gkbScholarship: Yup.string().required("Required!"),
  //  gkbScholarshipOwner: Yup.string().required("Required!"),
  //  firstInstallment: Yup.string().required("Required!"),
  //  firstInstallmentDate: Yup.string().required("Required!"),
  //  secondInstallment: Yup.string().required("Required!"),
  //  secondInstallmentDate: Yup.string().required("Required!"),
  //  thirdInstallment: Yup.string().required("Required!"),
  //  thirdInstallmentDate: Yup.string().required("Required!"),
  //  totalFees: Yup.string().required("Required!"),
 })

  const initialValues= {
    firstName: "",
    lastName: '',
    branchName: '',
    fatherName: '',
    dob: '',
    mobileNo: '',
    email: '',
    traceName: '',
    schoolName: '',
    school12Subject: '',
    percentage12: '',
    percentage11: '',
    percentage10: '',
    aadharNumber: '',
    fatherOccupation: '',
    fatherIncome: '',
    category: '',
    village: '',
    tehsil: '',
    district: '',
    registrationFees: '',
    gender: '',
    schemeFees: '',
    courseFees: '',
    postmatricScholarship: '',
    postmatricScholarshipOwner: '',
    gkbScholarship: '',
    gkbScholarshipOwner: '',
    firstInstallment: '',
    firstInstallmentDate: '',
    secondInstallment: '',
    secondInstallmentDate: '',
    thirdInstallment: '',
    thirdInstallmentDate: '',
    totalFees: ''


  }

  // if(google.status === 'LOADED') {
  //   inputGoogle = <div>
  //     <label htmlFor={`${group}.google`}>Auto Complete:</label>
  //     <input ref={(el) => this.loadAutocomplete(el)} type="text" />
  //   </div>;
  // } else {
  //   inputGoogle = '';
  // }
  const formik = useFormik({

    initialValues,
    validationSchema,
    onSubmit:(values)=>{
      console.log(formik.values)
      AddNewStudent(values)
    }

  })





  return (
    <>
      <div className="bg-light" style={{height: '100vh',width: '100vw'}}>
        <form onSubmit={formik.handleSubmit}>
          <div className="row  m-3 p-2">
            <div className="col px-4 ">
              <div className="row">
                <div className="col">
                  <label htmlFor="">First Name</label>
                  <input name="firstName" value={formik.values.firstName} onChange={formik.handleChange} type="text" className="form-control" placeholder="First name" />  {formik.errors.firstName && formik.touched.firstName ? (
                  <div className="text-danger fs-6">{formik.errors.firstName}</div>
                ) : ''}
                </div>
              
                <div className="col">
                  <label htmlFor="">Last Name</label>
                  <input   name="lastName" value={formik.values.lastName} onChange={formik.handleChange} type="text" className="form-control" placeholder="Last name" />{formik.errors.lastName && formik.touched.lastName ? (
                  <div className="text-danger fs-6">{formik.errors.lastName}</div>
                ) : ''}
                </div>
                
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">Branch Name</label>
                  <input   name="branchName" value={formik.values.branchName} onChange={formik.handleChange} type="text" className="form-control" placeholder=" Branch Name" />{formik.errors.branchName && formik.touched.branchName ? (
                  <div className="text-danger fs-6">{formik.errors.branchName}</div>
                ) : ''}
                </div>
                
                <div className="col">
                  <label htmlFor="">Father Name</label>
                  <input   name="fatherName" value={formik.values.fatherName} onChange={formik.handleChange} type="text" className="form-control" placeholder="Father name" /> {formik.errors.fatherName && formik.touched.fatherName ? (
                  <div className="text-danger fs-6">{formik.errors.fatherName}</div>
                ) : ''}
                </div>
               
              </div>
              <div className="row ">
                <div className="col">
                  <label htmlFor="">DOB</label>
                  <input   name="dob" value={formik.values.dob} onChange={formik.handleChange} type="date" className="form-control" placeholder="DOB" />
                  {formik.errors.dob && formik.touched.dob ? (
                    <div className="text-danger fs-6">{formik.errors.dob}</div>
                  ) : ''}
                </div>
                <div className="col">
                  <label htmlFor="">Mobile No.</label>
                  <input   name="mobileNo" value={formik.values.mobileNo} onChange={formik.handleChange} type="text" className="form-control" placeholder="Mobile No." />
                  {formik.errors.mobileNo && formik.touched.mobileNo ? (
                    <div className="text-danger fs-6">{formik.errors.mobileNo}</div>
                  ) : ''}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">Email Address</label>
                  <input   name="email" value={formik.values.email} onChange={formik.handleChange} type="text" className="form-control" placeholder="Email" />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-danger fs-6">{formik.errors.email}</div>
                  ) : ''}</div>
                <div className="col">
                  <label htmlFor="">Trace Name</label>
                  <input   name="traceName" value={formik.values.traceName} onChange={formik.handleChange} type="text" className="form-control" placeholder="Trace name" />
                  {formik.errors.traceName && formik.touched.traceName ? (
                    <div className="text-danger fs-6">{formik.errors.traceName}</div>
                  ) : ''}</div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">School Name</label>
                  <input   name="schoolName" value={formik.values.schoolName} onChange={formik.handleChange} type="text" className="form-control" placeholder="School name" />
                  {formik.errors.schoolName && formik.touched.schoolName ? (
                    <div className="text-danger fs-6">{formik.errors.schoolName}</div>
                  ) : ''}</div>
                <div className="col">
                  <label htmlFor="">School 12<sup>th</sup> Subject </label>
                  <input   name="school12Subject" value={formik.values.school12Subject} onChange={formik.handleChange} type="text" className="form-control" placeholder="School Subject" />
                  {formik.errors.school12Subject && formik.touched.school12Subject ? (
                    <div className="text-danger fs-6">{formik.errors.school12Subject}</div>
                  ) : ''}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">12<sup>th</sup> percentage</label>
                  <input   name="percentage12" value={formik.values.percentage12} onChange={formik.handleChange} type="text" className="form-control" placeholder="12 percentage" />
                  {formik.errors.percentage12 && formik.touched.percentage12 ? (
                    <div className="text-danger fs-6">{formik.errors.percentage12}</div>
                  ) : ''}
                </div>
                <div className="col">
                  <label htmlFor="">11<sup>th</sup> percentage</label>
                  <input   name="percentage11" value={formik.values.percentage11} onChange={formik.handleChange} type="text" className="form-control" placeholder="11 percentage" />
                  {formik.errors.percentage11 && formik.touched.percentage11 ? (
                    <div className="text-danger fs-6">{formik.errors.percentage11}</div>
                  ) : ''}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">10<sup>th</sup> percentage</label>
                  <input   name="percentage10" value={formik.values.percentage10} onChange={formik.handleChange} type="text" className="form-control" placeholder="10 percentage" />
                </div>
                <div className="col">
                  <label htmlFor="">Aadhar Number </label>
                  <input   name="aadharNumber" value={formik.values.aadharNumber} onChange={formik.handleChange} type="text" className="form-control" placeholder="Aadhar Number" />
                  {formik.errors.aadharNumber && formik.touched.aadharNumber ? (
                    <div className="text-danger fs-6">{formik.errors.aadharNumber}</div>
                  ) : ''}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">Father Occupation</label>
                  <input   name="fatherOccupation" value={formik.values.fatherOccupation} onChange={formik.handleChange} type="text" className="form-control" placeholder="Father Occupation" />
                  {formik.errors.fatherOccupation && formik.touched.fatherOccupation ? (
                    <div className="text-danger fs-6">{formik.errors.fatherOccupation}</div>
                  ) : ''}
                </div>
                <div className="col">
                  <label htmlFor="">Father Income</label>
                  <input   name="fatherIncome" value={formik.values.fatherIncome} onChange={formik.handleChange} type="text" className="form-control" placeholder="Father Income" />
                  {formik.errors.fatherIncome && formik.touched.fatherIncome ? (
                    <div className="text-danger fs-6">{formik.errors.fatherIncome}</div>
                  ) : ''}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">Category</label>
                  <select  name="category" value={formik.values.category} onChange={formik.handleChange}  name="category" className="form-select" id="inputGroupSelect02">
                    <option selected values="">Category</option>
                    <option value="Gen">Gen</option>
                    <option value="OBC">OBC</option>
                    <option value="St">St</option>
                    <option value="Sc">Sc</option>
                  </select>
                  {formik.errors.category && formik.touched.category ? (
                    <div className="text-danger fs-6">{formik.errors.category}</div>
                  ) : ''}
                  {/* {formik.errors.role && <div className="error">{formik.errors.role}</div>} */}
                </div>
                <div className="col">
                  <label htmlFor="">Village </label>
                  <input   name="village" value={formik.values.village} onChange={formik.handleChange} type="text" className="form-control" placeholder="Village" />
                  {formik.errors.village && formik.touched.village ? (
                    <div className="text-danger fs-6">{formik.errors.village}</div>
                  ) : ''}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">Tehsil</label>
                  <input   name="tehsil" value={formik.values.tehsil} onChange={formik.handleChange} type="text" className="form-control" placeholder="Tehsil" />
                  {formik.errors.tehsil && formik.touched.tehsil ? (
                    <div className="text-danger fs-6">{formik.errors.tehsil}</div>
                  ) : ''}
                </div>
                <div className="col">
                  <label htmlFor="">District</label>
                  <input   name="district" value={formik.values.district} onChange={formik.handleChange} type="text" className="form-control" placeholder=" District" />
                  {formik.errors.district && formik.touched.district ? (
                    <div className="text-danger fs-6">{formik.errors.district}</div>
                  ) : ''}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">Registration Fees</label>
                  <input   name="registrationFees" value={formik.values.registrationFees} onChange={formik.handleChange} type="text" className="form-control" placeholder="Registration Fees" />
                  {formik.errors.registrationFees && formik.touched.registrationFees ? (
                    <div className="text-danger fs-6">{formik.errors.registrationFees}</div>
                  ) : ''}
                </div>
                <div className="col">
                  <label htmlFor="">Gender </label>
                  <select  name="gender" value={formik.values.gender} onChange={formik.handleChange}  name="gender" className="form-select" id="inputGroupSelect02">
                    <option selected values="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.errors.gender && formik.touched.gender ? (
                    <div className="text-danger fs-6">{formik.errors.gender}</div>
                  ) : ''}
                  {/* {formik.errors.role && <div className="error">{formik.errors.role}</div>} */}
                </div>
              </div>
            </div>
            <div className="col px-4">
              <div className="row">
                <div className="col">
                  <label htmlFor="">Scheme Fees</label>
                  <select  name="schemeFees" value={formik.values.schemeFees} onChange={formik.handleChange}  className="form-select" id="inputGroupSelect02">
                    <option selected values="">Scheme Fees</option>
                    <option value="SVS">SVS</option>
                    <option value="REVA">REWA</option>
                    <option value="Full Fess">Full Fees</option>
                  </select>
                  {formik.errors.schemeFees && formik.touched.schemeFees ? (
                    <div className="text-danger fs-6">{formik.errors.schemeFees}</div>
                  ) : ''}
                  {/* {formik.errors.role && <div className="error">{formik.errors.role}</div>} */}
                </div>
                <div className="col">
                  <label htmlFor="">Course Fees</label>
                  <select  name="courseFees" value={formik.values.courseFees} onChange={formik.handleChange}   className="form-select" id="inputGroupSelect02">
                    <option values="">Course Fees</option>
                    <option value="BBA">BBA</option>
                    <option value="BCA">BCA</option>
                    <option value="BSCseed">BSC Seed</option>
                  </select>
                  {/* {formik.errors.courseFees && formik.touched.courseFees ? (
                    <div className="text-danger fs-6">{formik.errors.courseFees}</div>
                  ) : ''} */}
                  {/* {formik.errors.role && <div className="error">{formik.errors.role}</div>} */}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">Postmatric scholarship</label>
                  <select name="postmatricScholarship" value={formik.values.postmatricScholarship} onChange={formik.handleChange} className="form-select" id="inputGroupSelect02" disabled={formik.values.category === 'Gen' ? true : false}>
                    <option values="">Postmatric scholarship</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {/* {formik.errors.percentage12 && formik.touched.percentage12 ? (
                    <div className="text-danger fs-6">{formik.errors.percentage12}</div>
                  ) : ''} */}
                  {/* {formik.errors.role && <div className="error">{formik.errors.role}</div>} */}
                </div>
                <div className="col">
                  <label htmlFor="">GKB Scholarship</label>
                  <select name="gkbScholarship" value={formik.values.gkbScholarship} onChange={formik.handleChange} className="form-select" id="inputGroupSelect02" disabled={formik.values.gender === 'female' ? false : true} >
                    <option values="">GKB scholarship</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

              </div>
              <div className="row">

                <div className="col">
                  <label htmlFor="">Postmatric scholarship Owner</label>
                  <select name="postmatricScholarshipOwner" value={formik.values.postmatricScholarshipOwner} onChange={formik.handleChange} className="form-select" id="inputGroupSelect02" disabled={formik.values.category === 'Gen' ?true: false}>
                    <option values="">Postmatric scholarship Owner</option>
                    <option value="self">Self</option>
                    <option value="college">College</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="">GKB Owner </label>
                  <select  name="gkbScholarshipOwner" value={formik.values.gkbScholarshipOwner} onChange={formik.handleChange} className="form-select" id="inputGroupSelect02" disabled={formik.values.gender === 'female' ? false:true } >
                    <option values="">Scholarship Owner</option>
                    <option value="self">Self</option>
                    <option value="college">College</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">First Installment</label>
                  <input   name="firstInstallment" value={formik.values.firstInstallment} onChange={formik.handleChange} type="text" className="form-control" placeholder="First Installment" disabled={formik.values.schemeFees==='SVS' ?true:false} />
                </div>
                <div className="col">
                  <label htmlFor="">Date</label>
                  <input name="firstInstallmentDate" value={formik.values.firstInstallmentDate} onChange={formik.handleChange} type="date" className="form-control" placeholder="Date" disabled={formik.values.schemeFees === 'SVS' ? true : false} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="">Second Installment</label>
                  <input name="secondInstallment" value={formik.values.secondInstallment} onChange={formik.handleChange} type="text" className="form-control" placeholder="Second Installment" disabled={formik.values.schemeFees === 'SVS' ? true : false} />
                </div>
                <div className="col">
                  <label htmlFor="">Date</label>
                  <input name="secondInstallmentDate" value={formik.values.secondInstallmentDate} onChange={formik.handleChange} type="date" className="form-control" placeholder="Date" disabled={formik.values.schemeFees === 'SVS' ? true : false}  />
                </div>
              </div><div className="row">
                <div className="col">
                  <label htmlFor="">Third Installment</label>
                  <input name="thirdInstallment" value={formik.values.thirdInstallment} onChange={formik.handleChange} type="text" className="form-control" placeholder="Third Installment" disabled={formik.values.schemeFees === 'SVS' ? true : false} />
                </div>
                <div className="col">
                  <label htmlFor="">Date</label>
                  <input name="thirdInstallmentDate" value={formik.values.thirdInstallmentDate} onChange={formik.handleChange} type="date" className="form-control" placeholder="Date" disabled={formik.values.schemeFees === 'SVS' ? true : false}  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="">Totalfees</label>
                  <input name="totalFees" value={formik.values.totalFees} onChange={formik.handleChange} type="text" className="form-control" placeholder="Total Fees"  />
                </div>

              </div>
              <div className="row m-3">
                <button type="submit" className="btn btn-warning text-light fw-bolder btn-sm">Submit</button>

              </div>
            </div>
          </div>



        </form>
      </div>
    </>
  )
}

// export default AddStudent

//Getting the state from the store
const mapStateToProps = state => {
  return {
    userData: state.auth
  }
}

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = dispatch => {
  return {
    AddNewStudent: (data) => AddNewStudent(AddNewStudent(data))
  }
}


//Connecting the component to our store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudent)