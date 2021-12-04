import React from 'react';
import { useParams } from 'react-router';
// import {useMediaQuery} from 'react-responsive';
// import './login.css'
// import logo from './assets/logo.png'
import Singaji_logo from '../assests/image/Singaji_logo.svg'
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {history} from '../../helpers/history'
import { newPasswordRequest } from '../../redux/actionDispatcher/newPassDispatcher';


function ResetPassword() {


    const { token  } = useParams();
    // const token = "920a7eb54472fded897ac4be2"

    console.log(token)


    // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
    // const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})

    const formik = useFormik({
        initialValues: {
            confirm: '',
            password: ''
        }, validate: values => {
            let errors = {};
            if (!values.password) {
                errors.password = 'Required!'
            }
            if (!values.confirm) {
                errors.confirm = 'Required!'
            }
            else if (values.confirm !== values.password) {
                errors.confirm = 'Confirm Password Not Match'
            }
            return errors;
        },
        onSubmit: async (values) => {
            console.log(values);
            if (formik.values.password === formik.values.confirm) {
                var data = {
                    password: formik.values.password,
                    token:token
                }
                newPasswordRequest(data)
        }
    }
    })
    return (
        <>
            <div style={{ height: "100vh", width: "100vw", background: "#f3eded" }}>
                <div className="position-absolute top-50 start-50 translate-middle " style={{ width: '100%', maxWidth: "400px", padding: "25px 45px 45px 45px", margin: "auto", background: "white", borderRadius: "10px" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-center">

                            <img onClick={() => { history.push('/login') }} className="mb-2 cursor-pointer " src={Singaji_logo} alt="logo ssism" width={100} height={82} style={{ alignItems: "center", borderRadius: "40px" }} /> <br />
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
                        <button style={{ color: "white", fontWeight: "500" }} className="w-100 btn btn-md btn-warning" type="submit">Submit</button>
                    </form>
                </div>
            </div>

           
        </>
    )
}



//Getting the state from the store
const mapStateToProps = state => {
    return {
  newPass:state.newPass
    }
  }
  
  //passing the userData in fetchUsers function and also dispatch method
  const mapDispatchToProps = dispatch => {
    return {
        newPasswordRequest: (data) => dispatch(newPasswordRequest(data))
    }
  }
  
  
  //Connecting the component to our store
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPassword)