import React from 'react';
import {useMediaQuery} from 'react-responsive';
import './Login.css';
import Loginlogo from './assets/LoginBG2img.svg';
// import clglogo from './assets/colleglogo.png';
import {useFormik} from 'formik';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../url/baseUrl';


function Login() {


        // const os = 'Windows'; // add your OS values
       
    // getOs();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },validate: values => {
            
            let errors = {};
            if(!values.password) {
                errors.password = 'Required!'
            }
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
                "email": formik.values.email,
                "password": formik.values.password
            });

            var config = {
                method: 'post',
                url: `${baseUrl}/api/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
          const result = await  axios(config);
          console.log(result)
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
                        <form  id="formContainer" onSubmit={formik.handleSubmit} ><h2 id="hadline" style={{color: "dark-gray"}}>Login</h2>

                            <div>
                                <div className="linespace" >
                                    <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} className="form-control rounded-pill exampleInput" id=" exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Email" />
                                    {formik.errors.email && <div className="error">{formik.errors.email}</div>}

                                </div>
                                <div className=" linespace">
                                    <input type="password" value={formik.values.password} onChange={formik.handleChange} className="form-control rounded-pill exampleInput" id=" exampleInputPassword1" placeholder=" Password" name="password" />
                                    {formik.errors.password && <div className="error">{formik.errors.password}</div>}

                                </div>
                            </div>

                            <Link to='./ForgotPassword' style={{float: "right",textDecoration: "none",cursor: "pointer"}} id="forgotPass">Forgot Password</Link>
                            <div className="d-grid col-9 mx-auto">
                                <button id="btn" className=" btn btn-dark btn-lg rounded-pill" type="submit">Login</button>
                                <button id="btn" style={{border: "2px solid gray",color: "gray"}} className=" btn btn-light btn-lg rounded-pill" type="button">Register</button>
                            </div>

                        </form>
         

                    </div>
                </div>

            </div>







            {/* <div className="loginDivFirst">

                <div className=" loginDiv " >
                    
                        <div className="col containertwo" id="LoginFormSideImg"   >
                            <img style={{width: "15pc",height: "15pc",float: "left"}} src={Loginlogo} alt="this is left logo" />
                        </div>
                        <div className="col containertwo" id="LoginForm" >
                            <form  ><h2 style={{color: "dark-gray"}}>Login</h2>
                               
                                <div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control rounded-pill" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder=" Email" />
                                    </div>
                                    <div className=" mb-1">
                                        <input type="password" className="form-control rounded-pill" id="exampleInputPassword1" placeholder=" Password" />
                                    </div>
                                </div>

                                <label style={{float: "right"}} className="m-3">Forgot Password</label>
                                <div className="d-grid gap-2 col-9 mx-auto">
                                    <button className="btn btn-dark btn-lg rounded-pill" type="button">Login</button>
                                    <button style={{border: "3px solid gray",color:"gray"}} className="btn btn-light btn-lg rounded-pill" type="button">Register</button>
                                </div>

                            </form>
                        </div>
                    </div>

            </div> */}
        </>

    )
}

export default Login;
