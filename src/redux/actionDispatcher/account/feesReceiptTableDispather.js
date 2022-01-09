import axios from "axios";
import {
    FEES_RECEIPT_TABLE_FAIL,
    FEES_RECEIPT_TABLE_REQ,
    FEES_RECEIPT_TABLE_SUCCESS
} from '../../constants/actions'

const feesReceiptTableData = (data) => {
    return (dispatch) => {
        dispatch(fetchTableData());
        try {
            axios(data)
                .then(function (response) {
                    console.log((response));
                    if (response.status === 200) {
                        dispatch(fetchSuccessTableData(response.data));
                    }
                })
                .catch(function (error) {
                    fetchFailTableData(error);
                });
        } catch (error) {
            fetchFailTableData(error);
            //   console.log(error);
        }
    };
};
export default feesReceiptTableData


const fetchTableData = () => {
    return {
        type: FEES_RECEIPT_TABLE_REQ,
    };
};


const fetchSuccessTableData = (data) => {
    return {
        type: FEES_RECEIPT_TABLE_SUCCESS,
        payload: data,
    };
};

const fetchFailTableData = (error) => {
    return {
        type: FEES_RECEIPT_TABLE_FAIL,
        payload: error,
    };
};
