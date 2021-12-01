import React from 'react';
import { useParams } from 'react-router';
// import {useMediaQuery} from 'react-responsive';
import './login.css'
import logo from './assets/logo.png'
import Singaji_logo from './assets/Singaji_logo.svg'

import {useFormik} from 'formik';
import axios from 'axios';
import {baseUrl} from '../url/baseUrl';
import { useHistory } from 'react-router';

function ResetPassword() {

    let history = useHistory();
    const {token} = useParams();

    console.log(token)


    // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
    // const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})

    const formik = useFormik({
        initialValues: {
            confirm: '',
            password: ''
        },validate: values => {
            let errors = {};
            if(!values.password) {
                errors.password = 'Required!'
            }
            if(!values.confirm) {
                errors.confirm = 'Required!'
            }
           else if(values.confirm !== values.password)
            {
                errors.confirm = 'Confirm Password Not Match'
            }
            return errors;
        },
        onSubmit: async (values) => {
            console.log(values);
            if(formik.values.password === formik.values.confirm){
            var data = JSON.stringify({
                "password": formik.values.password
            });

            var config = {
                method: 'post',
                url: `${baseUrl}/api/resetPasswordLink/${token}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)      
                const response = await axios(config);
                console.log(response);
                if(response.status === 200)
                {

                    return history.push("/login")
                }
    }
}
    })
    return (
        <>
            <div style={{height: "100vh",width: "100vw",background: "#f3eded"}}>
                <div className="position-absolute top-50 start-50 translate-middle " style={{width: '100%',maxWidth: "400px",padding: "25px 45px 45px 45px",margin: "auto",background: "white",borderRadius: "10px"}}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-center">

                            <img onClick={() => {history.push('/login')}} className="mb-2 cursor-pointer " src={Singaji_logo} alt="logo ssism" width={100} height={82} style={{alignItems: "center",borderRadius: "40px"}} /> <br />
                        </div>
                        <div className="d-flex justify-content-center">
                            <h4 className="h4 mb-3 fw-bold" >Enter New Password</h4>
                        </div>
                        <div className="mb-3">
                            <input value={formik.values.password} onChange={formik.handleChange} name="password" type="text" className="form-control mb-2" placeholder="Password" />
                            {formik.errors.password && <div className="error">{formik.errors.password}</div>}
                            <input value={formik.values.confirm} onChange={formik.handleChange} name="confirm" type="text" className="form-control" placeholder="Confirm Password" />
                            {formik.errors.confirm && <div className="error">{formik.errors.confirm}</div>}

                        </div>
                        <button style={{color: "white",fontWeight: "500"}} className="w-100 btn btn-md btn-warning" type="submit">Submit</button>
                    </form>
                </div>
            </div>

                {/* <div className="loginDiv">
                    <div className="containertwo" style={{display: isTabletOrMobile ? 'none' : "flex"}} >
                        {/* {!isTabletOrMobile && <img id="img" src={Loginlogo} alt="this is left logo" />} */}
                    {/* </div>
                    <div className="containertwo" >
                        <form onSubmit={formik.handleSubmit} id="ForgotPassformContainer" ><h6 id="forgothadline" style={{color: "dark-gray"}}>Create Your New Password</h6>

                            <div className="mb-3" style={{width: "auto"}}>
                                <input name="password" value={formik.values.password} onChange={formik.handleChange} id="inputLablesize" type="text" className="form-control rounded-pill" placeholder="Password" />
                                {formik.errors.password && <div className="error">{formik.errors.password}</div>}

                            </div>
                            <div className="mb-3" style={{width: "auto"}}>
                                <input name="confirm" value={formik.values.confirm} onChange={formik.handleChange} id="inputLablesize" type="text" className="form-control rounded-pill" placeholder="Confirm Password" />
                                {formik.errors.confirm && <div className="error">{formik.errors.confirm}</div>}

                            </div>

                                <div className="d-grid col-9 mx-auto">
                                    <button id="btn" className=" btn btn-dark btn-lg rounded-pill" type="submit">submit</button>
                                </div>

                        </form>
                    </div>
                </div>  */}

        </>
    )
}

export default ResetPassword
