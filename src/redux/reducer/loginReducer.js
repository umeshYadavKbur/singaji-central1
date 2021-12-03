
const initialState = {
    userData:[]
}

export const loginReducer=(state=initialState,action)=>{
    switch (action.type) {
        case LOGIN_CALL: 
        return{
            ...state,
            userData : action.payload
        }
    
        default:
            return state ;
    }

}
