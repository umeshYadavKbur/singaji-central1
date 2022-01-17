import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Edit_icon from '../../assests/image/Edit_icon.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AddNewStudent.css'
import { useNavigate } from 'react-router-dom';
import student_Profile__RocketImg from '../../assests/image/AccountIcons/studentProfileRocketImg.svg'
import allUrls from '../../../redux/constants/url'
import { useFormik } from 'formik'
import NumberFormat from 'react-number-format'
import Select from 'react-select'
import axios from 'axios'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import * as Yup from "yup";
import AvatarImg from '../../assests/image/Avtar.jpeg'


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;

`;

const style = {
    width: 500,
    bgcolor: 'white',

    // p: 2,
    // px: 4,
    pb: 3,
};

function StudentProfile() {
    const [branchNames, setBranchNames] = useState([{ subjects: 'loading...', id: 0 }])
    const [villageNames, setVillageNames] = useState([{ label: 'loading...', villageId: 0 }])


    useEffect(() => {


        const getData = async () => {

            const branchName = await axios(allUrls.branchList)
            if (branchName.status === 200) {

            }
            // console.log(branchName.data);
            // console.log("branch Name ", branchName.data);
            setBranchNames(branchName.data)

            /////////////////////////
            const villageNamesRes = await axios(allUrls.villageNameList)
            let newVillageName = [];
            villageNamesRes.data.forEach((ele) => { newVillageName.push({ 'label': ele.villagename, 'value': ele.villagename }) })
            // console.log(newVillageName);
            setVillageNames(newVillageName);
        }
        getData();
    })


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const data = localStorage.getItem('userEdit')
    const StudentProfileData = JSON.parse(data)

    // console.log(StudentProfileData);

    var StudentName = StudentProfileData.accountInfo.firstName + ' ' + StudentProfileData.accountInfo.lastName
    var StudentClassName = (StudentProfileData.accountInfo.branch).toUpperCase()
    var StudentPhoto = StudentProfileData.accountInfo.photo
    // console.log(StudentPhoto);

    const initialValues = {

        studentName: StudentName,
        fatherName: StudentProfileData.accountInfo.fathersName,
        contactNumber: StudentProfileData.accountInfo.mobile,
        FatherContactNumber: StudentProfileData.accountInfo.fatherContactNumber,
        dob: StudentProfileData.accountInfo.dob,
        village: StudentProfileData.accountInfo.village,
        streamName: StudentProfileData.accountInfo.branch,
        aadharNumber: StudentProfileData.accountInfo.aadarNo,
        year: StudentProfileData.accountInfo.year,
        EnrollmentNumber: '',

        remark:   StudentProfileData?StudentProfileData.accountInfo.remark:'',
        ThirdinstallmentDate: StudentProfileData ? StudentProfileData.accountInfo.ThirdinstallmentDate:'',
        Thirdinstallment: StudentProfileData ? StudentProfileData.accountInfo.Thirdinstallment:'',
        SecondinstallmentDate: StudentProfileData ? StudentProfileData.accountInfo.SecondinstallmentDate:'',
        Secondinstallment: StudentProfileData ? StudentProfileData.accountInfo.Secondinstallment:'',
        FirstinstallmentDate: StudentProfileData ? StudentProfileData.accountInfo.FirstinstallmentDate:'',
        Firstinstallment: StudentProfileData ? StudentProfileData.accountInfo.Firstinstallment:'',
        GKB_Amount: StudentProfileData ? StudentProfileData.accountInfo.GKB_Amount:'',
        Busfee: StudentProfileData ? StudentProfileData.accountInfo.Busfee:'',
        reg_Fees: StudentProfileData ? StudentProfileData.accountInfo.reg_Fees:'',
        Tutionfee: StudentProfileData ? StudentProfileData.accountInfo.Tutionfee:'',
        feesScheme: StudentProfileData ? StudentProfileData.accountInfo.feesScheme:'',

    }
    const validationSchema = Yup.object({
        studentName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates').required("Required!"),
        fatherName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates').required("Required!"),
        dob: Yup.string().required("Required!").test('doc_check', 'Minimum age must be 12-14 years', val => val?.slice(0, 4) <= (new Date().getFullYear()) - 13),
        contactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        FatherContactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        year: Yup.string().required("Required!"),
        aadharNumber: Yup.string().trim().required("Required!").test('len', 'Must be exactly 12 digits', val => val?.replace('X', '').length === 14),
        village: Yup.string().required("Required!").trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        EnrollmentNumber: Yup.string().required("Required!").trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        streamName: Yup.string().required("Required!"),


    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const UpdatePersonalInfoData = {
                "stdId": StudentProfileData.accountInfo.stdId,
                "firstName": "sandhya",
                "lastName": "jaiswal",
                "photo": null,
                "branch": formik.values.streamName,
                "fathersName": formik.values.fatherName,
                "dob": formik.values.dob,
                "mobile": formik.values.contactNumber,
                "fatherContactNumber": formik.values.FatherContactNumber,
                "email": "sandhya123@gmail.com",
                "schoolName": "fifth mountain academy",
                "school12sub": "pcm",
                "persentage12": "84",
                "rollNumber12": "1234568765",
                "persentage10": "84",
                "rollNumber10": "123456756",
                "aadarNo": formik.values.aadharNumber,
                "fatherOccupation": "farmer",
                "fatherIncome": "10000",
                "category": "obc",
                "gender": "male",
                "pincode": "4553356",
                "trackName": "khategaon",
                "address": "gram-agarda",
                "village": formik.values.village,
                "tehsil": "khategaon",
                "district": "dewas"
            }
            var config = {
                method: 'post',
                url: allUrls.updatePersonalInformation,
                headers: {
                    'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                // data: UpdatePersonalInfoData
            };
            console.log(config, UpdatePersonalInfoData)

            // const response = await axios(config)
            // console.log(response);
        }
    })
    // formik.setFieldValue('village',StudentProfileData.accountInfo.village)

    return (
        <div>


            <div className="row my-3 me-3 ms-2" style={{backgroundColor: '#E6E9F4', borderRadius: '8px' }}>
                <div className="col-2 my-5">
                    {StudentPhoto.includes('/null')?
                     <img style={{borderRadius: "50px",height: "100px",width: '100px',marginLeft: '50px',backgroundColor: '#DDDDDD'}} src={AvatarImg} alt="avtar_photo" /> 
                    :
                     <img style={{ borderRadius: "50px", height: "100px", width: '100px', marginLeft: '50px', backgroundColor: '#DDDDDD' }} src={StudentPhoto} alt="avtar_photo" />
                    }

                    <img src={Edit_icon} alt='edit_icon' className='mt-5' style={{ marginLeft: "-10px", height: '20px', width: '20px' }} />

                </div>
                <div className="col-3">
                    <div className='mt-5' style={{ color: '#5A607F' }}>
                        <span className='fw-bold' style={{ fontSize: '22px' }}>{StudentName}</span>
                        <br />
                        {`${StudentClassName} (${StudentProfileData.accountInfo.joinBatch + '-' + (parseInt(StudentProfileData.accountInfo.joinBatch) + 3)})`}
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button style={{backgroundColor: '#ff9707'}} onClick={() => { navigate("feesrecipt"); }} className="btn  btn-warning text-light fw-bold" type="submit">Reciept</button>

                        <button style={{color: '#0dcaf0',backgroundColor:'#E6E9F4'}} className="btn btn-outline-info fw-bold" type="submit" onClick={() => { navigate("uploaddocument"); }}>Upload Document</button>
                    </div>
                </div>
                <div className="col-7 d-flex justify-content-end">
                    <img src={student_Profile__RocketImg} className='mt-4 ' alt="rocket" />
                    <img src={Edit_icon} onClick={handleOpen} className='mb-1 ' alt="rocket" style={{ height: '40px', width: '40px', alignSelf: 'self-end', cursor: 'pointer' }} />
                    {/* <img src={Edit_icon} alt='edit_icon'  /> */}
                </div>
            </div>

            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}  >
                    <form onSubmit={formik.handleSubmit}>

                        <div style={{ borderRadius: '5px' }}>

                            <div className='d-flex fw-bold text-light p-2' style={{
                                justifyContent: 'center',
                                backgroundColor: 'orange', width: '100%', margin: 0
                            }}>Edit Personal Detail </div>
                            <div className="d-flex p-1">
                                <div className="row">
                                    <div className='row m-1'>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Student Name</label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.studentName}
                                                name="studentName"
                                                type="text"
                                                className={formik.touched.studentName ? `form-control ${formik.errors.studentName ? "invalid" : ""}` : 'form-control'}
                                                placeholder="Student name"
                                            />
                                            {formik.errors.studentName && formik.touched.studentName ? (
                                                <div className="text-danger fs-6">
                                                    {formik.errors.studentName}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Father Name</label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.fatherName}
                                                name="fatherName"
                                                type="text"
                                                className={formik.touched.fatherName ? `form-control ${formik.errors.fatherName ? "invalid" : ""}` : 'form-control'}
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



                                    </div>

                                    {/* Second Four Input Field */}
                                    <div className='row m-1'>

                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Contact Number</label>
                                            <NumberFormat onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.contactNumber}
                                                name="contactNumber" placeholder="Contact Number" className={formik.touched.contactNumber ? `form-control ${formik.errors.contactNumber ? "invalid" : ""}` : 'form-control'} format="##########" />
                                            {formik.errors.contactNumber && formik.touched.contactNumber ? (
                                                <div className="text-danger fs-6">
                                                    {formik.errors.contactNumber}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Father Contact</label>
                                            <NumberFormat onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.FatherContactNumber}
                                                name="FatherContactNumber" placeholder="Father Contact"
                                                className={formik.touched.FatherContactNumber ? `form-control ${formik.errors.FatherContactNumber ? "invalid" : ""}` : 'form-control'}
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

                                    <div className='row m-1'>

                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Stream Name</label>

                                            <select name="streamName" value={formik.values.streamName} onBlur={formik.handleBlur}

                                                onChange={formik.handleChange} className={formik.touched.streamName ? `form-select ${formik.errors.streamName ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">
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
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Year</label>

                                            <select name="year" value={formik.values.year} onBlur={formik.handleBlur}

                                                onChange={formik.handleChange} className={formik.touched.year ? `form-select ${formik.errors.year ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">

                                                <option value='I'>I</option>
                                                <option value='II'>II</option>
                                                <option value='III'>III</option>

                                            </select>
                                            {formik.errors.year && formik.touched.year ? (
                                                <div className="text-danger fs-6">
                                                    {formik.errors.year}
                                                </div>
                                            ) : (
                                                ""
                                            )}

                                        </div>
                                    </div>
                                    <div className='row m-1'>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Enrollment number</label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.EnrollmentNumber}
                                                name="EnrollmentNumber"
                                                type="text"
                                                className={formik.touched.EnrollmentNumber ? `form-control ${formik.errors.EnrollmentNumber ? "invalid" : ""}` : 'form-control'}
                                                placeholder="Enrollment number"
                                            />
                                            {formik.errors.EnrollmentNumber && formik.touched.EnrollmentNumber ? (
                                                <div className="text-danger fs-6">
                                                    {formik.errors.EnrollmentNumber}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">DOB</label>  <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.dob}
                                                name="dob"
                                                type="date"
                                                className={formik.touched.dob ? `form-control ${formik.errors.dob ? "invalid" : ""}` : 'form-control'}
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




                                    </div>
                                    {/* Fourth four input feild */}
                                    <div className='row m-1'>
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Village</label>

                                            <Select
                                                options={villageNames}
                                                onChange={({ value }) => { formik.setFieldValue('village', value) }}
                                                onBlur={formik.handleBlur}
                                                name="village"
                                                className={formik.touched.village ? ` ${formik.errors.village ? "invalid" : ""}` : ''}
                                                defaultValue={StudentProfileData ? {label: StudentProfileData.accountInfo.village,value: StudentProfileData.accountInfo.village} : ''}
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
                                            <label className="addStdLable" htmlFor="">Aadhar Number</label>
                                            <NumberFormat onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.aadharNumber}
                                                name="aadharNumber"
                                                // placeholder="Aadhar Number"
                                                className={formik.touched.aadharNumber ? `form-control ${formik.errors.aadharNumber ? "invalid" : ""}` : 'form-control'}
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


                                    </div>
                                    <div className="d-flex justify-content-end mt-3 m-1">
                                        <div className='me-3'>
                                            <button style={{width: '116px'}} type='submit' onClick={handleClose} className='btn  btn-light m-1'>Cancel</button>
                                            <button style={{width: '116px'}} type='submit' className='btn  btn-primary m-1' >Update</button>
                                        </div></div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Box>
            </StyledModal>

            <Accordion className="my-2 me-3 ms-2" expanded={true} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{
                        backgroundColor: '#E6E9F4 ', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "50px"
                    }}
                >
                    <Typography style={{ color: "#414c97", margin: "0px" }}><b> Fees Details</b></Typography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                    <Typography component={'div'} >
                        {/* Personal Details */}


                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Account status</label>
                                <input name="harsh" onChange={formik.handleChange} value={formik.values.harsh} type="text" className='form-control' placeholder='Account status' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Fees Scheme</label>
                                <input name="feesScheme" onChange={formik.handleChange} value={formik.values.feesScheme} type="text" className='form-control' placeholder='Fees Scheme' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Course Fees</label>
                                <input name="Tutionfee" onChange={formik.handleChange} value={formik.values.Tutionfee} type="number" className='form-control' placeholder='Course Fees' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Scolarship Type</label>
                                <input name="harsh" onChange={formik.handleChange} value={formik.values.harsh} type="number" className='form-control' placeholder='Father contact' />
                            </div>
                        </div>


                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Registration Amount</label>
                                <input name="reg_Fees" onChange={formik.handleChange} value={formik.values.reg_Fees} type="text" className='form-control' placeholder='Registration Amount' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Registration Number</label>
                                <input name="harsh" onChange={formik.handleChange} value={formik.values.harsh} type="text" className='form-control' placeholder='Registration number ' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Bus Fees</label>
                                <input name="Busfee" onChange={formik.handleChange} value={formik.values.Busfee} type="number" className='form-control' placeholder='Bus Fees' />
                            </div>
                            <div className="col">
                                <label htmlFor="">GKB Amount</label>
                                <input name="GKB_Amount" onChange={formik.handleChange} value={formik.values.GKB_Amount} type="number" className='form-control' placeholder='Father contact' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="">First Installment</label>
                                <input name="Firstinstallment" onChange={formik.handleChange} value={formik.values.Firstinstallment} type="number" className='form-control' placeholder='First Installment' />
                            </div>
                            <div className="col">
                                <label htmlFor="">First Installment date</label>
                                <input name="FirstinstallmentDate" onChange={formik.handleChange} value={formik.values.FirstinstallmentDate} type="date" className='form-control' placeholder='First Installment date' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Second Installment</label>
                                <input name="Secondinstallment" onChange={formik.handleChange} value={formik.values.Secondinstallment} type="number" className='form-control' placeholder='Second Installment' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Second Installment date</label>
                                <input name="SecondinstallmentDate" onChange={formik.handleChange} value={formik.values.SecondinstallmentDate} type="date" className='form-control' placeholder='Second Installment date' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Third Installment</label>
                                <input name="Thirdinstallment" onChange={formik.handleChange} value={formik.values.Thirdinstallment} type="number" className='form-control' placeholder='Third Installment' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Third Installment date</label>
                                <input name="ThirdinstallmentDate" onChange={formik.handleChange} value={formik.values.ThirdinstallmentDate} type="date" className='form-control' placeholder='Third Installment date' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Remark</label>
                                <input name="remark" onChange={formik.handleChange} value={formik.values.remark} type="text" className='form-control' placeholder='Remark' />
                            </div>
                            <div className="col-3">
                               
                            </div>
                        </div>

                        <div className="d-flex  justify-content-end my-4" >
                            <div className="me-2">
                                
                                    <button className="btn btn-sm btn-primary text-light fw-bold m-1 " style={{width: "250px",height: "40px"}} type="submit">Update</button>
                            </div>
                        </div>


                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default StudentProfile
