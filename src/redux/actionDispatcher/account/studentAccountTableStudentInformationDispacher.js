import AllUrl from "../../constants/url";
import {
    GET_INFO_OF_STUDENT_TABLE_FAIL,
    GET_INFO_OF_STUDENT_TABLE_REQUEST,
    GET_INFO_OF_STUDENT_TABLE_SUCCESS
} from '../../constants/actions'

const getAllInfoOfStudent = async (original) => {
   dispatch(studentAccountTableStudentInformationRequest())

    // setLoading(true)
    // set data or original table to localStorage we need it later

    localStorage.setItem('userEdit',JSON.stringify(original))
    let data = JSON.stringify({
        "stdId": original.stdId,
    });

    console.log("_______");
    console.log(data);
    console.log("_______");

    let config = {
        method: 'post',
        url: AllUrl.allInfoOfActiveStudent,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    const response = await axios(config)
    console.log(response);
    if(response.status === 200)
    {
       dispatch( studentAccountTableStudentInformationSuccess(response)) 
    }
    // localStorage.setItem('userEdit',JSON.stringify(response.data))
    // setLoading(false)
    else{
        dispatch(studentAccountTableStudentInformationFailure(response))   
    }

}

export default getAllInfoOfStudent;

export const studentAccountTableStudentInformationRequest = () => {
    return {
        type: GET_INFO_OF_STUDENT_TABLE_FAIL,
    };
};

export const studentAccountTableStudentInformationSuccess = (users) => {
    return {
        type: GET_INFO_OF_STUDENT_TABLE_REQUEST,
        payload: users,
    };
};

export const studentAccountTableStudentInformationFailure = (error) => {
    return {
        type: GET_INFO_OF_STUDENT_TABLE_SUCCESS,
        payload: error,
    };
};