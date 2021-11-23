import React from 'react';

import './Login.css';
import Loginlogo from './assets/LoginBG2img.svg'
function Login() {
    return (
        <>
            <div className="loginDivFirst">

                <div className="container loginDiv " >
                    <div class="row">
                        <div className="col containertwo" id="LoginFormSideImg"   >
                            {/* <h1 style={{width: "100%",height: "100%",backgroundColor: "red"}}>harsh how are you and what are you doing</h1> */}
                            <img style={{width: "15pc",height: "15pc",float: "left"}} src={Loginlogo} alt="this is left logo" />
                        </div>
                        <div className="col containertwo" id="LoginForm" >
                            <form  ><h2 style={{color: "dark-gray"}}>Login</h2>
                                {/* <div className="form-floating mb-4 ">


                                <input type="email" className="form-control rounded-pill" id="floatingInput" placeholder="name@example.com" />
                                <label className="loginLableColor" htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control rounded-pill" id="floatingPassword" placeholder="Password" />
                                <label className="loginLableColor" htmlFor="floatingPassword">Password</label>
                            </div> */}
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
                    </div></div>

            </div>
        </>

    )
}

export default Login;
