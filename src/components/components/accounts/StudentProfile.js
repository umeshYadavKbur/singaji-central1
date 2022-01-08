import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Edit_icon from '../../assests/image/Edit_icon.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AddNewStudent.css'
import {useNavigate} from 'react-router-dom';
import student_Profile__RocketImg from '../../assests/image/AccountIcons/studentProfileRocketImg.svg'



function StudentProfile() {
    const navigate = useNavigate()

    const data = localStorage.getItem('userEdit')
    const StudentProfileData = JSON.parse(data)

    console.log(StudentProfileData);

    var StudentName = StudentProfileData.accountInfo.firstName + ' ' + StudentProfileData.accountInfo.lastName
    var StudentClassName = (StudentProfileData.accountInfo.branch).toUpperCase()
    var StudentPhoto = StudentProfileData.accountInfo.photo

    return (
        <div>


            <div className="row my-3 me-3 ms-2" style={{backgroundColor: '#DDDDDD',borderRadius: '8px'}}>
                <div className="col-3 my-5">
                    {StudentPhoto === ' ' ? <img style={{borderRadius: "50px",height: "100px",width: '100px',marginLeft: '50px',backgroundColor: '#DDDDDD'}} src="https://ssism.s3.us-east-2.amazonaws.com/avtar.jpg" alt="avtar_photo" /> : <img style={{borderRadius: "50px",height: "100px",width: '100px',marginLeft: '50px',backgroundColor: '#DDDDDD'}} src={StudentPhoto} alt="avtar_photo" />
                 }

                    <img src={Edit_icon} alt='edit_icon' className='mt-5' style={{marginLeft: "-10px",height: '20px',width: '20px'}} />

                </div>
                <div className="col-3">
                    <div className='mt-3' style={{color: '#5A607F'}}>
                        <span className='fw-bold' style={{fontSize: '22px'}}>{StudentName}</span>
                        <br />
                        {StudentClassName + '  ' + `(${StudentProfileData.accountInfo.joinBatch + '-' + (parseInt(StudentProfileData.accountInfo.joinBatch) + 3)})`}
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => {navigate("feesrecipt");}} className="btn  btn-warning text-light fw-bold" type="submit">Reciept</button>

                        <button className="btn btn-outline-info fw-bold" type="submit" onClick={() => {navigate("uploaddocument");}}>Upload Document</button>
                    </div>
                </div>
                <div className="col-6 d-flex justify-content-end">
                <img src={student_Profile__RocketImg} className='mt-4 ' alt="rocket"  />
                    <img src={Edit_icon} className='mb-1 ' alt="rocket" style={{height: '40px',width: '40px',alignSelf:'self-end'}} />
                    {/* <img src={Edit_icon} alt='edit_icon'  /> */}
                </div>
            </div>



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
                                <input type="text" className='form-control' placeholder='Account status' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Fees Scheme</label>
                                <input type="text" className='form-control' placeholder='Fees Scheme' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Course Fees</label>
                                <input type="number" className='form-control' placeholder='Course Fees' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Scolarship Type</label>
                                <input type="number" className='form-control' placeholder='Father contact' />
                            </div>
                        </div>


                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Registration Amount</label>
                                <input type="text" className='form-control' placeholder='Registration Amount' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Registration Number</label>
                                <input type="text" className='form-control' placeholder='Registration number ' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Bus Fees</label>
                                <input type="number" className='form-control' placeholder='Bus Fees' />
                            </div>
                            <div className="col">
                                <label htmlFor="">GKB Amount</label>
                                <input type="number" className='form-control' placeholder='Father contact' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="">First Installment</label>
                                <input type="number" className='form-control' placeholder='First Installment' />
                            </div>
                            <div className="col">
                                <label htmlFor="">First Installment date</label>
                                <input type="date" className='form-control' placeholder='First Installment date' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Second Installment</label>
                                <input type="number" className='form-control' placeholder='Second Installment' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Second Installment date</label>
                                <input type="date" className='form-control' placeholder='Second Installment date' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Third Installment</label>
                                <input type="number" className='form-control' placeholder='Third Installment' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Third Installment date</label>
                                <input type="date" className='form-control' placeholder='Third Installment date' />
                            </div>
                            <div className="col">
                                <label htmlFor="">Remark</label>
                                <input type="number" className='form-control' placeholder='Remark' />
                            </div>
                            <div className="col-3  my-4 p-1 ps-2">
                                <div>
                                    <button className="btn btn-sm btn-primary text-light fw-bold m-1 " style={{width: "250px",height: "40px"}} type="submit">Update</button></div>
                            </div>
                        </div>

                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default StudentProfile
