import React from 'react'
import "./styles/AddNewStudent.css"

function AddNewStudent() {

    const initialValues = {
        firstName: "",lastName: "",dob: "",contactNumber: "",fatherName: "",fatherOccupation: "",fatherIncome: "",FatherContactNumber: "",address: "",village: "",pincode: "",tehsil: "",district: "",email: "",aadharNumber: "",category: "",

        trackName: "",busFees: "",
    }


    return (
        <div>
            {/* Personal Details */}
            <div className="dropdown show">
                <a style={{color: "#414c97"}}
                    className="data-toggle  Add_Student_Dropdown  d-flex justify-content-between "
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <b> Personal Details</b>
                    <i class="fas fa-chevron-down m-2"></i>
                </a>


                <div
                    className="dropdown-menu add_student_dropdown_menu "
                    aria-labelledby="dropdownMenuLink"
                >
                    {/* first four input feild */}
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">First Name</label>  <input
                                name="firstName"
                                type="text"
                                className="form-control"
                                placeholder="First name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">First Name</label>  <input
                                name="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">DOB</label>  <input
                                name="dob"
                                type="date"
                                className="form-control"
                                placeholder="DOB"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Contact Number</label>  <input
                                name="contactNumber"
                                type="number"
                                className="form-control"
                                placeholder="Contact Number"
                            />
                        </div>
                    </div>

                    {/* Second Four Input Field */}
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Father Name</label>  <input
                                name="fatherName"
                                type="text"
                                className="form-control"
                                placeholder="Father Name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Father Occupation</label>  <input
                                name="fatherOccupation"
                                type="text"
                                className="form-control"
                                placeholder="Father Occupation"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Father Annual Income</label>  <input
                                name="fatherIncome"
                                type="text"
                                className="form-control"
                                placeholder="Father Annual Income"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Father Contact</label>  <input
                                name="FatherContactNumber"
                                type="number"
                                className="form-control"
                                placeholder="Father Contact"
                            />
                        </div>

                    </div>
                    {/* Addres Input feild */}
                    <div className="row m-1">
                        <div className="col">
                            <label htmlFor="">Address*</label>
                            <input
                                name="address"
                                type="text"
                                className="form-control"
                                placeholder="Enter your Address"
                            />
                        </div></div>
                    {/* third Four input feild */}
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Village</label>  <input
                                name="village"
                                type="text"
                                className="form-control"
                                placeholder="Village"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Pincode</label>  <input
                                name="pincode"
                                type="text"
                                className="form-control"
                                placeholder="Pincode"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Tehsil</label>  <input
                                name="tehsil"
                                type="text"
                                className="form-control"
                                placeholder="Tehsil"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">District</label>  <input
                                name="district"
                                type="text"
                                className="form-control"
                                placeholder="District"
                            />
                        </div>
                    </div>
                    {/* Fourth four input feild */}
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Email</label>  <input
                                name="email"
                                type="text"
                                className="form-control"
                                placeholder="Email"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Aadhar Number</label>  <input
                                name="aadharNumber"
                                type="number"
                                className="form-control"
                                placeholder="Aadhar Number"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Category</label>
                            <select
                                name="category"
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
                        </div>
                        <div className="col">
                            <label className="radio-inline m-2">Gender</label> <br></br>
                            <label className="radio-inline mx-2">
                                <input type="radio" name="optradio" defaultChecked />{"  "}
                                Male
                            </label>
                            <label className="radio-inline mx-2">
                                <input type="radio" name="optradio" /> Female
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
                    <i class="fas fa-chevron-down m-2"></i>
                </a>


                <div
                    className="dropdown-menu add_student_dropdown_menu"
                    aria-labelledby="dropdownMenuLink"
                >
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">12<sup>th</sup> School Name</label>  <input
                                name="schoolName"
                                type="text"
                                className="form-control"
                                placeholder="School Name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">12<sup>th</sup> Subject</label> <input
                                name="subject12"
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Stream Name</label>  <input
                                name="streamName"
                                type="text"
                                className="form-control"
                                placeholder="Stream Name"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Year</label>  <input
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
                                name="rollNumber12"
                                type="text"
                                className="form-control"
                                placeholder="Roll Number"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">12<sup>th</sup> Percent</label>  <input
                                name="percent12"
                                type="text"
                                className="form-control"
                                placeholder=" 12 percent"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Join Branch</label>  <input
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
                                name="rollNumber10"
                                type="text"
                                className="form-control"
                                placeholder="Roll Number"
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">10<sup>th</sup> Percent</label>  <input
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
                    <i class="fas fa-chevron-down m-2"></i>
                </a>


                <div
                    className="dropdown-menu add_student_dropdown_menu"
                    aria-labelledby="dropdownMenuLink"
                >
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Registration Fees</label>  <input
                                name="registrationFees"
                                type="text"
                                className="form-control"
                                placeholder="Registration Fees"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Course Fees</label> <input
                                name="courseFees"
                                type="text"
                                className="form-control"
                                placeholder="Course Fees"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">First Installment</label>  <input
                                name="firstInstallment"
                                type="text"
                                className="form-control"
                                placeholder="First Installment"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">First Installment Date</label>  <input
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
                                name="feesScheme"
                                type="text"
                                className="form-control"
                                placeholder="Fees Scheme"
                            />
                        </div>
                        <div className="col">
                            {/* <label htmlFor="">Course Fees</label> <input
                                name="courseFees"
                                type="text"
                                className="form-control"
                                placeholder="Course Fees"
                            /> */}
                        </div>
                        <div className="col">
                            <label htmlFor="">Second Installment</label>  <input
                                name="secondInstallment"
                                type="text"
                                className="form-control"
                                placeholder="Second Installment"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Second Installment Date</label>  <input
                                name="secondInstallmentDate"
                                type="date"
                                className="form-control"
                                placeholder="Second Installment Date"
                            />
                        </div>
                    </div>
                    
                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Postmatric ScolarShip</label>  <input
                                name="registrationFees"
                                type="text"
                                className="form-control"
                                placeholder="Registration Fees"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">GKB ScolarShip</label> <input
                                name="courseFees"
                                type="text"
                                className="form-control"
                                placeholder="Course Fees"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Third Installment</label>  <input
                                name="thirdInstallment"
                                type="text"
                                className="form-control"
                                placeholder="Third Installment"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Third Installment Date</label>  <input
                                name="thirdInstallmentDate"
                                type="date"
                                className="form-control"
                                placeholder="Third Installment Date"
                            />
                        </div>
                    </div>

                    <div className='row m-1'>
                        <div className="col">
                            <label htmlFor="">Postmatric Owner</label>  <input
                                name="registrationFees"
                                type="text"
                                className="form-control"
                                placeholder="Registration Fees"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">GKB Owner</label> <input
                                name="courseFees"
                                type="text"
                                className="form-control"
                                placeholder="Course Fees"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Payable Ammount</label>  <input
                                name="payableAmmount"
                                type="text"
                                className="form-control"
                                placeholder="Payable Ammount"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Remark</label>  <input
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
                                name="postmatricAmount"
                                type="text"
                                className="form-control"
                                placeholder="Postmatric Amount"
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">GKB Amount</label> <input
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
                    <i class="fas fa-chevron-down m-2"></i>
                </a>


                <div
                    className="dropdown-menu add_student_dropdown_menu"
                    aria-labelledby="dropdownMenuLink"
                >
                    <div className='row m-1'>
                        <div className="col-3">
                            <label htmlFor="">Bus Fees</label>  <input
                                name="busFees"
                                type="text"
                                className="form-control"
                                placeholder="Bus Fees"
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Trace Name</label>  <input
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
        </div>
    )
}

export default AddNewStudent
