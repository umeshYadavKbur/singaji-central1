import {
    PENDING_SCHOLARSHIP_TABLE_FAIL,
    PENDING_SCHOLARSHIP_TABLE_REQ,
    PENDING_SCHOLARSHIP_TABLE_SUCCESS
} from '../../constants/actions'



const initialState = {
    loading: false,
    table_data: [],
    error: "",
};

const pendingScholarshipTable = (state = initialState, action) => {
    switch (action.type) {
        case PENDING_SCHOLARSHIP_TABLE_REQ:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case PENDING_SCHOLARSHIP_TABLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case PENDING_SCHOLARSHIP_TABLE_SUCCESS:
            return {
                loading: false,
                table_data: action.payload,
            };

        default:
            return state;
    }
}

export default pendingScholarshipTable;