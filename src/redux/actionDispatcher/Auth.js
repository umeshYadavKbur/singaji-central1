import { axios } from "axios";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/actions";

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST,
    };
};
export const loginSuccess = (users) => {
    return {
        type: LOGIN_SUCCESS,
        payload: users,
    };
};

export const loginFailure = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error,
    };
};

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(loginRequest)
        axios.get('url of any api')
            .then(response => {
                const users = response.data
                dispatch(loginRequest(users))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(loginFailure(errorMsg))
            })
    }
}

export const login = (userData) => {
    return dispatch => {
        let apiEndpoint = 'auths';
        let payload = { userData }
        userService.post(apiEndpoint, payload)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('auth', response.data.auth);
                    dispatch(setUserDetails(response.data));
                    history.push('/home');
                }
            })
    };
}
