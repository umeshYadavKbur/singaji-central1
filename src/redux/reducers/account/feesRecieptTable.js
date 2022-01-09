import {
    FEES_RECEIPT_TABLE_FAIL,
    FEES_RECEIPT_TABLE_REQ,
    FEES_RECEIPT_TABLE_SUCCESS
} from '../../constants/actions'



const initialState = {
    loading: false,
    table_data: [],
    error: "",
};

const feesReceiptTable = (state = initialState, action) => {
    switch (action.type) {
        case FEES_RECEIPT_TABLE_REQ:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case FEES_RECEIPT_TABLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FEES_RECEIPT_TABLE_SUCCESS:
            return {
                loading: false,
                table_data: action.payload,
            };

        default:
            return state;
    }
}

export default feesReceiptTable;