import axios from "axios";
import { toast } from "react-toastify";
import {
    PENDING_SCHOLARSHIP_TABLE_FAIL,
    PENDING_SCHOLARSHIP_TABLE_REQ,
    PENDING_SCHOLARSHIP_TABLE_SUCCESS
} from '../../constants/actions'

const pendingScholarship = (data) => {
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
                            position: "bottom-center",
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
                            position: "bottom-center",
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
                    dispatch(fetchFailTableData(error.message));
                    toast.warning('Something went wrong', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        } catch (error) {
            dispatch(fetchFailTableData(error.message));
            toast.warning('Internal server error', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            //   console.log(error);
        }
    };
};

export default pendingScholarship

const fetchTableData = () => {
    return {
        type: PENDING_SCHOLARSHIP_TABLE_REQ,
    };
};


const fetchSuccessTableData = (data) => {
    return {
        type: PENDING_SCHOLARSHIP_TABLE_SUCCESS,
        payload: data,
    };
};

const fetchFailTableData = (error) => {
    return {
        type: PENDING_SCHOLARSHIP_TABLE_FAIL,
        payload: error
    };
};
