import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AddNewStudent.css'
import {useFormik} from 'formik';


function FeesRecipt() {

    const initialValues = {
        payBy:'Case',
        studentName:'',
        studentClassYear:'I',
        contactNumber:'',
        FatherName:'',
        waiveOff:'',
        chequeDate:'',
        ChequeNo:'',
        feesAmount:'',
        recieptdate:'',
        installmentNo:'1',
        Remark:'',
        LateFeeAmount:'',
        BankName:'',

        
    }

    const formik = useFormik({
        initialValues,
        onSubmit:(values)=>{
            console.log(values);

            var data = {
                "stdId": "353c55ed-1e67-48a3-9ed2-fa1dfaecec73",
                "year": formik.values.studentClassYear,
                "ReceivedAmount": formik.values.feesAmount,
                "LateFeeAmount": formik.values.LateFeeAmount,
                "waiveOf": formik.values.waiveOff,
                "InstallmentNo": formik.values.installmentNo,
                "ReceivedType": formik.values.payBy,
                "ChequeNo": formik.values.ChequeNo,
                "ChequeDate": formik.values.chequeDate,
                "BankName": formik.values.BankName,
                "Remark": formik.values.Remark
            }
        }
    })

const [expanded,setExpanded] = React.useState({
    panel1: true
});

const handleChange = (id) => () => {
    // console.log(expanded)
    setExpanded((pre) => {
        return {
            ...pre,
            [id]: !expanded[id]
        }

    });
};

const data = localStorage.getItem('userEdit')
const StudentAccountData = JSON.parse(data)
// console.log('StudentAccountData ::',StudentAccountData)
var StudentName = StudentAccountData.accountInfo.firstName + ' ' + StudentAccountData.accountInfo.lastName
var StudentClassName = StudentAccountData.accountInfo.branch
// console.log((StudentAccountData.pendingFee).length);

var totalFeesAmount = 0;
var totalpendingFees = 0;
var totalReceivedFees = 0;


(StudentAccountData.pendingFee).forEach((ele) => {

    totalFeesAmount = totalFeesAmount + parseInt(ele.FeesAmount)
    totalReceivedFees = totalReceivedFees + parseInt(ele.ReceivedFees)
    totalpendingFees = totalpendingFees + parseInt(ele.PendingFees)

})


// console.log('total fees::',totalFeesAmount,'totalReceivedFees',totalReceivedFees,'totalpendingFees',totalpendingFees);


// console.log(totalFeesAmount);
return (
    <>
        <div className=" p-3 m-2 me-3" style={{backgroundColor: 'white',borderRadius: '8px'}}>

<form onSubmit={formik.handleSubmit}>

            <div className="row">
                <div className="col">
                    <label htmlFor="">Student Name</label>
                    <input name='studentName' onChange={formik.handleChange} value={formik.values.studentName} type="text" className='form-control' placeholder='Student Name' />
                </div>
                <div className="col">
                    <label htmlFor="">Father Name</label>
                    <input name='FatherName' onChange={formik.handleChange} value={formik.values.FatherName} type="text" className='form-control' placeholder='Father Name' />
                </div>
                <div className="col">
                    <label htmlFor="">Year</label>
                    <select name='studentClassYear' onChange={formik.handleChange} value={formik.values.studentClassYear}   className='form-select'  >
                        <option defaultValue="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                     </select>
                </div>
                <div className="col">
                    <label htmlFor="">Contact Number</label>
                    <input name='contactNumber' onChange={formik.handleChange} value={formik.values.contactNumber} type="number" className='form-control' placeholder='Contact Number' />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="">Date</label>
                    <input name='recieptdate' onChange={formik.handleChange} value={formik.values.recieptdate} type="date" className='form-control' placeholder='Date' />
                </div>
                <div className="col">
                    <label htmlFor="">Installment No.</label>
                    <select name='installmentNo' onChange={formik.handleChange} value={formik.values.installmentNo} className='form-select' >
                        <option defaultValue="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="Postmatric">Postmatric ScolarShip</option>
                        <option value="GKB">GKB ScolarShip</option>
                     </select>
                </div>
                <div className="col">
                    <label htmlFor="">Pay By</label>
                    <select name="payBy" onChange={formik.handleChange} value={formik.values.payBy} className='form-select'>
                        <option defaultValue="Case">Case</option>
                        <option value="Online">Online</option>
                        <option value="Cheque">Cheque</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="">Amount</label>
                    <input name='feesAmount' onChange={formik.handleChange} value={formik.values.feesAmount} type="number" className='form-control' placeholder='Amount' />
                </div>

            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="">Cheque No.</label>
                    <input name='ChequeNo' onChange={formik.handleChange} value={formik.values.ChequeNo} type="text" className='form-control' placeholder='Cheque No' />
                </div>
                <div className="col">
                    <label htmlFor="">Cheque Date</label>
                    <input name='chequeDate' onChange={formik.handleChange} value={formik.values.chequeDate} type="date" className='form-control' placeholder='Late fees' />
                </div>
                <div className="col">
                    <label htmlFor="">Waive off</label>
                    <input name='waiveOff' onChange={formik.handleChange} value={formik.values.waiveOff} type="number" className='form-control' placeholder='Waive off' />
                </div>
                <div className="col">
                    <label htmlFor="">Remark</label>
                    <input name='Remark' onChange={formik.handleChange} value={formik.values.Remark} type="text" className='form-control' />
                </div>
            </div>

            <div className="row mt-3 ">
                <div className='col-9'>
                </div>

                <div className=' col-3 d-flex justify-content-end'>

                    <button className="btn btn-md btn-warning text-light fw-bold  " style={{width: "200px"}} type="submit">Generate Receipt</button>
                </div>

            </div>

            </form>
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
                <Typography style={{color: "#414c97",margin: "0px"}}><b> Pending Fees Status</b></Typography>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                <Typography component={'div'} >
                    {/* Personal Details */}

                    <div className="row m-1 my-2 p-1 pt-2" style={{backgroundColor: 'white'}}>
                        <div className="d-flex col justify-content-center">
                            <label htmlFor="">Year</label>
                        </div>
                        <div className="d-flex col justify-content-center">
                            <label htmlFor="">Fees Ammount</label>
                        </div>
                        <div className="d-flex col justify-content-center">
                            <label htmlFor="">Recieved Fee</label>
                        </div>
                        <div className="d-flex col justify-content-center">
                            <label htmlFor="">Pending Fee</label>
                        </div>

                    </div>
                    {StudentAccountData.pendingFee.map(pendingFee => (

                        <div className="row m-1 my-2 p-1 pt-2" style={{backgroundColor: 'white'}}>



                            <div className="d-flex col justify-content-center">
                                <label htmlFor="">{pendingFee.year === 'I' ? 'First Year' : pendingFee.year === 'II' ? 'Second Year' : 'Third Year'}</label>
                            </div>
                            <div className="d-flex col justify-content-center">
                                <label htmlFor="">{pendingFee.FeesAmount}</label>
                            </div>
                            <div className="d-flex col justify-content-center">
                                <label htmlFor="">{pendingFee.ReceivedFees}</label>
                            </div>
                            <div className="d-flex col justify-content-center">
                                <label htmlFor="">{pendingFee.PendingFees}</label>
                            </div>
                        </div>
                    ))}



                    <div className="row m-1 my-2 p-1 pt-2 " style={{backgroundColor: '#dadadb '}}>
                        <div className="d-flex col justify-content-center">
                            <label htmlFor="">Total</label>
                        </div>
                        <div className="d-flex col justify-content-center">
                            <label htmlFor="">{totalFeesAmount}</label>
                        </div>
                        <div className="d-flex col justify-content-center">
                            <label htmlFor="">{totalReceivedFees}</label>
                        </div>
                        <div className="d-flex col justify-content-center">
                            <label htmlFor="">{totalpendingFees} </label>
                        </div>
                    </div>





                </Typography>
            </AccordionDetails>
        </Accordion>


        <Accordion className="my-2 me-3 ms-2 mb-5" expanded={expanded.panel1 === true} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{
                    backgroundColor: '#E6E9F4 ',borderBottom: '2px solid orange',maxHeight: "50px",minHeight: "50px"
                }}
            >
                <Typography style={{color: "#414c97",margin: "0px"}}><b>Fees Receipt History</b></Typography>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                <Typography component={'div'} >
                    <div className='d-flex '>
                        <div className="row m-1 ">
                            {StudentAccountData.recieptData.map(StudentAccountData => (
                                <div className='col-3 my-3 mx-5 shadow'>

                                    <div className='row p-1' style={{fontSize: '12px',backgroundColor: 'rgb(255 135 0)',color: 'white',borderRadius: '5px 5px  0 0 '}}>Sant Singaji Institude Of Science & Managment</div>

                                    <div className="row p-1" style={{backgroundColor: 'orange'}}>
                                        <div className="col">
                                            <p className='p-1 m-0' style={{fontSize: '14px',color: 'white'}}>
                                                <span style={{fontSize: '11px'}}>Reciept for</span>
                                                <br />
                                                {StudentName}
                                            </p>
                                        </div>
                                        <div className="d-flex col justify-content-end">
                                            <p className='p-1' style={{fontSize: '14px',color: 'white'}}>{StudentAccountData.AccountsReceiptNo}</p>
                                        </div>
                                    </div>


                                    <div className="row p-1" style={{backgroundColor: 'white'}}>
                                        <div className="row">
                                            <div className="col">
                                                <p className='p-1 m-0' style={{fontSize: '15px',color: '#656A87'}}>
                                                    <span style={{fontSize: '13px'}}>Date</span>
                                                    <br />
                                                    {StudentAccountData.AccountsReceiptDate}
                                                </p>
                                            </div>
                                            <div className="d-flex col justify-content-end ">
                                                <p className='p-1 m-0 ms-2 ' style={{fontSize: '15px',color: '#656A87'}}>
                                                    <span style={{fontSize: '13px'}}>Class</span> <br />
                                                    {StudentClassName + '-' + StudentAccountData.year}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <p className='p-1 m-0' style={{fontSize: '15px',color: '#656A87'}}>
                                                    <span style={{fontSize: '13px'}}>Pay by</span> <br />
                                                    {StudentAccountData.ReceivedType}
                                                </p>
                                            </div>
                                            <div className="d-flex col justify-content-end ">
                                                <p className='p-1 m-0' style={{fontSize: '15px',color: '#656A87'}}>
                                                    <span style={{fontSize: '13px'}}>Waive off</span> <br />
                                                    ₹ {StudentAccountData.waiveOf}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col m-2" style={{backgroundColor: '#6b79cd',borderRadius: '5px'}}>
                                            <p className='p-1 m-0' style={{fontSize: '15px',color: 'white'}}>

                                                ₹ {StudentAccountData.ReceivedAmount}  <br />
                                                <span style={{fontSize: '12px'}}>Inst.{StudentAccountData.InstallmentNo}</span>
                                            </p>
                                        </div>
                                    </div>


                                </div>
                            ))}

                        </div>
                    </div>

                </Typography>
            </AccordionDetails>
        </Accordion>
    </>
)
}

export default FeesRecipt
