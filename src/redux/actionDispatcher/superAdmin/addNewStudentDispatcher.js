import { ADD_STUDENT_FAIL, ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS } from "../../constants/actions";
// import getData from "../services/agent";
// import getData from '../../../services/agent'
// import swal from "sweetalert";
import Swal from 'sweetalert2'
import AllUrl from "../../constants/url";
import axios from "axios";

const AddNewStudent = (data) => {
    var dataOfAddStudent = {
        method: 'post',
        url: AllUrl.newRegistraionUrl,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        data: data
    };
    return async (dispatch) => {
        // Sending the additional url to be attached on baseUrl in other function
        // const registrationUrl = AllUrl.newRegistraionUrl;

        // wait untill the data not received so getData function take data and url part
        dispatch(AddNewStudentRequest());
        let userResData = await axios(dataOfAddStudent);
        // console.log("the response is ::", userResData.request.status);
        // changing the userResData if we need token so userResData.data.toke will be used
        try {
            if (userResData.request.status === 200) {
                dispatch(AddNewStudentSuccess(userResData.data));
                Swal.fire({

                    title: '<i class="far fa-check-circle" ></i> Success',
                    html:
                        '<hr/>' +
                        'You form is Successfully submited ',
                    showConfirmButton: false,
                    // showCloseButton:true,
                    timer: 2500,
                    showClass: {
                        backdrop: 'swal2-noanimation', // disable backdrop animation
                        popup: '',                     // disable popup animation
                        icon: ''                       // disable icon animation
                    },
                    hideClass: {
                        popup: '',                     // disable popup fade-out animation
                    }

                })
            }
            else if (userResData.request.status === 406) {
                Swal.fire({
                    title: "Email Already found",
                    icon: "warning",
                    showClass: {
                        backdrop: 'swal2-noanimation', // disable backdrop animation
                        popup: '',                     // disable popup animation
                        icon: ''                       // disable icon animation
                    },
                    hideClass: {
                        popup: '',                     // disable popup fade-out animation
                    }
                })
                dispatch(AddNewStudentFailure(userResData.data));
            }
            else if (userResData.request.status === 404) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'This fees structure is Already createrd!',
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        backdrop: 'swal2-noanimation', // disable backdrop animation
                        popup: '',                     // disable popup animation
                        icon: ''                       // disable icon animation
                    },
                    hideClass: {
                        popup: '',                     // disable popup fade-out animation
                    }
                })
                dispatch(AddNewStudentFailure(userResData.data));
            }
            else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        backdrop: 'swal2-noanimation', // disable backdrop animation
                        popup: '',                     // disable popup animation
                        icon: ''                       // disable icon animation
                    },
                    hideClass: {
                        popup: '',                     // disable popup fade-out animation
                    }
                })
                dispatch(AddNewStudentFailure(userResData.data));
            }
            return userResData.request.status
        }
        catch (error) {
            //if crudential fails than Login fail action dispatch
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Connection lost !',
                showConfirmButton: false,
                timer: 2500,
                showClass: {
                    backdrop: 'swal2-noanimation', // disable backdrop animation
                    popup: '',                     // disable popup animation
                    icon: ''                       // disable icon animation
                },
                hideClass: {
                    popup: '',                     // disable popup fade-out animation
                }
            })
            dispatch(AddNewStudentFailure(error.message));
        }
    }
}

export default AddNewStudent;

export const AddNewStudentRequest = () => {
    return {
        type: ADD_STUDENT_REQUEST,
    };
};

export const AddNewStudentSuccess = (users) => {
    return {
        type: ADD_STUDENT_SUCCESS,
        payload: users,
    };
};

export const AddNewStudentFailure = (error) => {
    return {
        type: ADD_STUDENT_FAIL,
        payload: error,
    };
};
