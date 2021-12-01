import React from 'react';
import {Redirect} from 'react-router';
import { useHistory } from 'react-router';
// import {useMediaQuery} from 'react-responsive';
import {useState} from 'react';
import './login.css'
import Singaji_logo from './assets/Singaji_logo.svg'
import {useFormik} from 'formik';
import axios from 'axios';
import {baseUrl} from '../url/baseUrl';
// import Toaster from './Toaster';

function ForgotPassword() {
const history=useHistory()

    const [reserror,setReserror] = useState("");

    const formik = useFormik({
        initialValues: {
            email: ''
        },validate: values => {
            // prettier-disable
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
                console.log(result.statusText);
                return <Redirect to='/login' />

            }
            if(result.status === 404) {
                setReserror("User not found");
                // console.log("ok");
                return alert("user not found")
            }

            console.log(reserror);

        }
    })


    // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
    // const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})

    return (
        <>
            <div style={{height: "100vh",width: "100vw",background: "#f3eded"}}>
                <div className="position-absolute top-50 start-50 translate-middle m-auto bg-light px-5 pt-2 pb-5 shadow rounded-5" style={{width: '100%',maxWidth: "400px"}}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-center">

                            <img  onClick={()=>{history.push('/login')}} src={Singaji_logo} alt="logo ssism" width={100} height={82} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <h4 className="h4 mb-3 fw-bold" >Enter your E-mail</h4>
                        </div>
                        <div className="mb-3">

                            <input value={formik.values.email} onChange={formik.handleChange} name="email" type="text" className="form-control" placeholder="Email" />
                            {formik.errors.email && <div className="error">{formik.errors.email}</div>}
                            {reserror && <div>{reserror}</div>}

                        </div>
                        <button className="w-100 btn btn-md btn-warning fw-bold text-light" type="submit">Get Link</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default ForgotPassword;
