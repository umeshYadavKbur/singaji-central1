import {FORGETPASSWORD_FAIL,FORGETPASSWORD_REQUEST,FORGETPASSWORD_SUCCESS} from '../constants/actions'
import getData from '../../services/agent'
// import {history} from '../../helpers/history'

export const fetchUserEmail = (data) => {
    return async (dispatch) => {
        console.log(data);
        const forgotPasswordUrl = "/api/resetPasswordEmail"
        dispatch(forgotPasswordRequest())
        var forgetPasswordData = await getData(data,forgotPasswordUrl)
        console.log("Working  :::: ",forgetPasswordData);
        if(forgetPasswordData.status === 200) {
            alert("hii")
            dispatch(forgotPasswordSuccess(forgetPasswordData))
        }
        else {
            console.log("Catch block");
            dispatch(forgotPasswordFailure(forgetPasswordData))

        }

    }
}

// export {fetchUserEmail}
export const forgotPasswordRequest = () => {
    return {
        type: FORGETPASSWORD_REQUEST
    }
}

export const forgotPasswordSuccess = users => {
    return {
        type: FORGETPASSWORD_SUCCESS,
        payload: users
    }
}

export const forgotPasswordFailure = error => {
    return {
        type: FORGETPASSWORD_FAIL,
        payload: error
    }
}