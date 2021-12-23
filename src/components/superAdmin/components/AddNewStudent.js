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
                    <h1>hellow</h1>
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
                        <div className="col">
                            <label htmlFor="">Bus Fees</label>  <input
                                name="busFees"
                                type="text"
                                className="form-control"
                                placeholder="Bus Fees"
                            />
                        </div>
                        <div className="col">
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
