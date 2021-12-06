import React from 'react'
import Singaji_logo from '../assests/image/Singaji_logo.svg'
import {useFormik} from 'formik';


function CreateNewAdmin() {

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            role: ''
        },validate: values => {

            let errors = {};
            if(!values.role) {
                errors.role = 'Required!'
            }
            if(!values.name) {
                errors.name = 'Required!'
            }
            if(!values.email) {
                errors.email = 'Required!'
            } else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email))) {
                errors.email = 'Invalid email format!'
            }
            return errors;
        },onSubmit: (values) => {
            console.log(values);

        }
    })


    return (
        <>
            <div style={{height: "100vh",width: "100vw",background: "#f3eded"}}>
                <div className="position-absolute top-50 start-50 translate-middle " style={{width: '100%',maxWidth: "400px",padding: "25px 45px 45px 45px",margin: "auto",background: "white",borderRadius: "10px"}}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-center">

                            <img src={Singaji_logo} alt="logo ssism" width={100} height={82} style={{alignItems: "center",borderRadius: "40px"}} /> <br />
                        </div>

                        <div className="mb-3">
                            <input value={formik.values.email} onChange={formik.handleChange} name="email" type="text" className="form-control mb-2" placeholder="Email" />
                            {formik.errors.email && <div className="error">{formik.errors.email}</div>}
                            <input value={formik.values.name} onChange={formik.handleChange} name="name" type="text" className="form-control mb-2" placeholder="Name" />
                            {formik.errors.name && <div className="error">{formik.errors.name}</div>}
                            <select name="role" onChange={formik.handleChange} value={formik.values.role} class="form-select" id="inputGroupSelect02">
                                <option selected>Role</option>
                                <option value="1">Super Admin</option>
                                <option value="2">Admin</option>
                                <option value="3">Student</option>
                            </select>
                            {formik.errors.role && <div className="error">{formik.errors.role}</div>}

                        </div>

                        <button style={{color: "white",fontWeight: "500"}} className="w-100 btn btn-md btn-warning" type="submit">Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateNewAdmin
