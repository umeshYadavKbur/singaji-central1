const LOGIN_CALL = 'LOGIN_CALL'

export const loginApiCall =(userData)=> {
    return{
        type:LOGIN_CALL,
        payload:userData
    }
}