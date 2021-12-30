import * as React from 'react';
import { useEffect,useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./styles/AddNewStudent.css"
import * as Yup from "yup";
import {useFormik} from 'formik';
import axios from 'axios';
import AddNewStudent from '../../redux/actionDispatcher/superAdmin/addNewStudentDispatcher'
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

function AddNewStudentPage({AddNewStudent}) {

     const [branchNames,setBranchNames] = useState([{subjects: 'loading...',id: 0}])
     const [trackNames,setTrackNames] = useState([{trackName: 'loading...',trackId: 0}])

     useEffect( async() => {
         
             var config = {
                 method: 'get',
                 url: 'https://singaji-central-server.herokuapp.com/api/list_branch',

             };
       
     const branchName = await axios(config)
     console.log(branchName.data);  
         setBranchNames(branchName.data)
         console.log("branch Name ",branchNames);   
         
         

         var configForTrack = {
             method: 'get',
             url: 'https://singaji-central-server.herokuapp.com/api/track_list',
        
         }
         const trackNamesRes = await axios(configForTrack)
         console.log(trackNamesRes.data);  
         setTrackNames(trackNamesRes.data)
     },[]);

   

     
      

    const initialValues = {
        firstName: "",lastName: "",dob: "",contactNumber: "",fatherName: "",fatherOccupation: "",fatherIncome: "",FatherContactNumber: "",address: "",village: "",pincode: "",tehsil: "",district: "",email: "",aadharNumber: "",category: "",gender: "male",
        percent10: '',rollNumber10: '',joinBatch: '',percent12: '',rollNumber12: '',year: '',streamName: '',subject12: '',schoolName: '',
        GKBAmount: '0',postmatricAmount: '0',thirdInstallmentDate: '',thirdInstallment: '',secondInstallmentDate: '',secondInstallment: '',feesScheme: '',firstInstallmentDate: '',firstInstallment: '',courseFees: '',regisrationFees: '1500',
        postmatricScolarship: 'No',gkbScolarship: 'No',gkbOwner: 'Self',postmatricOwner: 'Self',payableAmmount: '',remark: '',
        trackName: "",busFees: "",
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Required!"),
        lastName: Yup.string().required("Required!"),
        dob: Yup.string().required("Required!"),
        contactNumber: Yup.string().min(10,"Invalid Number").max(10,"Number must be less then 10 digit").required("Required!"),
        fatherName: Yup.string().required("Required!"),
        fatherOccupation: Yup.string().required("Required!"),
        fatherIncome: Yup.string().required("Required!"),
        FatherContactNumber: Yup.string().required("Required!"),
        address: Yup.string().required("Required!"),
        village: Yup.string().required("Required!"),
        pincode: Yup.string().required("Required!"),
        tehsil: Yup.string().required("Required!"),
        district: Yup.string().required("Required!"),
        email: Yup.string().email("Invalid Email Format ").required("Required!"),
        aadharNumber: Yup.string().required("Required!"),
        category: Yup.string().required("Required!"),

        percent10: Yup.string().required("Required!"),
        rollNumber10: Yup.string().required("Required!"),
        joinBatch: Yup.string().required("Required!"),
        percent12: Yup.string().required("Required!"),
        rollNumber12: Yup.string().required("Required!"),
        year: Yup.string().required("Required!"),
        streamName: Yup.string().required("Required!"),
        subject12: Yup.string().required("Required!"),
        schoolName: Yup.string().required("Required!"),

        GKBAmount: Yup.string().required("Required!"),
        postmatricAmount: Yup.string().required("Required!"),
        thirdInstallmentDate: Yup.string().required("Required!"),
        thirdInstallment: Yup.string().required("Required!"),
        secondInstallmentDate: Yup.string().required("Required!"),
        secondInstallment: Yup.string().required("Required!"),
        feesScheme: Yup.string().required("Required!"),
        firstInstallmentDate: Yup.string().required("Required!"),
        firstInstallment: Yup.string().required("Required!"),
        courseFees: Yup.string().required("Required!"),
        regisrationFees: Yup.string().required("Required!"),

        postmatricScolarship: Yup.string().required("Required!"),
        gkbScolarship: Yup.string().required("Required!"),
        gkbOwner: Yup.string().required("Required!"),
        postmatricOwner: Yup.string().required("Required!"),

        trackName: Yup.string().required("Required!"),
        busFees: Yup.string().required("Required!"),

    })
    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: (values) => {
            console.log(formik.values);

            // AddNewStudent(values)
        }
    });
  const getCourseFees= async()=>{
      
    if(formik.values.joinBatch != '' && formik.values.streamName !=''){
        console.log("api calling");
       
      var data = '';

      var config = {
          method: 'get',
          url: 'https://singaji-central-server.herokuapp.com/api/show_fees/bca2021',
          headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHNzaXNtLm9yZyIsInJvbGUiOiJTVVBFUkFETUlOIiwidGlkIjoia2xhZHNmcm93aXVpajQ1NzR3ZTk4cjc4OXNkN2YiLCJleHAiOjE2NDA4NjM3MzEsImlhdCI6MTY0MDg2MDEzMX0.uzhTHUfZvfOVIsG-cGIYFRpq1_Hh_U05euaB5Yb55u8'
          },
          data: data
      };

        const StudentCourseFees =await axios(config)
        if(StudentCourseFees.status ===200){
            formik.values.courseFees = StudentCourseFees.data[0].total_fees;
        }
        console.log(StudentCourseFees);
    }      
    }
    return (
        <>

        <div className='addnewstudent mx-auto px-3'>
            <form onSubmit={formik.handleSubmit}>
                {/* Personal Details */}
                <Accordion className="my-2" >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                       style={{backgroundColor: 'rgb(199 204 209 / 31%)',borderBottom:'2px solid orange'}}
                    >
                        <Typography style={{color: "#414c97"}}><b> Personal Details</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                        <Typography className='add_student_dropdown_menu' >
                            {/* Personal Details */}

                            {/* first four input feild */}
                            <div className='row m-1'>
                                <div className="col">
                                    <label htmlFor="">First Name</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                        onBlur={formik.handleBlur}
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
                                        onBlur={formik.handleBlur}
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
                                    <label htmlFor="">Contact Number</label>
                                        <NumberFormat onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.contactNumber}
                                            name="contactNumber" placeholder="Contact Number" className="form-control" format="##########" />
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
                                        onBlur={formik.handleBlur}
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
                                        onBlur={formik.handleBlur}
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
                                    <label htmlFor="">Father Annual Income</label>
                                        <input onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="number"
                                            value={formik.values.fatherIncome}
                                            name="fatherIncome" placeholder="Father Annual Income" className="form-control"
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
                                    <label htmlFor="">Father Contact</label> 
                                        <NumberFormat onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.FatherContactNumber}
                                            name="FatherContactNumber" placeholder="Father Contact" className="form-control" format="##########" />
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
                                    <label htmlFor="">Address</label>
                                    <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                    <label htmlFor="">Pincode</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                    <label htmlFor="">Village</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                    <label htmlFor="">Tehsil</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                        onBlur={formik.handleBlur}
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
                                        onBlur={formik.handleBlur}
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
                                    <label htmlFor="">Aadhar Number</label> 
                                        <NumberFormat onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.aadharNumber}
                                            name="aadharNumber" placeholder="Aadhar Number" className="form-control" format="#### #### ####" />
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
                                        onBlur={formik.handleBlur}
                                        value={formik.values.category}
                                        className="form-select"
                                        id="inputGroupSelect02"
                                    >
                                        <option selected defaultValue="">
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
                                    <label >Gender</label>
                                    <div>
                                        <label>
                                            <input type="radio" onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} name="gender" value="male" defaultChecked/>
                                           {' '} Male
                                        </label>{ ' '}
                                        <label>
                                            <input type="radio" onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} name="gender" value="female" />
                                          {' '} Female
                                        </label>
                                    </div>
                                </div>
                            </div>



                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* Personal Details */}

                {/* Acadmic Details */}
                <Accordion className="my-2" >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{backgroundColor: 'rgb(199 204 209 / 31%)',borderBottom: '2px solid orange'}}
                    >
                        <Typography style={{color: "#414c97"}}><b>Acadmic Details </b></Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                        <Typography>
                            
                            <div className='row m-1'>
                                    <div className="col">
                                        <label htmlFor="">12<sup>th</sup> School Name</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.schoolName}
                                            name="schoolName"
                                            type="text"
                                            className="form-control"
                                            placeholder="School Name"
                                        />
                                    </div>
                                <div className="col">
                                    <label htmlFor="">12<sup>th</sup> Roll Number</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.rollNumber12}
                                        name="rollNumber12"
                                        type="text"
                                        className="form-control"
                                        placeholder="Roll Number"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="">12<sup>th</sup> Percentage</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.percent12}
                                        name="percent12"
                                        type="text"
                                        className="form-control"
                                        placeholder=" 12 percentage"
                                    />
                                </div>
                                    <div className="col">
                                        <label htmlFor="">12<sup>th</sup> Subject</label>
                                        <select onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} name="subject12" value={formik.values.subject12} className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value="0">Select Subject</option>
                                            <option value="Maths">Maths</option>
                                            <option value="BIO">BIO</option>
                                            <option value="Art">Art</option>
                                            <option value="Commerce">Commerce</option>
                                        </select>
                                    </div>

                            </div>
                                <div className='row m-1'>

                                    <div className="col-3">
                                        <label htmlFor="">Year</label>
                                        <select name="year" value={formik.values.year} onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value='0'>Select Year</option>
                                            <option value='I'>I Year</option>
                                            <option value='II'>II Year</option>
                                            <option value='III'>III Year</option>
                                        </select>
                                       
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="">Stream Name</label>

                                        <select name="streamName" value={formik.values.streamName} onBlur={formik.handleBlur = () => {getCourseFees()}} 
                                            onChange={formik.handleChange}className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value='0'>Select branch</option>
                                            {branchNames.map((ele) => {
                                                return (
                                                    <option value={ele.subjects}>{ele.subjects}</option>
                                                )
                                            })}

                                        </select>

                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="">Join Batch</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur =()=>{getCourseFees() }}
                                            value={formik.values.joinBatch}
                                            name="joinBatch"
                                            type="text"
                                            className="form-control"
                                            placeholder="Join Batch"
                                        />
                                    </div>

                                </div>
                            <div className='row m-1'>
                                <div className="col-3">
                                    <label htmlFor="">10<sup>th</sup> Roll Number</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.rollNumber10}
                                        name="rollNumber10"
                                        type="text"
                                        className="form-control"
                                        placeholder="Roll Number"
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">10<sup>th</sup> Percentage</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.percent10}
                                        name="percent10"
                                        type="text"
                                        className="form-control"
                                        placeholder=" 10 percentage"
                                    />
                                </div>


                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* Acadmic Details */}

                {/* Fees Details */}
                <Accordion className="my-2">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{backgroundColor: 'rgb(199 204 209 / 31%)',borderBottom: '2px solid orange'}}
                    >
                        <Typography style={{color: "#414c97"}}><b>Fees Details </b></Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                        <Typography>
                            <div className='row m-1'>
                                <div className="col">
                                    <label htmlFor="">Registration Fees</label>  <input
                                        name="regisrationFees"
                                        value={formik.values.regisrationFees}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="text"
                                        className="form-control"
                                        placeholder="Registration Fees"
                                        disabled={true}
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Course Fees</label> <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.courseFees}
                                        name="courseFees"
                                        type="text"
                                        className="form-control"
                                        placeholder="Course Fees"
                                        disabled={true}
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="">First Installment</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstInstallment}
                                        name="firstInstallment"
                                        type="text"
                                        className="form-control"
                                        placeholder="First Installment"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="">First Installment Date</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstInstallmentDate}
                                        name="firstInstallmentDate"
                                        type="date"
                                        className="form-control"
                                        placeholder="First Installment Date"
                                    />
                                </div>
                            </div>
                            <div className='row m-1'>
                                <div className="col">
                                    <label htmlFor="">Scheme Fees</label>  
                                        <select name="feesScheme" value={formik.values.feesScheme} onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value='0'>Scheme Fees</option>
                                            <option value='SVS'>SVS</option>
                                            <option value='SNS'>SNS</option>
                                            <option value='fullFees'>Full Fees</option>
                                            <option value='oneShot'>One Shot</option>
                                            <option value='Rewa'>Rewa</option>
                                            <option value='OnlyScholarShip'>OnlyScholarShip</option>
                                        </select>
                                </div>
                                <div className="col">
                                    {/* <label htmlFor="">Course Fees</label> <input
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
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
                                        onBlur={formik.handleBlur}
                                        value={formik.values.secondInstallment}
                                        name="secondInstallment"
                                        type="text"
                                        className="form-control"
                                        placeholder="Second Installment"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Second Installment Date</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.secondInstallmentDate}
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
                                        value={formik.values.postmatricScolarship}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="form-select"
                                        id="inputGroupSelect02"
                                            disabled={formik.values.category === 'Gen' ? true : false}
                                    >
                                        <option defaultValue="no">Postmatric scholarship</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>

                                </div>
                                <div className="col">
                                    <label htmlFor="">GKB ScolarShip</label>
                                    <select name="gkbScolarship" className="form-select" id="inputGroupSelect02"
                                        value={formik.values.gkbScolarship}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} 
                                        disabled={formik.values.gender === 'male'?true:false}>
                                        <option defaultValue="no">GKB ScolarShip</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Third Installment</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.thirdInstallment}
                                        name="thirdInstallment"
                                        type="text"
                                        className="form-control"
                                        placeholder="Third Installment"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Third Installment Date</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.thirdInstallmentDate}
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
                                    <select name="postmatricOwner" className="form-select" id="inputGroupSelect02"
                                        value={formik.values.postmatricOwner}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                            disabled={formik.values.category === 'Gen' ? true : false}>
                                        <option defaultValue="self">Postmatric Owner</option>
                                        <option value="self">Self</option>
                                        <option value="ssism">SSISM</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="">GKB Owner</label>
                                    <select name="gkbOwner" className="form-select" id="inputGroupSelect02"
                                        value={formik.values.gkbOwner}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                            disabled={formik.values.gender === 'male' ? true : false}>
                                        <option defaultValue="self">GKB Owner</option>
                                        <option value="SSISM">SSISM</option>
                                        <option value="self">Self</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Payable Ammount</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.payableAmmount}
                                        name="payableAmmount"
                                        type="text"
                                        className="form-control"
                                        placeholder="Payable Ammount"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Remark</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.remark}
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
                                        onBlur={formik.handleBlur}
                                            value={formik.values.category === "Gen" ? formik.values.postmatricAmount='0':formik.values.postmatricAmount}
                                        name="postmatricAmount"
                                        type="text"
                                        className="form-control"
                                        placeholder="Postmatric Amount"
                                            disabled={formik.values.category === 'Gen' ? true : false}
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">GKB Amount</label> <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gender ==='male'?formik.values.GKBAmount ='0':formik.values.GKBAmount}
                                        name="GKBAmount"
                                        type="text"
                                        className="form-control"
                                        placeholder="GKB Amount"
                                       disabled={formik.values.gender === 'male' ? true : false}
                                    />
                                </div>

                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* Fees Details */}

                {/* Bus Details */}
                <Accordion className="my-2">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{backgroundColor: 'rgb(199 204 209 / 31%)',borderBottom: '2px solid orange'}}
                    >
                        <Typography style={{color: "#414c97"}}><b>Bus Details</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                        <Typography>
                            <div className='row m-1'>
                                <div className="col-3">
                                    <label htmlFor="">Bus Fees</label>  <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.busFees}
                                        name="busFees"
                                        type="text"
                                        className="form-control"
                                        placeholder="Bus Fees"
                                    />
                                </div>
                                    <div className="col-3">
                                        <label >Track Name</label>
                                        <select name="trackName" value={formik.values.trackName} onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value='0'>Select Track</option>
                                            {trackNames.map((ele) => {
                                                return (
                                                    <option value={ele.trackname}>{ele.trackname}</option>
                                                )
                                            })}

                                        </select>
                                    </div>
                                {/* <div className="col"></div>
                 <div className="col"></div> */}

                            </div>


                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* Bus Details */}


                <div className="row my-5 ">
                    <div className='col-9'>

                    <div className="text-danger fw-bold   d-flex justify-content-around">{formik.errors ? "Please Fill the form" : ''}</div>
                    </div>

                    <div className=' col-3 d-flex justify-content-end'>

                        <button className="btn btn-sm btn-warning text-light fw-bold  " style={{width: "200px"}} type="submit">Submit</button>
                    </div>
                        
                </div>


            </form>
        </div></>
    );
}

//Getting the state from the store
const mapStateToProps = (state) => {
    return {
        userData: state.auth,
    };
};

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
    return {
        AddNewStudent: (data) => dispatch(AddNewStudent(data)),
    };
};

//Connecting the component to our store
export default connect(mapDispatchToProps,mapStateToProps)(AddNewStudentPage);
