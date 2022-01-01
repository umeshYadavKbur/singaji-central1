import * as React from 'react';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./styles/AddNewStudent.css"
import Select from 'react-select'
import * as Yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import AddNewStudent from '../../redux/actionDispatcher/superAdmin/addNewStudentDispatcher'
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
// import {number} from 'yup';

function AddNewStudentPage({ AddNewStudent }) {

    const [branchNames, setBranchNames] = useState([{ subjects: 'loading...', id: 0 }])
    const [trackNames, setTrackNames] = useState([{ trackName: 'loading...', trackId: 0 }])
    const [villageNames, setVillageNames] = useState([{ label: 'loading...', villageId: 0 }])


    useEffect(() => {
        const fn = async () => {


            ///////////////////////////////
            const branchName = await axios('https://singaji-central-server.herokuapp.com/api/list_branch')
            console.log(branchName.data);
            console.log("branch Name ", branchName.data);
            setBranchNames(branchName.data)

            /////////////////////////
            const villageNamesRes = await axios('https://singaji-central-server.herokuapp.com/api/village_name')
            let newVillageName = [];
            villageNamesRes.data.forEach((ele) => { newVillageName.push({ 'label': ele.villagename, 'value': ele.villagename }) })
            console.log(newVillageName);
            setVillageNames(newVillageName);

            /////////////////////////////
            const trackNamesRes = await axios('https://singaji-central-server.herokuapp.com/api/track_list')
            console.log(trackNamesRes.data);
            setTrackNames(trackNamesRes.data);
        }
        fn();
    }, []);






    const initialValues = {
        firstName: "", lastName: "", dob: "", contactNumber: "", fatherName: "", fatherOccupation: "", fatherIncome: '', FatherContactNumber: "", address: "", village: "", pincode: "", tehsil: "", district: "", email: "", aadharNumber: "", category: "", gender: "male",
        percent10: '', rollNumber10: '', joinBatch: '', percent12: '', rollNumber12: '', year: '', streamName: '', subject12: '', schoolName: '',
        GKBAmount: 0, postmatricAmount: 0, thirdInstallmentDate: '', thirdInstallment: '', secondInstallmentDate: '', secondInstallment: '', feesScheme: '', firstInstallmentDate: '', firstInstallment: '', courseFees: '', regisrationFees: '1500',
        postmatricScolarship: 'no', gkbScolarship: 'no', gkbOwner: 'self', postmatricOwner: 'self', payableAmmount: '', remark: '',
        ScholarshipAmount: 0,
        trackName: "", busFees: "",
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates').required("Required!"),
        lastName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates').required("Required!"),
        dob: Yup.string().required("Required!"),
        contactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        fatherName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates').required("Required!"),
        fatherOccupation: Yup.string().required("Required!"),
        fatherIncome: Yup.string().required("Required!").min(4, 'Must be exactly 4 digits'),
        FatherContactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        address: Yup.string().trim().min(10, 'minimum 10 characters required').required("Required!"),
        village: Yup.string().required("Required!").trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        pincode: Yup.string().trim().required("Required!").test('len', 'Must be exactly 6 digits', val => val?.replace('X', '').length === 6),
        tehsil: Yup.string().trim().min(3, 'minimum 3 characters required').required("Required!").matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        district: Yup.string().trim().min(3, 'minimum 3 characters required').required("Required!").matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        email: Yup.string().email("Invalid Email Format ").required("Required!"),
        aadharNumber: Yup.string().trim().required("Required!").test('len', 'Must be exactly 12 digits', val => val?.replace('X', '').length === 14),
        category: Yup.string().required("Required!"),

        percent10: Yup.string().required("Required!"),
        rollNumber10: Yup.string().required("Required!"),
        joinBatch: Yup.string().trim().required("Required!").test('len', 'Must be exactly 4 digits', val => val?.replace('X', '').length === 4),
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
        remark: Yup.string().required("Required!"),
        payableAmmount: Yup.string().required("Required!"),
        // postmatricAmount: Yup.string().required("Required!"),
        // GKBAmount: Yup.string().required("Required!"),

        trackName: Yup.string().required("Required!"),
        busFees: Yup.string().required("Required!"),

    })
    // let len=formik.values.aadharNumber;
    // if(len.length <12)
    // {
    //     formik.errors.aadharNumber ="Invalid Aadhar Number"
    // }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {

            const bodyData = {
                "firstName": formik.values.firstName,
                "lastName": formik.values.lastName,
                "branch": formik.values.streamName,
                "year": formik.values.year,
                "joinBatch": formik.values.joinBatch,
                "feesScheme": formik.values.feesScheme,
                "ScholarshipAmount": parseInt(formik.values.GKBAmount) + parseInt(formik.values.postmatricAmount),
                "Totalfee": formik.values.payableAmmount,
                "Busfee": formik.values.busFees,
                "Tutionfee": formik.values.courseFees,
                "fathersName": formik.values.fatherName,
                "dob": formik.values.dob,
                "mobile": formik.values.contactNumber,
                "fatherContactNumber": formik.values.FatherContactNumber,
                "email": formik.values.email,
                "schoolName": formik.values.schoolName,
                "school12sub": formik.values.subject12,
                "rollNumber12": formik.values.rollNumber12,
                "persentage12": formik.values.percent12,
                "persentage10": formik.values.percent10,
                "rollNumber10": formik.values.rollNumber10,
                "aadarNo": formik.values.aadharNumber.split(' ').join(''),
                "fatherOccupation": formik.values.fatherOccupation,
                "fatherIncome": formik.values.fatherIncome,
                "category": formik.values.category,
                "gender": formik.values.gender,
                "pincode": formik.values.pincode,
                "trackName": formik.values.trackName,
                "address": formik.values.address,
                "village": formik.values.village,
                "tehsil": formik.values.tehsil,
                "district": formik.values.district,
                "reg_Fees": formik.values.regisrationFees,
                "Firstinstallment": formik.values.firstInstallment,
                "FirstinstallmentDate": formik.values.firstInstallmentDate,
                "Secondinstallment": formik.values.secondInstallment,
                "SecondinstallmentDate": formik.values.secondInstallmentDate,
                "Thirdinstallment": formik.values.thirdInstallment,
                "ThirdinstallmentDate": formik.values.thirdInstallmentDate,
                "GaonKiBeti": formik.values.gkbOwner,
                "GKB_Amount": formik.values.GKBAmount,
                "Is_GKB": formik.values.gkbScolarship,
                "Postmetric": formik.values.postmatricOwner,
                "Postmetric_Amount": formik.values.postmatricAmount,
                "is_Postmetric": formik.values.postmatricScolarship,
                "remark": formik.values.remark
            }
            AddNewStudent(bodyData)
            // console.log(bodyData);
        }
    });
    // const [getCourseFee, setGetCourseFee] = useState(true)

    const getCourseFees = async () => {

        if (formik.values.joinBatch !== '' && formik.values.joinBatch.replace('X', '').length === 4 && formik.values.streamName !== '') {
            console.log("api calling");

            var data = '';

            var config = {
                method: 'get',
                url: `https://singaji-central-server.herokuapp.com/api/show_fees/${formik.values.streamName + formik.values.joinBatch}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                data: data
            };
            try {


                const StudentCourseFees = await axios(config)
                if (StudentCourseFees.status === 200) {
                    formik.setFieldValue('courseFees', StudentCourseFees.data[0].total_fees);

                } else {
                    formik.setFieldValue('courseFees', '');

                }

                console.log(StudentCourseFees);
            } catch (error) {
                console.log(error);
                formik.setFieldValue('courseFees', '');

            }

        }
    }

    const [expanded, setExpanded] = React.useState({
        panel1: true,
        panel2: true,
        panel3: true,
        panel4: true
    });

    const handleChange = (id) => () => {
        console.log(expanded)
        setExpanded((pre) => {
            return {
                ...pre,
                [id]: !expanded[id]
            }

        });
    };

    return (
        <>

            <div className='addnewstudent mx-auto px-3'>
                <form onSubmit={formik.handleSubmit}>
                    {/* Personal Details */}
                    <Accordion className="my-2" expanded={expanded.panel1 === true} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ backgroundColor: 'rgb(199 204 209 / 31%)', borderBottom: '2px solid orange' }}
                        >
                            <Typography style={{ color: "#414c97" }}><b> Personal Details</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                            <Typography component={'div'} className='add_student_dropdown_menu' >
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
                                            name="FatherContactNumber" placeholder="Father Contact"
                                            className="form-control"
                                            format="##########" />
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
                                        <label htmlFor="">Pincode</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.pincode}
                                            name="pincode"
                                            type="text"
                                            className="form-control"
                                            format="######"
                                            mask={'X'}
                                            placeholder="EX:- 455336"
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
                                        <label htmlFor="">Village</label>
                                        {/* <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.village}
                                            name="village"
                                            type="text"
                                            className="form-control"
                                            placeholder="Village"
                                        /> */}
                                        <Select
                                            options={villageNames}
                                            onChange={({ value }) => { formik.setFieldValue('village', value) }}
                                            onBlur={formik.handleBlur}
                                            // value={formik.values.village}
                                            name="village"
                                            // className="form-control"
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
                                            name="aadharNumber"
                                            // placeholder="Aadhar Number" 
                                            className="form-control"
                                            format="#### #### ####"
                                            mask={'X'}
                                            placeholder="EX:- 436175370721"
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
                                            onBlur={formik.handleBlur}
                                            value={formik.values.category}
                                            className="form-select"
                                            id="inputGroupSelect02"
                                        >
                                            <option value="">
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
                                                    onBlur={formik.handleBlur} name="gender" value="male" defaultChecked />
                                                {' '} Male
                                            </label>{' '}
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
                    <Accordion className="my-2" expanded={expanded.panel2 === true} onChange={handleChange('panel2')} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            style={{ backgroundColor: 'rgb(199 204 209 / 31%)', borderBottom: '2px solid orange' }}
                        >
                            <Typography style={{ color: "#414c97" }}><b>Acadmic Details </b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                            <Typography component={'div'}>

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
                                        {formik.errors.schoolName && formik.touched.schoolName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.schoolName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">12<sup>th</sup> Roll Number</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.rollNumber12}
                                            name="rollNumber12"
                                            type="text"
                                            className="form-control"
                                            placeholder="Roll Number"
                                        /> {formik.errors.rollNumber12 && formik.touched.rollNumber12 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.rollNumber12}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">12<sup>th</sup> Percentage</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.percent12}
                                            name="percent12"
                                            type="text"
                                            format="##%"
                                            mask={['X', 'X', '%']}
                                            placeholder="XX%"

                                            className="form-control"
                                        /> {formik.errors.percent12 && formik.touched.percent12 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.percent12}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">12<sup>th</sup> Subject</label>
                                        <select onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} name="subject12" value={formik.values.subject12} className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value="">Select Subject</option>
                                            <option value="Maths">Maths</option>
                                            <option value="BIO">BIO</option>
                                            <option value="Art">Art</option>
                                            <option value="Commerce">Commerce</option>
                                        </select>
                                        {formik.errors.subject12 && formik.touched.subject12 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.subject12}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                </div>
                                <div className='row m-1'>

                                    <div className="col-3">
                                        <label htmlFor="">Year</label>
                                        <select name="year" value={formik.values.year} onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value=''>Select Year</option>
                                            <option value='I'>I Year</option>
                                            <option value='II'>II Year</option>
                                            <option value='III'>III Year</option>
                                        </select>
                                        {formik.errors.year && formik.touched.year ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.year}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="">Stream Name</label>

                                        <select name="streamName" value={formik.values.streamName} onBlur={formik.handleBlur}
                                            onBlurCapture={getCourseFees}
                                            onChange={formik.handleChange} className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value=''>Select branch</option>
                                            {branchNames.map((ele, i) => {
                                                return (
                                                    <option key={i} value={ele.subjects}>{ele.subjects}</option>
                                                )
                                            })}

                                        </select>
                                        {formik.errors.streamName && formik.touched.streamName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.streamName}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="">Join Batch</label>
                                        <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            onBlurCapture={getCourseFees}
                                            value={formik.values.joinBatch}
                                            name="joinBatch"
                                            // type="text"
                                            className="form-control"
                                            format="####"
                                            mask={'X'}
                                            placeholder="EX:-2022"
                                        />
                                        {formik.errors.joinBatch && formik.touched.joinBatch ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.joinBatch}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                </div>
                                <div className='row m-1'>
                                    <div className="col-3">
                                        <label htmlFor="">10<sup>th</sup> Roll Number</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.rollNumber10}
                                            name="rollNumber10"
                                            type="text"
                                            className="form-control"
                                            placeholder="Roll Number"
                                        />
                                        {formik.errors.rollNumber10 && formik.touched.rollNumber10 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.rollNumber10}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="">10<sup>th</sup> Percentage</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.percent10}
                                            name="percent10"
                                            type="text"
                                            className="form-control"
                                            format="##%"
                                            mask={['X', 'X', '%']}
                                            placeholder="XX%"

                                        />
                                        {formik.errors.percent10 && formik.touched.percent10 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.percent10}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>


                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* Acadmic Details */}

                    {/* Fees Details */}
                    <Accordion className="my-2" expanded={expanded.panel3 === true} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            style={{ backgroundColor: 'rgb(199 204 209 / 31%)', borderBottom: '2px solid orange' }}
                        >
                            <Typography style={{ color: "#414c97" }}><b>Fees Details </b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                            <Typography component={'div'}>
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
                                        {formik.errors.regisrationFees && formik.touched.regisrationFees ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.regisrationFees}
                                            </div>
                                        ) : (
                                            ""
                                        )}
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
                                        {formik.errors.courseFees && formik.touched.courseFees ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.courseFees}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">First Installment</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstInstallment}
                                            name="firstInstallment"
                                            type="number"
                                            className="form-control"
                                            placeholder="First Installment"
                                        />
                                        {formik.errors.firstInstallment && formik.touched.firstInstallment ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.firstInstallment}
                                            </div>
                                        ) : (
                                            ""
                                        )}
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
                                        {formik.errors.firstInstallmentDate && formik.touched.firstInstallmentDate ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.firstInstallmentDate}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className='row m-1'>
                                    <div className="col">
                                        <label htmlFor="">Scheme Fees</label>
                                        <select name="feesScheme" value={formik.values.feesScheme} onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value=''>Scheme Fees</option>
                                            <option value='SVS'>SVS</option>
                                            <option value='SNS'>SNS</option>
                                            <option value='fullFees'>Full Fees</option>
                                            <option value='oneShot'>One Shot</option>
                                            <option value='Rewa'>Rewa</option>
                                            <option value='OnlyScholarShip'>OnlyScholarShip</option>
                                        </select>
                                        {formik.errors.feesScheme && formik.touched.feesScheme ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.feesScheme}
                                            </div>
                                        ) : (
                                            ""
                                        )}
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
                                            type="number"
                                            className="form-control"
                                            placeholder="Second Installment"
                                        />
                                        {formik.errors.secondInstallment && formik.touched.secondInstallment ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.secondInstallment}
                                            </div>
                                        ) : (
                                            ""
                                        )}
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
                                        {formik.errors.secondInstallmentDate && formik.touched.secondInstallmentDate ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.secondInstallmentDate}
                                            </div>
                                        ) : (
                                            ""
                                        )}
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
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                        {formik.errors.postmatricScolarship && formik.touched.postmatricScolarship ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.postmatricScolarship}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                    </div>
                                    <div className="col">
                                        <label htmlFor="">GKB ScolarShip</label>
                                        <select name="gkbScolarship" className="form-select" id="inputGroupSelect02"
                                            value={formik.values.gender === "male" ? formik.values.gkbScolarship = "no" : formik.values.gkbScolarship}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={formik.values.gender === 'male' ? true : false}>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                        {formik.errors.gkbScolarship && formik.touched.gkbScolarship ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.gkbScolarship}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Third Installment</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.thirdInstallment}
                                            name="thirdInstallment"
                                            type="number"
                                            className="form-control"
                                            placeholder="Third Installment"
                                        />
                                        {formik.errors.thirdInstallment && formik.touched.thirdInstallment ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.thirdInstallment}
                                            </div>
                                        ) : (
                                            ""
                                        )}
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
                                        {formik.errors.thirdInstallmentDate && formik.touched.thirdInstallmentDate ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.thirdInstallmentDate}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <div className="row m-1">
                                    <div className="col-9">
                                        <div className='row'>
                                            <div className="col">
                                                <label htmlFor="">Postmatric Owner</label>
                                                <select name="postmatricOwner" className="form-select" id="inputGroupSelect02"
                                                    value={formik.values.postmatricScolarship === "no" ? formik.values.postmatricOwner = "self" : formik.values.postmatricOwner}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    disabled={formik.values.category === 'Gen' ? true : false || formik.values.postmatricScolarship === "no" ? true : false}>
                                                    <option defaultValue="self">Postmatric Owner</option>
                                                    <option value="self">Self</option>
                                                    <option value="ssism">SSISM</option>
                                                </select>
                                                {formik.errors.postmatricOwner && formik.touched.postmatricOwner ? (
                                                    <div className="text-danger fs-6">
                                                        {formik.errors.postmatricOwner}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">GKB Owner</label>
                                                <select name="gkbOwner" className="form-select" id="inputGroupSelect02"
                                                    value={formik.values.gkbScolarship === "no" ? formik.values.gkbOwner = "self" : formik.values.gkbOwner}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    disabled={formik.values.gender === 'male' ? true : false || formik.values.gkbScolarship === "no" ? true : false}>
                                                    <option defaultValue="">GKB Owner</option>
                                                    <option value="SSISM">SSISM</option>
                                                    <option value="self">Self</option>
                                                </select>
                                                {formik.errors.gkbOwner && formik.touched.gkbOwner ? (
                                                    <div className="text-danger fs-6">
                                                        {formik.errors.gkbOwner}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Payable Ammount</label>  <input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.payableAmmount}
                                                    name="payableAmmount"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Payable Ammount"
                                                />
                                                {formik.errors.payableAmmount && formik.touched.payableAmmount ? (
                                                    <div className="text-danger fs-6">
                                                        {formik.errors.payableAmmount}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                        </div>
                                        <div className='row '>
                                            <div className="col">
                                                <label htmlFor="">Postmatric Amount</label>  <input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.category === "Gen" ? formik.values.postmatricAmount = 0 : formik.values.postmatricOwner === "self" ? formik.values.postmatricAmount = 0 : formik.values.postmatricAmount}
                                                    name="postmatricAmount"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Postmatric Amount"
                                                    disabled={formik.values.category === 'Gen' ? true : false || formik.values.postmatricOwner === "self" ? true : false}
                                                />
                                                {formik.errors.postmatricAmount && formik.touched.postmatricAmount ? (
                                                    <div className="text-danger fs-6">
                                                        {formik.errors.postmatricAmount}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">GKB Amount</label> <input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.gender === 'male' ? formik.values.GKBAmount = 0 : formik.values.gkbOwner === "self" ? formik.values.GKBAmount = 0 : formik.values.GKBAmount}
                                                    name="GKBAmount"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="GKB Amount"
                                                    disabled={formik.values.gender === 'male' ? true : false || formik.values.gkbOwner === "self" ? true : false}
                                                />
                                                {formik.errors.GKBAmount && formik.touched.GKBAmount ? (
                                                    <div className="text-danger fs-6">
                                                        {formik.errors.GKBAmount}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Scholarship Amount</label> <input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={parseInt(formik.values.GKBAmount) + parseInt(formik.values.postmatricAmount)}
                                                    name="ScholarshipAmount"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Scholarship Amount"
                                                    disabled={true}
                                                />
                                                {formik.errors.ScholarshipAmount && formik.touched.ScholarshipAmount ? (
                                                    <div className="text-danger fs-6">
                                                        {formik.errors.ScholarshipAmount}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-3">

                                        <label htmlFor="">Remark</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                            placeholder="Remark" onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.remark}
                                            name="remark"
                                            rows="4"></textarea>
                                        {formik.errors.remark && formik.touched.remark ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.remark}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>



                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* Fees Details */}

                    {/* Bus Details */}
                    <Accordion className="my-2" expanded={expanded.panel4 === true} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            style={{ backgroundColor: 'rgb(199 204 209 / 31%)', borderBottom: '2px solid orange' }}
                        >
                            <Typography style={{ color: "#414c97" }}><b>Bus Details</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                            <Typography component={'div'}>
                                <div className='row m-1'>
                                    <div className="col-3">
                                        <label htmlFor="">Bus Fees</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.busFees}
                                            name="busFees"
                                            type="number"
                                            className="form-control"
                                            placeholder="Bus Fees"
                                        />
                                        {formik.errors.busFees && formik.touched.busFees ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.busFees}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <label >Track Name</label>
                                        <select name="trackName" value={formik.values.trackName} onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} className="form-select" id="inputGroupSelect02" placeholder="select">
                                            <option value='0'>Select Track</option>
                                            {trackNames.map((ele, i) => {
                                                return (
                                                    <option key={i} value={ele.trackname}>{ele.trackname}</option>
                                                )
                                            })}

                                        </select>
                                        {formik.errors.trackName && formik.touched.trackName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.trackName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
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

                            {/* <div className="text-danger fw-bold   d-flex justify-content-around">{formik.errors ? "Please Fill the form" : ''}</div> */}
                        </div>

                        <div className=' col-3 d-flex justify-content-end'>

                            <button className="btn btn-sm btn-warning text-light fw-bold  " style={{ width: "200px" }} type="submit">Submit</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddNewStudentPage);

// Busfee: 0
// Firstinstallment: 8500
// FirstinstallmentDate: "2021-08-04"
// GKB_Amount: 5000
// GaonKiBeti: "SSISM"
// Is_GKB: "yes"
// Postmetric: "ssism"
// Postmetric_Amount: 15000
// ScholarshipAmount: 20000
// Secondinstallment: 8000
// SecondinstallmentDate: "2021-12-23"
// Thirdinstallment: 0
// ThirdinstallmentDate: "2021-12-31"
// Totalfee: 31500
// Tutionfee: 31500
// aadarNo: "789456123789"
// address: "sandalpur khategoan"
// branch: "BCA"
// category: "OBC"
// district: "dewas"
// dob: "2001-01-01"
// email: "rahulv.bca2020@ssism.org"
// fatherContactNumber: "7898363017"
// fatherIncome: 120000
// fatherOccupation: "farmer"
// fathersName: "santosh"
// feesScheme: "fullFees"
// firstName: "rahul"
// gender: "female"
// is_Postmetric: "yes"
// joinBatch: "2021"
// lastName: "vishwkarma"
// mobile: "7898363017"
// persentage10: "90"
// persentage12: "60"
// pincode: "455339"
// reg_Fees: "1500"
// remark: "john deer tractor h"
// rollNumber10: "45612378"
// rollNumber12: "789456133111"
// school12sub: "Maths"
// schoolName: "vps"
// tehsil: "khategaon"
// trackName: "Sandalpur"
// village: "sandalpur"
// year: "II"