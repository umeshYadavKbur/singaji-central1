import axios from "axios";
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
        payload: error,
    };
};
