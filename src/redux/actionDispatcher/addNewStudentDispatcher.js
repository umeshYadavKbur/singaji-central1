import {ADD_STUDENT_FAIL,ADD_STUDENT_REQUEST,ADD_STUDENT_SUCCESS} from "../constants/actions";
import getData from "../../services/agent";
import swal from "sweetalert";

 const AddNewStudent = (data) => {
    return async (dispatch) => {
        // Sending the additional url to be attached on baseUrl in other function
        const loginUrl = "/api/login";

        // wait untill the data not received so getData function take data and url part
        dispatch(AddNewStudentRequest());
        var userResData = await getData(data,loginUrl);
        console.log("the response is ::",userResData.request.status);
        // changing the userResData if we need token so userResData.data.toke will be used
        try {
            if(userResData.request.status === 200) {
                dispatch(AddNewStudentSuccess(userResData.data));
                swal({
                    title: "Login Success",
                    icon: "success",
                })
            }
            else if(userResData.request.status === 404) {
                swal({
                    title: "User not Found",
                    icon: "warning",
                })
                dispatch(AddNewStudentFailure(userResData.data));
            }
            else if(userResData.request.status === 400) {
                swal({
                    title: "Invalid Credential",
                    icon: "warning",
                })
                dispatch(AddNewStudentFailure(userResData.data));
            }
            else {

                dispatch(AddNewStudentFailure(userResData.data));
            }
            return userResData.request.status
        }
        catch(error) {
            //if crudential fails than Login fail action dispatch
            dispatch(AddNewStudentFailure(error));
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
