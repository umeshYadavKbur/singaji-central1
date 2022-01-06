import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Edit_icon from '../../assests/image/Edit_icon.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AddNewStudent.css'
import { useNavigate } from 'react-router-dom';

function StudentProfile() {
    const navigate = useNavigate()
    return (
        <div>
            <Accordion className="my-2 me-3 ms-2" expanded='true' >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{
                        backgroundColor: '#E6E9F4 ',borderBottom: '2px solid orange',maxHeight: "50px",minHeight: "50px"
                    }}
                >
                    <Typography style={{color: "#414c97",margin: "0px"}}><b> Personal Details</b></Typography>
                </AccordionSummary>
                <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                    <Typography component={'div'} >
                        {/* Personal Details */}

                     <div className="row">
                         <div className="col-3 ">
                                <img style={{borderRadius:"50px",height:"100px",width:'100px',marginLeft:'50px'}} src="https://ssism.s3.us-east-2.amazonaws.com/avtar.jpg" alt="avtar_photo" /><img src={Edit_icon} alt='edit_icon'className='mt-5' style={{marginLeft:"-11px"}} />

                                <button className="btn btn-sm btn-warning text-light fw-bold m-1 " style={{width: "200px"}} type="submit" onClick={() => {navigate("uploaddocument");}}>Upload Document</button>

                                <button onClick={() => {navigate("feesrecipt");}} className="btn btn-sm btn-warning text-light fw-bold m-1 " style={{width: "200px"}} type="submit">Reciept</button>
                         </div>
                         <div className="col-9">
                             <div className="row">
                                 <div className="col">
                                     <label htmlFor="">Student Name</label>
                                        <input type="text" className='form-control' placeholder='Student Name'/>
                                 </div>
                                 <div className="col">
                                     <label htmlFor="">Father Name</label>
                                        <input type="text" className='form-control' placeholder='Father Name'/>
                                 </div>
                                 <div className="col">
                                     <label htmlFor="">Father contact</label>
                                        <input type="number" className='form-control' placeholder='Father contact'/>
                                 </div>
                             </div>
                             <div className="row">
                                 <div className="col">
                                     <label htmlFor="">Student contact</label>
                                     <input type="text" className='form-control'placeholder='Student contact'/>
                                 </div>
                                 <div className="col">
                                     <label htmlFor="">DOB</label>
                                     <input type="date" className='form-control'placeholder='Student DOB'/>
                                 </div>
                                 <div className="col">
                                     <label htmlFor="">Village</label>
                                     <input type="text" className='form-control'placeholder='Village'/>
                                 </div>
                             </div>
                             <div className="row">
                                 <div className="col">
                                     <label htmlFor="">Class</label>
                                     <input type="text" className='form-control'placeholder='class'/>
                                 </div>
                                 <div className="col">
                                     <label htmlFor="">Enrollment Number</label>
                                        <input type="text" className='form-control' placeholder='Enrollment Number'/>
                                 </div>
                                 <div className="col">
                                     <label htmlFor="">Aadhar Number</label>
                                        <input type="text" className='form-control' placeholder='Aadhar Number'/>
                                 </div>
                             </div>
                         </div>
                     </div>

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="my-2 me-3 ms-2" expanded={true} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{
                        backgroundColor: '#E6E9F4 ',borderBottom: '2px solid orange',maxHeight: "50px",minHeight: "50px"
                    }}
                >
                    <Typography style={{color: "#414c97",margin: "0px"}}><b> Personal Details</b></Typography>
                </AccordionSummary>
                <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                    <Typography component={'div'} >
                        {/* Personal Details */}

                     <div className="row">
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
                  </div>
                     <div className="row">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Registration Amount</label>
                                    <input type="text" className='form-control' placeholder='Registration Amount' />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Registration Number</label>
                                    <input type="text" className='form-control' placeholder='Registration number '/>
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
                            <div className="col my-4 p-1">
                                <button className="btn btn-sm btn-primary text-light fw-bold m-1 " style={{width: "250px",height:"40px"}} type="submit">Update</button>
                            </div>
                        </div>

                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default StudentProfile
