import React from 'react';
import { Redirect } from 'react-router';
import {useMediaQuery} from 'react-responsive';
import './ForgotPassword.css';
import Loginlogo from './assets/LoginBG2img.svg';
import {useFormik} from 'formik';
import axios from 'axios';
import {baseUrl} from '../url/baseUrl';
// import Toaster from './Toaster';

function ForgotPassword() {

   

    const formik = useFormik({
        initialValues: {
            email: ''
        },validate: values => {
            let errors = {};
            if(!values.email) {
                errors.email = 'Required!'
            } else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email))) {
                errors.email = 'Invalid email format!'
            }
            return errors;
        },
        onSubmit: async (values) => {
            console.log(values);
            // console.log(requestOptions);
            var data = JSON.stringify({
                "email": formik.values.email
            });

            var config = {
                method: 'post',
                url: `${baseUrl}/api/resetPasswordEmail`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const result = await axios(config);
            console.log(result)
            if(result.status === 200)
            {
                alert("mail send successfull")
               return <Redirect to='/login'  />
                           
            }
            if(result.status === 406){

            }
            
            // try {
            //     const response = await axios.post(`${baseUrl}/api/login`,requestOptions);
            //     console.log(response);
            // } catch(error) {
            //     console.error(error);
            // }


        }
    })


    // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})

    return (
        <>
            <div className="loginDivFirst">

                <div className="loginDiv">
                    <div className="containertwo" style={{display: isTabletOrMobile ? 'none' : "flex"}} >
                        {!isTabletOrMobile && <img id="img" src={Loginlogo} alt="this is left logo" />}
                    </div>
                    <div className="containertwo" >
                        <form onSubmit={formik.handleSubmit} id="ForgotPassformContainer" ><h6 id="forgothadline" style={{color: "dark-gray"}}>Enter your Email and Get Link for Reset password</h6>

                            <div className="mb-3" style={{width: "auto"}}>
                                <input name="email" value={formik.values.email} onChange={formik.handleChange} id="inputLablesize" type="email" className="form-control rounded-pill" placeholder="Email" />
                                {formik.errors.email && <div className="error">{formik.errors.email}</div>}

                            </div>

                            <div className="d-grid col-9 mx-auto">
                                <button id="btn" className=" btn btn-dark btn-lg rounded-pill" type="submit">Get Link</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
            
        </>

    )
}

export default ForgotPassword;
