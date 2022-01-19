import React,{useEffect,useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Edit_icon from '../../assests/image/Edit_icon.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AddNewStudent.css'
import {useNavigate} from 'react-router-dom';
import student_Profile__RocketImg from '../../assests/image/AccountIcons/studentProfileRocketImg.svg'
import allUrls from '../../../redux/constants/url'
import {useFormik} from 'formik'
import NumberFormat from 'react-number-format'
import Select from 'react-select'
import axios from 'axios'
import {styled,Box} from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import * as Yup from "yup";
import AvatarImg from '../../assests/image/Avtar.jpeg'
import ToastContainer from 'rsuite/esm/toaster/ToastContainer';
import {toast} from 'react-toastify';
import checkBoxImg from '../../assests/image/AccountIcons/thirdInstallmentCheckImg.svg'
import UpdateStudentPersonalInfo from './UpdateStudentPersonalInfo';


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
    const [branchNames,setBranchNames] = useState([{subjects: 'loading...',id: 0}])
    const [villageNames,setVillageNames] = useState([{label: 'loading...',villageId: 0}])


    useEffect(() => {


        const getData = async () => {

            const branchName = await axios(allUrls.branchList)
            if(branchName.status === 200) {

                setBranchNames(branchName.data)
            }
            // console.log(branchName.data);
            // console.log("branch Name ", branchName.data);

            /////////////////////////
            const villageNamesRes = await axios(allUrls.villageNameList)
            let newVillageName = [];
            villageNamesRes.data.forEach((ele) => {newVillageName.push({'label': ele.villagename,'value': ele.villagename})})
            // console.log(newVillageName);
            setVillageNames(newVillageName);
        }
        getData();
    },[]);


    const [open,setOpen] = React.useState(false);
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


        ThirdinstallmentDate: StudentProfileData ? StudentProfileData.accountInfo.ThirdinstallmentDate : '',
        Thirdinstallment: StudentProfileData ? StudentProfileData.accountInfo.Thirdinstallment : '',
        SecondinstallmentDate: StudentProfileData ? StudentProfileData.accountInfo.SecondinstallmentDate : '',
        Secondinstallment: StudentProfileData ? StudentProfileData.accountInfo.Secondinstallment : '',
        FirstinstallmentDate: StudentProfileData ? StudentProfileData.accountInfo.FirstinstallmentDate : '',
        Firstinstallment: StudentProfileData ? StudentProfileData.accountInfo.Firstinstallment : '',
        Busfee: StudentProfileData ? StudentProfileData.accountInfo.Busfee : '',
        reg_Fees: StudentProfileData ? StudentProfileData.accountInfo.reg_Fees : '',
        Tutionfee: StudentProfileData ? StudentProfileData.accountInfo.Tutionfee : '',
        GKB_Amount: StudentProfileData ? StudentProfileData.accountInfo.GKB_Amount : '',
        accountStatus: StudentProfileData ? StudentProfileData.accountInfo.is_active : '',
        remark: StudentProfileData ? StudentProfileData.accountInfo.remark : '',
        year: StudentProfileData ? StudentProfileData.accountInfo.year : '',
        sponsorshipType: StudentProfileData ? StudentProfileData.accountInfo.sponsorshipType : '',


    }
    const validationSchema = Yup.object({


        accountStatus: Yup.string().required("Required!"),
        remark: Yup.string().required("Required!"),
        GKB_Amount: Yup.string().required("Required!"),
        Busfee: Yup.string().required("Required!").test('Is positive','must be positive',val => val >= 0),
        reg_Fees: Yup.string().required("Required!").test('Is positive','must be positive',val => val >= 0),
        Tutionfee: Yup.string().required("Required!").test('Is positive','must be positive',val => val >= 0),
        year: Yup.string().required("Required!"),
        Firstinstallment: Yup.string().required("Required!").test('Is positive','must be positive',val => val >= 0),
        FirstinstallmentDate: Yup.string().required("Required!"),
        Secondinstallment: Yup.string().required("Required!").test('Is positive','must be positive',val => val >= 0),
        SecondinstallmentDate: Yup.string().required("Required!"),
        Thirdinstallment: Yup.string().required("Required!").test('Is positive','must be positive',val => val >= 0),
        ThirdinstallmentDate: Yup.string().required("Required!"),
        feesScheme: Yup.string().required("Required!"),





    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);


            const UpdateAccountInfoData = {
                "stdId": StudentProfileData.accountInfo.stdId,
                "is_active": formik.values.accountStatus,
                "feesScheme": formik.values.feesScheme,
                "Tutionfee": formik.values.Tutionfee,
                "Scholarship": '',
                "reg_Fees": formik.values.reg_Fees,
                "Busfee": formik.values.Busfee,
                "GKB_Amount": formik.values.GKB_Amount,
                "Firstinstallment": formik.values.Firstinstallment,
                "FirstinstallmentDate": formik.values.FirstinstallmentDate,
                "Secondinstallment": formik.values.Secondinstallment,
                "SecondinstallmentDate": formik.values.SecondinstallmentDate,
                "Thirdinstallment": formik.values.Thirdinstallment,
                "ThirdinstallmentDate": formik.values.ThirdinstallmentDate,
                "remark": formik.values.remark
            }
            var config = {
                method: 'post',
                url: allUrls.updateAccountInformation,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                data: UpdateAccountInfoData
            };
            // console.log(config, UpdatePersonalInfoData)

            const response = await axios(config)
            if(response.status === 200) {
                toast.success('Account Information Successfully Updated',{
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if(response.status === 400) {
                toast.warn('Invalid Email',{
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if(response.status === 406) {
                toast.warn('User Not Found',{
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.warn('Internal server error',{
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            // console.log(response.status);

        }
    })





    return (
        <div>
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
            <form onSubmit={formik.handleSubmit}>

                <div className="d-flex my-3 me-3 ms-2" style={{backgroundColor: '#E6E9F4',borderRadius: '8px'}}>
                    <div className="col-6 d-flex my-5">
                        <div >

                            {StudentPhoto.includes('/null') ?
                                <img style={{borderRadius: "50px",height: "100px",width: '100px',marginLeft: '50px',backgroundColor: '#DDDDDD'}} src={AvatarImg} alt="avtar_photo" />
                                :
                                <img style={{borderRadius: "50px",height: "100px",width: '100px',marginLeft: '50px',backgroundColor: '#DDDDDD'}} src={StudentPhoto} alt="avtar_photo" />
                            }

                            {/* <img src={Edit_icon} alt='edit_icon' className='mt-5' style={{marginLeft: "-10px",height: '20px',width: '20px'}} /> */}

                        </div>
                        <div className='ml-3'>

                            <div  style={{color: '#5A607F'}}>
                                <span className='fw-bold' style={{fontSize: '22px'}}>{StudentName}</span>
                                <br />
                                {`${StudentClassName} (${StudentProfileData.accountInfo.joinBatch + '-' + (parseInt(StudentProfileData.accountInfo.joinBatch) + 3)})`}
                            </div>
                            <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                <button style={{backgroundColor: '#ff9707'}} onClick={() => {navigate("feesrecipt");}} className="btn  btn-warning text-light fw-bold" type="submit">Reciept</button>

                                <button style={{color: '#0dcaf0',backgroundColor: '#E6E9F4'}} className="btn btn-outline-info fw-bold" type="submit" onClick={() => {navigate("uploaddocument");}}>Upload Document</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <img src={student_Profile__RocketImg} className='mt-4 ' alt="rocket" />
                        <img src={Edit_icon} onClick={handleOpen} className='mb-1 ' alt="rocket" style={{height: '40px',width: '40px',alignSelf: 'self-end',cursor: 'pointer'}} />
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
                    <Box sx={style}>
                        <UpdateStudentPersonalInfo />
                    </Box>
                </StyledModal>

                <Accordion className="my-2 me-3 ms-2" expanded={true} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{
                            backgroundColor: '#E6E9F4 ',borderBottom: '2px solid orange',maxHeight: "50px",minHeight: "50px"
                        }}
                    >
                        <Typography style={{color: "#414c97",margin: "0px"}}><b> Fees Details</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                        <Typography component={'div'} >
                            {/* Personal Details */}


                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Account status</label>
                                    <select name="accountStatus" value={formik.values.accountStatus} onChange={formik.values.accountStatus} className={formik.touched.accountStatus ? `form-select ${formik.errors.accountStatus ? "invalid" : ""}` : 'form-select'} >
                                        <option value="true">Active</option>
                                        <option value="false">Deactive</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Fees Scheme</label>
                                    <select name="feesScheme" value={formik.values.feesScheme} onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} className={formik.touched.feesScheme ? `form-select ${formik.errors.feesScheme ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">
                                        <option value='none'>None</option>
                                        <option value='fullFees'>Full Fees</option>
                                        <option value='oneShot'>One Shot</option>
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
                                    <label htmlFor="">Course Fees</label>
                                    <input name="Tutionfee" onChange={formik.handleChange} value={formik.values.Tutionfee} type="number" className='form-control' placeholder='Course Fees' />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Sponsorship Type</label>
                                    <select name="sponsorshipType"
                                        value={formik.values.feesScheme !== "none" ? formik.values.sponsorshipType = "none" : formik.values.sponsorshipType}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} className={formik.touched.sponsorshipType ? `form-select ${formik.errors.sponsorshipType ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select" disabled={formik.values.feesScheme === "none" ? false : true} >
                                        <option value='none'>None</option>
                                        <option value='SNS_SVS'>SNS_SVS</option>
                                        <option value='Rewa'>Rewa</option>
                                    </select>
                                    {formik.errors.sponsorshipType && formik.touched.sponsorshipType ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.sponsorshipType}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>


                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Registration Amount</label>
                                    <input name="reg_Fees" onChange={formik.handleChange} value={formik.values.reg_Fees} type="text" className='form-control' placeholder='Registration Amount' disabled />
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

                                <div className=' col'><label htmlFor="">Third Installment</label>
                                    <div className="d-flex">
                                        <input name="Thirdinstallment" onChange={formik.handleChange} value={formik.values.Thirdinstallment} type="number" className='form-control' placeholder='Third Installment' />

                                        {StudentProfileData.accountInfo.ScholarshipAmount > 0 ? <img style={{marginLeft: "-25px"}} src={checkBoxImg} alt="." /> : ''}
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Third Installment date</label>
                                    <input name="ThirdinstallmentDate" onChange={formik.handleChange} value={formik.values.ThirdinstallmentDate} type="date" className='form-control' placeholder='Third Installment date' />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Remark</label>
                                    <input name="remark" onChange={formik.handleChange} value={formik.values.remark} type="text" className='form-control' placeholder='Remark' />
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

                            <div className="d-flex  justify-content-end my-4" >
                                <div className="me-2">

                                    <button className="btn btn-sm btn-primary text-light fw-bold m-1 " style={{width: "250px",height: "40px"}} type="submit"  >Update</button>
                                </div>
                            </div>


                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    )
}

export default StudentProfile
