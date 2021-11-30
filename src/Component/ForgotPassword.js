import React from 'react';
import {Redirect} from 'react-router';
// import {useMediaQuery} from 'react-responsive';
import logo from './assets/logo.png'
import {useFormik} from 'formik';
import axios from 'axios';
import {baseUrl} from '../url/baseUrl';
// import Toaster from './Toaster';

function ForgotPassword() {



    const formik = useFormik({
        initialValues: {
            email: ''
        },validate: values => {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
            let errors = {};
            if(!values.email) {
                errors.email = 'Required!'
            } else if(!regex.test(values.email)) {
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
            if(result.status === 200) {
                alert("mail send successfull")
                return <Redirect to='/login' />

            }
            if(result.status === 406) {

            }




        }
    })


    // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
    // const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})

    return (
        <>
            <div style={{height: "100vh",width: "100vw",background: "#f3eded"}}>
                <div className="position-absolute top-50 start-50 translate-middle " style={{width: '100%',maxWidth: "420px",padding: "25px 45px 45px 45px",margin: "auto",background: "white",borderRadius: "10px"}}>
                    <form >
                        <div className="d-flex justify-content-center">

                            <img className="mb-2 " src={logo} alt width={100} height={82} style={{alignItems: "center",borderRadius: "40px"}} /> <br /> 
                             </div>
                             <div className="d-flex justify-content-center">
                            <h5 className="h3 mb-3 fw-normal" style={{fontWeight: "bold"}}>Enter your Email</h5>
                      </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Email" />

                        </div>
                        <button style={{color: "white",fontWeight: "500"}} className="w-100 btn btn-md btn-warning" type="submit">Get link</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default ForgotPassword;
