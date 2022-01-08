import {GET_INFO_OF_STUDENT_TABLE_FAIL,
    GET_INFO_OF_STUDENT_TABLE_REQUEST,
    GET_INFO_OF_STUDENT_TABLE_SUCCESS } from '../../constants/actions'



const initialState = {
    loading: false,
    StudentDataOfAccountTable: [],
    error: "",
};

const studentAccountTableStudentInformation = (state = initialState,action) => {
    switch(action.type) {
        case GET_INFO_OF_STUDENT_TABLE_FAIL:
            return {
                ...state,
                loading: true,
            };
        case GET_INFO_OF_STUDENT_TABLE_REQUEST:
            return {
                loading: false,
                statusChanged: action.payload ,
                error: "",
            };
        case GET_INFO_OF_STUDENT_TABLE_SUCCESS:
            return {
                loading: false,
                statusChanged: false,
                error: action.payload,
            };
        
        default:
            return state;
    }
}

export default studentAccountTableStudentInformation;