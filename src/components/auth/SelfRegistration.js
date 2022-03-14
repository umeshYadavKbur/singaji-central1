import * as React from 'react';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import "../../components/components/styles/AddNewStudent.css"
import Select from 'react-select'
import * as Yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import allUrls from '../../redux/constants/url'
import { ToastContainer } from 'react-toastify';
import AllUrl from '../../redux/constants/url';
import { useMediaQuery } from 'react-responsive'
import Swal from 'sweetalert2';
import Success_Icon_yellow from "../assests/image/Success_Icon_yellow.svg"
import { toast } from 'react-toastify'
import logoimage from "../assests/image/logoimage.png";
import LoaderButton from "../assests/common/LoaderButton";
import profile_image from "../assests/image/profile_img.svg"
import imageCompression from 'browser-image-compression';
import Plus_icon from '../assests/image/Plus_icon.svg'


function SelfRegistration() {


    const [branchNames, setBranchNames] = useState([{ subjects: 'loading...', id: 0 }])
    const [trackNames, setTrackNames] = useState([{ trackName: 'loading...', trackId: 0 }])
    const [villageNames, setVillageNames] = useState([{ label: 'loading...', villageId: 0 }])
    const [loaderLoading, setLoaderLoading] = useState(false)
    // const [imgData,setImageData] = useState('');


    useEffect(() => {


        const callingFun = async () => {

            ///////////////////////////////
            const branchName = await axios(allUrls.branchList)
            // console.log(branchName.data);
            // console.log("branch Name ", branchName.data);
            setBranchNames(branchName.data)

            /////////////////////////
            const villageNamesRes = await axios(allUrls.villageNameList)
            let newVillageName = [];
            villageNamesRes.data.forEach((ele) => { newVillageName.push({ 'label': ele.villageName, 'value': ele.villageName }) })
            // console.log(newVillageName);
            setVillageNames(newVillageName);

            /////////////////////////////
            const trackNamesRes = await axios(allUrls.trackList)
            // console.log(trackNamesRes.data);
            setTrackNames(trackNamesRes.data);
        }
        callingFun();

        return () => {
            localStorage.removeItem('RegistrationEdit')
        }
    }, []);




    const initialValues = {

        firstName: "",
        lastName: "",
        dob: "",
        contactNumber: "",
        fatherName: "",
        fatherOccupation: "",
        fatherIncome: "",
        FatherContactNumber: "",
        address: "",
        pincode: "",
        village: "",
        tehsil: "",
        district: "",
        email: "",
        aadharNumber: "",
        category: "",
        gender: "male",
        schoolName: "",
        subject12: "",
        streamName: "",
        joinBatch: new Date().getFullYear(),
        rollNumber12: "",
        rollNumber10: '',
        percent12: "",
        year: "",
        percent10: "",
        GKBAmount: 0,
        postmatricAmount: 0,
        courseFees: "",
        trackName: "",
        photo: "",
        photo1: "",


    }

    const validationSchema = Yup.object({
        firstName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates').required("Required!").test('len', 'Must be less then 24 character', val => val?.length < 24),
        lastName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates').required("Required!").test('len', 'Must be less then 24 character', val => val?.length < 24),
        dob: Yup.string().required("Required!").test('doc_check', 'Minimum age must be 12-14 years', val => val?.slice(0, 4) <= (new Date().getFullYear()) - 13),
        contactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        fatherName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates').required("Required!").test('len', 'Must be less then 24 character', val => val?.length < 24),
        // fatherOccupation: Yup.string().required("Required!").matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/,'must be alphabates'),
        // fatherIncome: Yup.string().required("Required!").min(4,'Must be exactly 4 digits').test('Is positive','must be positive',val => val > 0),
        FatherContactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        address: Yup.string().trim().min(10, 'minimum 10 characters required').required("Required!"),
        village: Yup.string().required("Required!").trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        pincode: Yup.string().trim().required("Required!").test('len', 'Must be exactly 6 digits', val => val?.replace('X', '').length === 6),
        tehsil: Yup.string().trim().min(3, 'minimum 3 characters required').required("Required!").matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        district: Yup.string().trim().min(3, 'minimum 3 characters required').required("Required!").matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        email: Yup.string().email("Invalid Email Format ").required("Required!"),
        aadharNumber: Yup.string().trim().required("Required!").test('len', 'Must be exactly 12 digits', val => val?.replace('X', '').length === 14),
        category: Yup.string().required("Required!"),

        percent10: Yup.string().required("Required!").test('len', 'Must be at least 33%', val => val?.replace('X', '').replace('%', '') > 32),
        rollNumber10: Yup.string().required("Required!"),
        // joinBatch: Yup.string().trim().required("Required!").test('len','Must be exactly 4 digits',val => val?.replace('X','').length === 4),
        // percent12: Yup.string().required("Required!"),
        // rollNumber12: Yup.string().required("Required!"),
        year: Yup.string().required("Required!"),
        streamName: Yup.string().required("Required!"),
        subject12: Yup.string().required("Required!"),
        schoolName: Yup.string().required("Required!"),
        // courseFees: Yup.string().required("Required!").test('Is positive','must be positive',val => val >= 0),
        // trackName: Yup.string().required("Required!"),

    })

    // const backToProfilePage = (e) => {
    //     // e.preventDefault()
    //     if(isStudentAdmin()) {
    //         console.log("Navigated ");
    //         navigate('/student_admin_dashboard/studenttable');
    //     }
    //     else if(isAccountAdmin()) {
    //         console.log("Navigated ");
    //         navigate('/account_admin_dashboard/studenttable');
    //     }
    //     else if(isSuperAdmin()) {
    //         console.log("Navigated ");
    //         navigate('/admin_dashboard/studenttable');
    //     }
    // }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoaderLoading(true)
            const bodyData = {
                "firstName": formik.values.firstName,
                "lastName": formik.values.lastName,
                "branch": formik.values.streamName,
                "year": formik.values.year,
                "joinBatch": formik.values.joinBatch,
                "tutionFee": formik.values.courseFees,
                "fathersName": formik.values.fatherName,
                "regFees": "1500",
                "dob": formik.values.dob,
                "mobile": formik.values.contactNumber,
                "fatherContactNumber": formik.values.FatherContactNumber,
                "email": formik.values.email,
                "schoolName": formik.values.schoolName,
                "school12Sub": formik.values.subject12,
                "rollNumber12": formik.values.rollNumber12,
                "persentage12": formik.values.percent12,
                "persentage10": formik.values.percent10,
                "rollNumber10": formik.values.rollNumber10,
                "aadharNo": formik.values.aadharNumber.split(' ').join(''),
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
                "photo": formik.values.photo1,
                // "feesScheme":"Fullfess"

            }
            var config = {
                method: 'post',
                url: `${AllUrl.selfRegistration}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                data: bodyData
            };
            const response = await axios(config)
            setLoaderLoading(false)

            if (response.status === 200) {
                setLoaderLoading(false)

                Swal.fire({
                    borderRadius: isDesktopOrLaptop ? '' : '40px',
                    title: 'Success',
                    width: isDesktopOrLaptop ? ' ' : '250px',
                    height: isDesktopOrLaptop ? ' ' : '250px',
                    imageUrl: Success_Icon_yellow,
                    imageAlt: 'image',
                    imageWidth: isDesktopOrLaptop ? ' 75px' : '55px',
                    imageHeight: isDesktopOrLaptop ? ' 75px' : '55px',
                    html:
                        '<hr/>' +
                        'Your form is Successfully submited ',
                    showConfirmButton: false,
                    // showCloseButton:true,
                    timer: 2500,
                    showClass: {
                        backdrop: 'swal2-noanimation', // disable backdrop animation
                        popup: '',                     // disable popup animation
                        icon: ''                       // disable icon animation
                    },
                    hideClass: {
                        popup: '',                     // disable popup fade-out animation
                    }

                })
            }
            else if (response.status === 500) {
                setLoaderLoading(false)
                toast.error('Internal Server Error', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
            else if (response.status === 208) {
                setLoaderLoading(false)
                toast.warn('Email already available', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
            else if (response.status === 404) {
                setLoaderLoading(false)
                toast.error('Feild Not Found', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
            else if (response.status === 406) {
                setLoaderLoading(false)
                toast.error('Invalid Email', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
            else {
                setLoaderLoading(false)
                toast.error('Some thing worng', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }


            console.log(response);

        }
    });
    console.log(formik.values.photo);


    const getPincode = async (value) => {
        // console.log(Block,District);
        if (value?.replace('X', '').length === 6) {
            var config = {
                method: "get",
                url: `https://api.postalpincode.in/pincode/${value}`,
                headers: {},
            };

            const PincodeResult = await axios(config);
            if (PincodeResult.status === 200) {

                formik.setFieldValue("district", PincodeResult.data[0].PostOffice[0].District)
                console.log("formiik::", formik.values.district);
                formik.setFieldValue("tehsil", PincodeResult.data[0].PostOffice[0].Block)
            } else {
                formik.setFieldValue("district", PincodeResult.data[0].PostOffice[0].District)
                console.log("formiik::", formik.values.district);
                formik.setFieldValue("tehsil", PincodeResult.data[0].PostOffice[0].Block)
            }
        }
    };

    const getCourseFees = async (branch) => {

        if (branch !== '') {
            // console.log("api calling");

            var data = '';

            var config = {
                method: 'get',
                url: `${allUrls.showFees}${branch + formik.values.joinBatch}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                data: data
            };
            try {


                const StudentCourseFees = await axios(config)
                if (StudentCourseFees.status === 200) {
                    formik.setFieldValue('courseFees', StudentCourseFees.data[0].totalFees);

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

    const [expanded] = React.useState({
        panel1: true,
        panel2: true,
        panel3: true,
        panel4: true
    });

    // const handleChange = (id) => () => {
    //     // console.log(expanded)
    //     setExpanded((pre) => {
    //         return {
    //             ...pre,
    //             [id]: !expanded[id]
    //         }

    //     });
    // };
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width:770px)'
    })
    const mobile = useMediaQuery({
        query: '(min-width:455px)'
    })
    // const customStyles = {
    //     control: base => ({
    //         ...base,
    //         height: 26,
    //         minHeight: 25,
    //         fontSize: 10,
    //     })
    // };
    const imageToBase64 = async (file, feildName) => {
        if (file) {
            const options = {
                maxSizeMB: 0.01,
                maxWidthOrHeight: 1920,
                // useWebWorker: true
            }
            try {
                const compressedFile = await imageCompression(file, options);
                // console.log(compressedFile)
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                var reader = new FileReader();
                reader.readAsDataURL(compressedFile)
                reader.onload = async () => {
                    var Base64 = reader.result
                    // console.log(Base64)
                    formik.setFieldValue("photo1", Base64)

                    // setIs_data(true);
                }
                reader.onerror = (err) => {
                    console.log(err);
                }
            } catch (error) {
                console.log(error);
            }

        }
    }


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className={!isDesktopOrLaptop ? ' addnewstudent selfregisration mx-auto px-2' : ' addnewstudent selfregisration mx-auto px-3'}>
                <div className="row" style={{
                    backgroundColor: 'white', color: "#414c97", position: "fixed", zIndex: '1', top: 0,
                    left: 0,
                    right: 0, padding: ' 0 15px',
                    height: isDesktopOrLaptop ? 'auto' : '60px',
                    boxShadow: '0px 12px 5px 0px rgb(186 185 185 / 75%)',
                    WebkitBoxShadow: '0px 5px 5px 0px rgb(186 185 185 / 75%) '
                }} >

                    <div className="col-2 " style={{ padding: '0px' }}>
                        <img style={{ height: isDesktopOrLaptop ? 'auto' : '48px', margin: isDesktopOrLaptop ? '5px 0' : '3px' }} src={logoimage} alt="logo" />
                    </div>
                    <div className="d-flex justify-content-end col-5  my-auto offset-5 fw-bold" style={{ lineHeight: isDesktopOrLaptop ? '' : "20px", fontSize: isDesktopOrLaptop ? '20px' : "15px" }}>Self Registration</div>
                </div>

                <form onSubmit={formik.handleSubmit} style={{ marginTop: isDesktopOrLaptop ? '88px' : '70px' }}>
                    {/* Personal Details */}
                    <Accordion className="my-2 " style={{ boxShadow: "none", marginTop: '88px' }} expanded={expanded.panel1 === true}

                    // onChange={handleChange('panel1')}
                    >
                        <AccordionSummary
                            // expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{
                                backgroundColor: '#E6E9F4', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "40px", height: !isDesktopOrLaptop ? '40px' : '50px'
                            }}
                        >
                            <Typography style={{ color: "#414c97", margin: "0px" }}><b> Personal Details</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white', padding: !isDesktopOrLaptop ? '0px' : '15px' }}>
                            <Typography component={'div'} className='add_student_dropdown_menu' >
                                {/* Personal Details */}

                                <div className="form-row  mt-2" style={{ cursor: 'pointer' }} >
                                    {formik.values.photo1 !== '' ? <img style={{ cursor: 'pointer', height: !isDesktopOrLaptop ? '50px' : '70px', width: !isDesktopOrLaptop ? '50px' : '70px', borderRadius: '50%', border: '3px solid #5a607f' }} className='ml-2' onClick={() => { document.getElementById("profilePhoto").click() }} src={formik.values.photo1} alt="..." />
                                        : <img style={{ cursor: 'pointer', height: !isDesktopOrLaptop ? '50px' : '70px', width: !isDesktopOrLaptop ? '50px' : '70px' }} className='ml-2' onClick={() => { document.getElementById("profilePhoto").click() }} src={profile_image} alt="..." />
                                    }
                                    <img src={Plus_icon} alt="Plus_icon" style={{ marginTop: '21px', marginLeft: '-11px' }} />
                                    <input type="file" name="photo" value={formik.values.photo} id="profilePhoto" style={{ display: "none" }} accept="image/*" onChange={(e) => {
                                        imageToBase64(e.target.files[0], "photo");
                                    }} />
                                    <p className='my-auto ml-2 fw-bold' style={{ cursor: 'pointer', color: "#5a607f" }}> Upload Profile<span style={{ color: 'red' }}><span style={{ color: 'red' }}>*</span></span></p>
                                </div>

                                {/* first four input feild */}
                                <div className='form-row '>
                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">First Name<span style={{ color: 'red' }}>*</span></label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.firstName}
                                                name="firstName"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.firstName ? `form-control form-control-sm ${formik.errors.firstName ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.firstName ? `form-control  ${formik.errors.firstName ? "invalid" : ""}` : 'form-control '}
                                                placeholder="First Name"
                                            />
                                            {formik.errors.firstName && formik.touched.firstName ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.firstName}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Last Name<span style={{ color: 'red' }}>*</span></label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.lastName}
                                                name="lastName"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.lastName ? `form-control form-control-sm ${formik.errors.lastName ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.lastName ? `form-control  ${formik.errors.lastName ? "invalid" : ""}` : 'form-control '}
                                                placeholder="Last Name"
                                            />  {formik.errors.lastName && formik.touched.lastName ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.lastName}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>

                                    <div className="d-flex form-group col-md-6 my-2">

                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">DOB<span style={{ color: 'red' }}>*</span></label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.dob}
                                                name="dob"
                                                type="Date"
                                                className={!isDesktopOrLaptop ? formik.touched.dob ? `form-control form-control-sm ${formik.errors.dob ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.dob ? `form-control  ${formik.errors.dob ? "invalid" : ""}` : 'form-control '}
                                                placeholder="DOB"
                                            />
                                            {formik.errors.dob && formik.touched.dob ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.dob}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Contact Number<span style={{ color: 'red' }}>*</span></label>
                                            <NumberFormat onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.contactNumber}
                                                name="contactNumber" placeholder="Contact Number" className={!isDesktopOrLaptop ? formik.touched.contactNumber ? `form-control form-control-sm ${formik.errors.contactNumber ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.contactNumber ? `form-control  ${formik.errors.contactNumber ? "invalid" : ""}` : 'form-control '} format="##########" />
                                            {formik.errors.contactNumber && formik.touched.contactNumber ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.contactNumber}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Second Four Input Field */}
                                <div className='form-row '>
                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Father Name<span style={{ color: 'red' }}>*</span></label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.fatherName}
                                                name="fatherName"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.fatherName ? `form-control form-control-sm ${formik.errors.fatherName ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.fatherName ? `form-control  ${formik.errors.fatherName ? "invalid" : ""}` : 'form-control '}
                                                placeholder="Father Name"
                                            />
                                            {formik.errors.fatherName && formik.touched.fatherName ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.fatherName}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Father Occupation</label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.fatherOccupation}
                                                name="fatherOccupation"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.fatherOccupation ? `form-control form-control-sm ${formik.errors.fatherOccupation ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.fatherOccupation ? `form-control  ${formik.errors.fatherOccupation ? "invalid" : ""}` : 'form-control '}
                                                placeholder="Father Occupation"
                                            />
                                            {formik.errors.fatherOccupation && formik.touched.fatherOccupation ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.fatherOccupation}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Father Annual Income</label>
                                            <input onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                type="number"
                                                value={formik.values.fatherIncome}
                                                name="fatherIncome" placeholder="Father Annual Income" className={!isDesktopOrLaptop ? formik.touched.fatherIncome ? `form-control form-control-sm ${formik.errors.fatherIncome ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.fatherIncome ? `form-control  ${formik.errors.fatherIncome ? "invalid" : ""}` : 'form-control '}
                                            />

                                            {formik.errors.fatherIncome && formik.touched.fatherIncome ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.fatherIncome}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Father Contact<span style={{ color: 'red' }}>*</span></label>
                                            <NumberFormat onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.FatherContactNumber}
                                                name="FatherContactNumber" placeholder="Father Contact"
                                                className={!isDesktopOrLaptop ? formik.touched.FatherContactNumber ? `form-control form-control-sm ${formik.errors.FatherContactNumber ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.FatherContactNumber ? `form-control  ${formik.errors.FatherContactNumber ? "invalid" : ""}` : 'form-control '}
                                                format="##########" />
                                            {formik.errors.FatherContactNumber && formik.touched.FatherContactNumber ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.FatherContactNumber}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>

                                </div>
                                {/* Addres Input feild */}
                                <div className="form-row ">
                                    <div className="d-flex form-group col-md-12">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Address<span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.address}
                                                name="address"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.address ? `form-control form-control-sm ${formik.errors.address ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.address ? `form-control  ${formik.errors.address ? "invalid" : ""}` : 'form-control '}
                                                placeholder="Enter your Address"
                                            />
                                            {formik.errors.address && formik.touched.address ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.address}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div></div>
                                </div>
                                {/* third Four input feild */}
                                <div className='form-row '>
                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Pincode<span style={{ color: 'red' }}>*</span></label>  <NumberFormat
                                                onChange={async (e) => { await formik.setFieldValue("pincode", e.target.value); getPincode(e.target.value) }}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.pincode}
                                                name="pincode"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.pincode ? `form-control form-control-sm ${formik.errors.pincode ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.pincode ? `form-control  ${formik.errors.pincode ? "invalid" : ""}` : 'form-control '}
                                                format="######"
                                                mask={'X'}
                                                placeholder="EX:- 455336"
                                            />
                                            {formik.errors.pincode && formik.touched.pincode ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.pincode}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Village<span style={{ color: 'red' }}>*</span></label>

                                            <Select
                                                options={villageNames}
                                                onChange={({ value }) => { formik.setFieldValue('village', value) }}
                                                onBlur={formik.handleBlur}
                                                // value={formik.values.village}
                                                name="village"
                                                className={formik.touched.village ? ` ${formik.errors.village ? "invalid" : ""}` : ''}
                                                // styles={!isDesktopOrLaptop ? customStyles : ''}

                                                placeholder="Select Village"
                                            />
                                            {formik.errors.village && formik.touched.village ? (
                                                <div className="text-danger" style={{ borderRadius: '2px', fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.village}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex form-group col-md-6 my-2">

                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Tehsil<span style={{ color: 'red' }}>*</span></label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.tehsil}
                                                name="tehsil"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.tehsil ? `form-control form-control-sm ${formik.errors.tehsil ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.tehsil ? `form-control  ${formik.errors.tehsil ? "invalid" : ""}` : 'form-control '}
                                                placeholder="Tehsil"
                                            />
                                            {formik.errors.tehsil && formik.touched.tehsil ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.tehsil}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">District<span style={{ color: 'red' }}>*</span></label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.district}
                                                name="district"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.district ? `form-control form-control-sm ${formik.errors.district ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.district ? `form-control  ${formik.errors.district ? "invalid" : ""}` : 'form-control '}
                                                placeholder="District"
                                            />
                                            {formik.errors.district && formik.touched.district ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.district}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Fourth four input feild */}
                                <div className='form-row '>
                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Email<span style={{ color: 'red' }}>*</span></label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                name="email"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.email ? `form-control form-control-sm ${formik.errors.email ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.email ? `form-control  ${formik.errors.email ? "invalid" : ""}` : 'form-control '}
                                                placeholder="Email"
                                            />
                                            {formik.errors.email && formik.touched.email ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.email}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Aadhar Number<span style={{ color: 'red' }}>*</span></label>
                                            <NumberFormat onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.aadharNumber}
                                                name="aadharNumber"
                                                // placeholder="Aadhar Number" 
                                                className={!isDesktopOrLaptop ? formik.touched.aadharNumber ? `form-control form-control-sm ${formik.errors.aadharNumber ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.aadharNumber ? `form-control  ${formik.errors.aadharNumber ? "invalid" : ""}` : 'form-control '}
                                                format="#### #### ####"
                                                mask={'X'}
                                                placeholder="EX:- 436175370721"
                                            />
                                            {formik.errors.aadharNumber && formik.touched.aadharNumber ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.aadharNumber}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Category<span style={{ color: 'red' }}>*</span></label>
                                            <select
                                                name="category"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.category}
                                                className={!isDesktopOrLaptop ? formik.touched.firstName ? `form-select form-control-sm ${formik.errors.firstName ? "invalid" : ""}` : 'form-select form-control-sm' : formik.touched.firstName ? `form-select  ${formik.errors.firstName ? "invalid" : ""}` : 'form-select '}
                                                id="inputGroupSelect02"
                                            >
                                                <option value="">
                                                    Category
                                                </option>
                                                <option value="GEN">GEN</option>
                                                <option value="OBC">OBC</option>
                                                <option value="SC">SC</option>
                                                <option value="ST">ST</option>
                                            </select>
                                            {formik.errors.category && formik.touched.category ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.category}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        <div className="col">
                                            <label className="addStdLable" >Gender</label>
                                            <div className='my-2'>
                                                <label className="addStdLable" >

                                                    <input className='mt-1' type="radio" onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur} name="gender" value="male"
                                                        defaultChecked={true} />
                                                    {' '} <span style={{ paddingBottom: '10px' }}>Male</span>

                                                </label>{'   '}{' '}
                                                <label className="addStdLable">

                                                    <input style={{ marginLeft: '14px' }} type="radio" onChange={formik.handleChange}

                                                        onBlur={formik.handleBlur} name="gender" value="female" />
                                                    {'  '} Female

                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* Personal Details */}

                    {/* Acadmic Details */}
                    <Accordion className="my-2 mb-5" style={{ boxShadow: "none" }} expanded={expanded.panel2 === true}

                    // onChange={handleChange('panel2')} 

                    >
                        <AccordionSummary
                            // expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            style={{ backgroundColor: '#E6E9F4', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "40px", height: !isDesktopOrLaptop ? '40px' : '50px' }}
                        >
                            <Typography style={{ color: "#414c97" }}><b>Acadmic Details </b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white', padding: !isDesktopOrLaptop ? '0px' : '15px' }}>
                            <Typography component={'div'}>

                                <div className='form-row mt-2'>
                                    <div className="d-flex form-group col-md-6 my-2 ">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">10<sup>th</sup> Roll Number<span style={{ color: 'red' }}>*</span></label>  <NumberFormat
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.rollNumber10}
                                                name="rollNumber10"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.rollNumber10 ? `form-control form-control-sm ${formik.errors.rollNumber10 ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.rollNumber10 ? `form-control  ${formik.errors.rollNumber10 ? "invalid" : ""}` : 'form-control '}
                                                placeholder="Roll Number"
                                            />
                                            {formik.errors.rollNumber10 && formik.touched.rollNumber10 ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.rollNumber10}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">10<sup>th</sup> Percentage<span style={{ color: 'red' }}>*</span></label>  <NumberFormat
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.percent10}
                                                name="percent10"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.percent10 ? `form-control form-control-sm ${formik.errors.percent10 ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.percent10 ? `form-control  ${formik.errors.percent10 ? "invalid" : ""}` : 'form-control '}
                                                format="##%"
                                                mask={['X', 'X', '%']}
                                                placeholder="XX%"

                                            />
                                            {formik.errors.percent10 && formik.touched.percent10 ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.percent10}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                    </div>
                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">12<sup>th</sup> School Name<span style={{ color: 'red' }}>*</span></label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.schoolName}
                                                name="schoolName"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.schoolName ? `form-control form-control-sm ${formik.errors.schoolName ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.schoolName ? `form-control  ${formik.errors.schoolName ? "invalid" : ""}` : 'form-control '}
                                                placeholder="School Name"
                                            />
                                            {formik.errors.schoolName && formik.touched.schoolName ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.schoolName}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">12<sup>th</sup> Subject<span style={{ color: 'red' }}>*</span></label>
                                            <select onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} name="subject12" value={formik.values.subject12} className={!isDesktopOrLaptop ? formik.touched.subject12 ? `form-select form-control-sm ${formik.errors.subject12 ? "invalid" : ""}` : 'form-select form-control-sm' : formik.touched.subject12 ? `form-select  ${formik.errors.subject12 ? "invalid" : ""}` : 'form-select '} id="inputGroupSelect02" placeholder="select">
                                                <option value="">Select Subject</option>
                                                <option value="Maths">Maths</option>
                                                <option value="BIO">BIO</option>
                                                <option value="Art">Art</option>
                                                <option value="Commerce">Commerce</option>
                                            </select>
                                            {formik.errors.subject12 && formik.touched.subject12 ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.subject12}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>



                                </div>
                                <div className='form-row '>
                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">12<sup>th</sup> Roll Number</label>  <NumberFormat
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.rollNumber12}
                                                name="rollNumber12"
                                                type="text"
                                                className={!isDesktopOrLaptop ? formik.touched.rollNumber12 ? `form-control form-control-sm ${formik.errors.rollNumber12 ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.rollNumber12 ? `form-control  ${formik.errors.rollNumber12 ? "invalid" : ""}` : 'form-control '}
                                                placeholder="Roll Number"
                                            /> {formik.errors.rollNumber12 && formik.touched.rollNumber12 ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.rollNumber12}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">12<sup>th</sup> Percentage</label>  <NumberFormat
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.percent12}
                                                name="percent12"
                                                type="text"
                                                format="##%"
                                                mask={['X', 'X', '%']}
                                                placeholder="XX%"

                                                className={!isDesktopOrLaptop ? formik.touched.percent12 ? `form-control form-control-sm ${formik.errors.percent12 ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.percent12 ? `form-control  ${formik.errors.percent12 ? "invalid" : ""}` : 'form-control '}
                                            /> {formik.errors.percent12 && formik.touched.percent12 ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.percent12}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Branch Name<span style={{ color: 'red' }}>*</span></label>
                                            <label className="addStdLable" style={{ fontSize: '12px' }}> अपना प्रवेश विषय चुनें</label>

                                            <select name="streamName" value={formik.values.streamName}
                                                onChange={async (e) => { await formik.setFieldValue("streamName", e.target.value); getCourseFees(e.target.value) }} className={!isDesktopOrLaptop ? formik.touched.streamName ? `form-select form-control-sm ${formik.errors.streamName ? "invalid" : ""}` : 'form-select form-control-sm' : formik.touched.streamName ? `form-select  ${formik.errors.streamName ? "invalid" : ""}` : 'form-select '} id="inputGroupSelect02" placeholder="select">

                                                <option value=''>Select Branch</option>
                                                {branchNames.map((ele, i) => {
                                                    return (
                                                        <option key={i} value={ele.subjects}>{ele.subjects}</option>
                                                    )
                                                })}

                                            </select>
                                            {formik.errors.streamName && formik.touched.streamName ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.streamName}
                                                </div>
                                            ) : (
                                                ""
                                            )}

                                        </div>


                                        <div className="col" >
                                            <label className="addStdLable" htmlFor="">Course Fees<span style={{ color: 'red' }}>*</span></label> <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                onBlurCapture={getCourseFees}
                                                value={formik.values.courseFees}
                                                name="courseFees"
                                                type="text"
                                                style={{ marginTop: !mobile ? "1.5pc" : " " }}
                                                className={!isDesktopOrLaptop ? formik.touched.courseFees ? `form-control form-control-sm ${formik.errors.courseFees ? "invalid" : ""}` : 'form-control form-control-sm' : formik.touched.courseFees ? `form-control  ${formik.errors.courseFees ? "invalid" : ""}` : 'form-control '}
                                                placeholder="Course Fees"
                                                disabled={true}
                                            />
                                            {formik.errors.courseFees && formik.touched.courseFees ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.courseFees}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                    </div>

                                </div>
                                <div className='form-row '>

                                    <div className="d-flex form-group col-md-6 my-2">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Year<span style={{ color: 'red' }}>*</span></label>
                                            <select name="year" value={formik.values.year} onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} className={!isDesktopOrLaptop ? formik.touched.year ? `form-select form-control-sm ${formik.errors.year ? "invalid" : ""}` : 'form-select form-control-sm' : formik.touched.year ? `form-select  ${formik.errors.year ? "invalid" : ""}` : 'form-select '} id="inputGroupSelect02" placeholder="select">
                                                <option value=''>Select Year</option>
                                                <option value='I'>I Year</option>
                                                <option value='II'>II Year</option>
                                                <option value='III'>III Year</option>
                                            </select>
                                            {formik.errors.year && formik.touched.year ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.year}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col mb-4">
                                            <label className="addStdLable" >Bus Track</label>
                                            <select name="trackName" value={formik.values.trackName} onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} className={!isDesktopOrLaptop ? formik.touched.trackName ? `form-select form-control-sm ${formik.errors.trackName ? "invalid" : ""}` : 'form-select form-control-sm' : formik.touched.trackName ? `form-select  ${formik.errors.trackName ? "invalid" : ""}` : 'form-select '} id="inputGroupSelect02" placeholder="select">
                                                <option value='0'>Select Track</option>
                                                {trackNames.map((ele, i) => {
                                                    return (
                                                        <option key={i} value={ele.trackName}>{ele.trackName}</option>
                                                    )
                                                })}

                                            </select>
                                            {formik.errors.trackName && formik.touched.trackName ? (
                                                <div className="text-danger" style={{ fontSize: !isDesktopOrLaptop ? "10px" : "18px" }}>
                                                    {formik.errors.trackName}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>


                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* Acadmic Details */}
                    {!isDesktopOrLaptop ? <div className='mt-5' style={{ height: "25px" }}></div> : ''}




                    <div style={{
                        height: '100%',
                        width: '100%',
                        left: !isDesktopOrLaptop ? "0%" : "83%",
                        top: "90%",
                        zindex: "5000",
                        position: "fixed",
                        display: isDesktopOrLaptop ? '' : 'flex',
                        justifyContent: 'center',
                        bottom: 0,
                        right: 0,
                        background: !isDesktopOrLaptop ? 'rgb(255,255,255)' : '',
                        padding: '15px',
                        boxShadow: !isDesktopOrLaptop ? 'rgb(186 185 185 / 75%) 0px -5px 5px 0px' : '',
                    }}  >

                        <button className="btn btn-sm btn-warning text-light fw-bold" type="submit"
                            style={{
                                width: !isDesktopOrLaptop ? "100%" : "220px",
                                height: '55px',
                                fontSize: '18px',
                                backgroundColor: 'orange'
                            }}

                        > {loaderLoading ? <LoaderButton /> : "Submit"}
                        </button>

                    </div>

                </form>
            </div>



        </>
    );
}

//Getting the state from the store
// const mapStateToProps = (state) => {
//     return {
//         addStudent: state.addStudent,
//     };
// };

// //passing the userData in fetchUsers function and also dispatch method
// const mapDispatchToProps = (dispatch) => {
//     return {
//         AddNewStudent: (data,backToProfilePage) => dispatch(AddNewStudent(data,backToProfilePage)),
//     };
// };

// //Connecting the component to our store
// export default connect(mapStateToProps,mapDispatchToProps)(AddNewStudentPage);

export default SelfRegistration;
