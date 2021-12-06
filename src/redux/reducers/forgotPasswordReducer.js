import {FORGETPASSWORD_FAIL,FORGETPASSWORD_REQUEST,FORGETPASSWORD_SUCCESS} from "../constants/actions"

const initialState = {
    loading: false,
    success: false,
    error: ''
}

const forgetPassReducer = (state = initialState,action) => {
    switch(action.type) {
        case FORGETPASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FORGETPASSWORD_SUCCESS:
            return {
                loading: false,
                success: true,
                error: ''
            }
        case FORGETPASSWORD_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        default: return state
    }
}

export default forgetPassReducer