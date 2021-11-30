import React from 'react';
// import {useMediaQuery} from 'react-responsive';
import {useFormik} from 'formik';
// import {Link} from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../url/baseUrl';


function Login() {

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
                           
        }
    })
   

    // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
    // const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'})


    return (
        <>
                       
        </>

    )
}

export default Login;
