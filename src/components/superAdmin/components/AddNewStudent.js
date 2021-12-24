import React from 'react'
import "./styles/AddNewStudent.css"
import * as Yup from "yup";
import { useFormik } from 'formik';

function AddNewStudent() {

    const initialValues = {
        firstName: "",lastName: "",dob: "",contactNumber: "",fatherName: "",fatherOccupation: "",fatherIncome: "",FatherContactNumber: "",address: "",village: "",pincode: "",tehsil: "",district: "",email: "",aadharNumber: "",category: "",gender:"",
        percent10: '',rollNumber10: '',joinBranch: '',percent12: '',rollNumber12: '',year: '',streamName: '',subject12: '',schoolName:'',
        GKBAmount: '',postmatricAmount: '',thirdInstallmentDate: '',thirdInstallment: '',secondInstallmentDate: '',secondInstallment: '',feesScheme: '',firstInstallmentDate: '',firstInstallment: '',courseFees: '',regisrationFees:'',
        postmatricScolarship: '',gkbScolarship: '',gkbOwner: '',postmatricOwner:'',
        trackName: "",busFees: "",
    }

    const validationSchema = Yup.object({
        firstName:Yup.string().required("Required!"),
        lastName:Yup.string().required("Required!"),
        dob:Yup.string().required("Required!"),
        contactNumber:Yup.string().required("Required!"),
        fatherName:Yup.string().required("Required!"),
        fatherOccupation:Yup.string().required("Required!"),
        fatherIncome:Yup.string().required("Required!"),
        FatherContactNumber:Yup.string().required("Required!"),
        address:Yup.string().required("Required!"),
        village:Yup.string().required("Required!"),
        pincode:Yup.string().required("Required!"),
        tehsil:Yup.string().required("Required!"),
        district:Yup.string().required("Required!"),
        email:Yup.string().required("Required!"),
        aadharNumber:Yup.string().required("Required!"),
        category:Yup.string().required("Required!"),

        percent10:Yup.string().required("Required!"),
        rollNumber10:Yup.string().required("Required!"),
        joinBranch:Yup.string().required("Required!"),
        percent12:Yup.string().required("Required!"),
        rollNumber12:Yup.string().required("Required!"),
        year:Yup.string().required("Required!"),
        streamName:Yup.string().required("Required!"),
        subject12:Yup.string().required("Required!"),
        schoolName:Yup.string().required("Required!"),

        GKBAmount:Yup.string().required("Required!"),
        postmatricAmount:Yup.string().required("Required!"),
        thirdInstallmentDate:Yup.string().required("Required!"),
        thirdInstallment:Yup.string().required("Required!"),
        secondInstallmentDate:Yup.string().required("Required!"),
        secondInstallment:Yup.string().required("Required!"),
        feesScheme:Yup.string().required("Required!"),
        firstInstallmentDate:Yup.string().required("Required!"),
        firstInstallment:Yup.string().required("Required!"),
        courseFees:Yup.string().required("Required!"),
        regisrationFees:Yup.string().required("Required!"),

        postmatricScolarship:Yup.string().required("Required!"),
        gkbScolarship:Yup.string().required("Required!"),
        gkbOwner:Yup.string().required("Required!"),
        postmatricOwner:Yup.string().required("Required!"),

        trackName:Yup.string().required("Required!"),
        busFees:Yup.string().required("Required!"),

    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(formik.values);

            
        },
    });
    return (
        <div>
           
            <form onSubmit={formik.handleSubmit}>   
            {/* Personal Details */}
            <div className="dropdown show">
                <a style={{color: "#414c97"}}
                    className="data-toggle  Add_Student_Dropdown  d-flex justify-content-between "
                    role="button"
                    id="dropdownMenuLink1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <b> Personal Details</b>
                    <i className="fas fa-chevron-down m-2"></i>
                </a>


                <div
                    className="dropdown-menu add_student_dropdown_menu "
                    aria-labelledby="dropdownMenuLink1"
                >
                    {/* first four input feild */}
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">First Name</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="firstName"
                                type="text"
                                className="form-control"
                                placeholder="First name"
                            />
                                {formik.errors.firstName && formik.touched.firstName ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.firstName}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">Last Name</label>  <input
                             onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                name="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                />  {formik.errors.lastName && formik.touched.lastName ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.lastName}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">DOB</label>  <input
                             onChange={formik.handleChange}
                                    value={formik.values.dob}
                                name="dob"
                                type="date"
                                className="form-control"
                                placeholder="DOB"
                            />
                                {formik.errors.dob && formik.touched.dob ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.dob}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">Contact Number</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.contactNumber}
                                name="contactNumber"
                                type="number"
                                className="form-control"
                                placeholder="Contact Number"
                            />
                                {formik.errors.contactNumber && formik.touched.contactNumber ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.contactNumber}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                    </div>

                    {/* Second Four Input Field */}
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Father Name</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.fatherName}
                                name="fatherName"
                                type="text"
                                className="form-control"
                                placeholder="Father Name"
                            />
                                {formik.errors.fatherName && formik.touched.fatherName ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.fatherName}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">Father Occupation</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.fatherOccupation}
                                name="fatherOccupation"
                                type="text"
                                className="form-control"
                                placeholder="Father Occupation"
                            />
                                {formik.errors.fatherOccupation && formik.touched.fatherOccupation ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.fatherOccupation}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">Father Annual Income</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.fatherIncome}
                                name="fatherIncome"
                                type="text"
                                className="form-control"
                                placeholder="Father Annual Income"
                            />
                                {formik.errors.fatherIncome && formik.touched.fatherIncome ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.fatherIncome}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">Father Contact</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.FatherContactNumber}
                                name="FatherContactNumber"
                                type="number"
                                className="form-control"
                                placeholder="Father Contact"
                            />
                                {formik.errors.FatherContactNumber && formik.touched.FatherContactNumber ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.FatherContactNumber}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>

                    </div>
                    {/* Addres Input feild */}
                    <div className="row m-1">
                        <div className="col">
                            <label htmlFor="">Address*</label>
                            <input
                             onChange={formik.handleChange}
                             value={formik.values.address}
                                name="address"
                                type="text"
                                className="form-control"
                                placeholder="Enter your Address"
                            />
                                {formik.errors.address && formik.touched.address ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.address}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div></div>
                    {/* third Four input feild */}
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Village</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.village}
                                name="village"
                                type="text"
                                className="form-control"
                                placeholder="Village"
                            />
                                {formik.errors.village && formik.touched.village ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.village}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">Pincode</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.pincode}
                                name="pincode"
                                type="text"
                                className="form-control"
                                placeholder="Pincode"
                            />
                                {formik.errors.pincode && formik.touched.pincode ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.pincode}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">Tehsil</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.tehsil}
                                name="tehsil"
                                type="text"
                                className="form-control"
                                placeholder="Tehsil"
                            />
                                {formik.errors.tehsil && formik.touched.tehsil ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.tehsil}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">District</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.district}
                                name="district"
                                type="text"
                                className="form-control"
                                placeholder="District"
                            />
                                {formik.errors.district && formik.touched.district ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.district}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                    </div>
                    {/* Fourth four input feild */}
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Email</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.email}
                                name="email"
                                type="text"
                                className="form-control"
                                placeholder="Email"
                            />
                                {formik.errors.email && formik.touched.email ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.email}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">Aadhar Number</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.aadharNumber}
                                name="aadharNumber"
                                type="number"
                                className="form-control"
                                placeholder="Aadhar Number"
                            />
                                {formik.errors.aadharNumber && formik.touched.aadharNumber ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.aadharNumber}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label htmlFor="">Category</label>
                            <select
                                name="category"
                                onChange={formik.handleChange}
                                value={formik.values.category}
                                className="form-select"
                                id="inputGroupSelect02"
                            >
                                <option selected values="">
                                    Category
                                </option>
                                <option value="Gen">Gen</option>
                                <option value="OBC">OBC</option>
                                <option value="St">St</option>
                                <option value="Sc">Sc</option>
                            </select>
                                {formik.errors.category && formik.touched.category ? (
                                    <div className="text-danger fs-6">
                                        {formik.errors.category}
                                    </div>
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col">
                            <label className="radio-inline m-2">Gender</label> <br></br>
                            <label className="radio-inline mx-2">
                                <input
                                 onChange={formik.handleChange}
                                 value={formik.values.gender} type="radio" name="gender" defaultChecked />{"  "}
                                Male
                            </label>
                            <label className="radio-inline mx-2">
                                <input
                                 onChange={formik.handleChange}
                                 value={formik.values.gender} type="radio" name="gender" /> Female
                            </label>
                        </div>
                    </div>

                </div>

            </div>

            {/* Personal Details */}

            {/* Acadmic Details */}
            <div className="dropdown show">
                <a style={{color: "#414c97"}}
                    className="data-toggle Add_Student_Dropdown d-flex justify-content-between"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <b>Acadmic Details </b>
                    <i className="fas fa-chevron-down m-2"></i>
                </a>


                <div
                    className="dropdown-menu add_student_dropdown_menu"
                    aria-labelledby="dropdownMenuLink"
                >
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">12<sup>th</sup> School Name</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="schoolName"
                                type="text"
                                className="form-control"
                                placeholder="School Name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">12<sup>th</sup> Subject</label> <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="subject12"
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Stream Name</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="streamName"
                                type="text"
                                className="form-control"
                                placeholder="Stream Name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Year</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="year"
                                type="number"
                                className="form-control"
                                placeholder="year"
                            />
                        </div>
                    </div>
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">12<sup>th</sup> Roll Number</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="rollNumber12"
                                type="text"
                                className="form-control"
                                placeholder="Roll Number"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">12<sup>th</sup> Percent</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="percent12"
                                type="text"
                                className="form-control"
                                placeholder=" 12 percent"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Join Branch</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="joinBranch"
                                type="text"
                                className="form-control"
                                placeholder="Join Branch"
                            />
                        </div>
                        <div className="col"></div>
                     
                    </div>
                    <div className='row m-1'>
                        <div className="col-3">
                            <label htmlFor="">10<sup>th</sup> Roll Number</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="rollNumber10"
                                type="text"
                                className="form-control"
                                placeholder="Roll Number"
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">10<sup>th</sup> Percent</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="percent10"
                                type="text"
                                className="form-control"
                                placeholder=" 10 percent"
                            />
                        </div>
                       

                    </div>
                </div>

            </div>
            {/* Acadmic Details */}

            {/* Fees Details */}
            <div className="dropdown show">
                <a style={{color: "#414c97"}}
                    className="data-toggle Add_Student_Dropdown d-flex justify-content-between"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <b> Fees Details </b>
                    <i className="fas fa-chevron-down m-2"></i>
                </a>


                <div
                    className="dropdown-menu add_student_dropdown_menu"
                    aria-labelledby="dropdownMenuLink"
                >
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Registration Fees</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="registrationFees"
                                type="text"
                                className="form-control"
                                placeholder="Registration Fees"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Course Fees</label> <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="courseFees"
                                type="text"
                                className="form-control"
                                placeholder="Course Fees"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">First Installment</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="firstInstallment"
                                type="text"
                                className="form-control"
                                placeholder="First Installment"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">First Installment Date</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="firstInstallmentDate"
                                type="date"
                                className="form-control"
                                placeholder="First Installment Date"
                            />
                        </div>
                    </div>
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Fees Scheme</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="feesScheme"
                                type="text"
                                className="form-control"
                                placeholder="Fees Scheme"
                            />
                        </div>
                        <div className="col">
                            {/* <label htmlFor="">Course Fees</label> <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="courseFees"
                                type="text"
                                className="form-control"
                                placeholder="Course Fees"
                            /> */}
                        </div>
                        <div className="col">
                            <label htmlFor="">Second Installment</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="secondInstallment"
                                type="text"
                                className="form-control"
                                placeholder="Second Installment"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Second Installment Date</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="secondInstallmentDate"
                                type="date"
                                className="form-control"
                                placeholder="Second Installment Date"
                            />
                        </div>
                    </div>
                    
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="postmatricScolarship">Postmatric ScolarShip</label>
                            <select
                                name="postmatricScolarship"
                                // value={formik.values.postmatricScolarship}
                                // onChange={formik.handleChange}
                                className="form-select"
                                id="inputGroupSelect02"
                            >
                                <option values="">Postmatric scholarship</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            
                        </div>
                        <div className="col">
                            <label htmlFor="">GKB ScolarShip</label> 
                            <select name="gkbScolarship" className="form-select"  id="inputGroupSelect02">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="">Third Installment</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="thirdInstallment"
                                type="text"
                                className="form-control"
                                placeholder="Third Installment"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Third Installment Date</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="thirdInstallmentDate"
                                type="date"
                                className="form-control"
                                placeholder="Third Installment Date"
                            />
                        </div>
                    </div>

                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Postmatric Owner</label> 
                            <select name="postmatricOwner" className="form-select" id="inputGroupSelect02">
                                <option value="self">Self</option>
                                <option value="college">College</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="">GKB Owner</label>
                            <select name="gkbOwner" className="form-select" id="inputGroupSelect02">
                                <option value="self">Self</option>
                                <option value="college">College</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="">Payable Ammount</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="payableAmmount"
                                type="text"
                                className="form-control"
                                placeholder="Payable Ammount"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Remark</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="remark"
                                type="text"
                                className="form-control"
                                placeholder="Remark"
                            />
                        </div>
                    </div>

                    <div className='row m-1'>
                        <div className="col-3">
                            <label htmlFor="">Postmatric Amount</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="postmatricAmount"
                                type="text"
                                className="form-control"
                                placeholder="Postmatric Amount"
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">GKB Amount</label> <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="GKBAmount"
                                type="text"
                                className="form-control"
                                placeholder="GKB Amount"
                            />
                        </div>
                       
                    </div>
                </div>

            </div>

            {/* Fees Details */}

            {/* Bus Details */}

            <div className="dropdown show">
                <a style={{color: "#414c97"}}
                    className="data-toggle Add_Student_Dropdown d-flex justify-content-between"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <b>Bus Details </b>
                    <i className="fas fa-chevron-down m-2"></i>
                </a>


                <div
                    className="dropdown-menu add_student_dropdown_menu"
                    aria-labelledby="dropdownMenuLink"
                >
                    <div className='row m-1'>
                        <div className="col-3">
                            <label htmlFor="">Bus Fees</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="busFees"
                                type="text"
                                className="form-control"
                                placeholder="Bus Fees"
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Trace Name</label>  <input
                             onChange={formik.handleChange}
                             value={formik.values.firstName}
                                name="trackName"
                                type="text"
                                className="form-control"
                                placeholder="Trace Name"
                            />
                        </div>
                        {/* <div className="col"></div>
                        <div className="col"></div> */}

                    </div>
                </div>

            </div>
            {/* Bus Details */}

<div className="row">
            <div className="col-4">
                <button
                    type="submit"
                    className="btn btn-warning text-light fw-bolder btn-lg"
                >Submit</button>
            </div>
           </div> 
        </form>  </div>
    )
}

export default AddNewStudent
