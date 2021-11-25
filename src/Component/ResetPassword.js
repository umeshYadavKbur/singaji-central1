import React from 'react';
import { useParams } from 'react-router';
import {useMediaQuery} from 'react-responsive';
import './Login.css';
import Loginlogo from './assets/LoginBG2img.svg';
import {useFormik} from 'formik';
import axios from 'axios';
import {baseUrl} from '../url/baseUrl';


function ResetPassword() {

    const {token} = useParams();

    console.log(token)


    // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})

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
            var myHeaders = new Headers();
            myHeaders.append("Content-Type","application/json");

            var raw = JSON.stringify({
                
                "password": formik.values.password
            });
// console.log("match both");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            console.log(requestOptions);
            try {
                const response = await axios.post(`${baseUrl}/api/login`,requestOptions);
                console.log(response);
            } catch(error) {
                console.error(error);
            }
        }
    }
    })
    return (
        <>
            <div className="loginDivFirst">

                <div className="loginDiv">
                    <div className="containertwo" style={{display: isTabletOrMobile ? 'none' : "flex"}} >
                        {!isTabletOrMobile && <img id="img" src={Loginlogo} alt="this is left logo" />}
                    </div>
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
                </div>

            </div>
        </>
    )
}

export default ResetPassword
