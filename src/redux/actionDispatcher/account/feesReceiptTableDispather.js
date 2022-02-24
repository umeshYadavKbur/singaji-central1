import axios from "axios";
import {
    FEES_RECEIPT_TABLE_FAIL,
    FEES_RECEIPT_TABLE_REQ,
    FEES_RECEIPT_TABLE_SUCCESS
} from '../../constants/actions'
import { toast } from "react-toastify";

const feesReceiptTableData = (data) => {
    return (dispatch) => {
        dispatch(fetchTableData());
        try {
            axios(data)
                .then(function (response) {
                    // console.log((response));
                    if (response.status === 200) {
                        dispatch(fetchSuccessTableData(response.data));
                    }
                    if (response.status === 400) {
                        toast.warning('No data found ', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        dispatch(fetchFailTableData(response.data));
                    }
                    if (response.status === 400) {
                        toast.warning('No data found ', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        dispatch(fetchFailTableData(response.data));
                    }
                    if (response.status === 500) {
                        toast.warning('Internal server error', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        dispatch(fetchFailTableData(response.data));
                    }
                })
                .catch(function (error) {
                    toast.warning('Internal server error', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    fetchFailTableData(error.message);
                });
        } catch (error) {
            toast.warning('Internal server error', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchFailTableData(error.message);
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
