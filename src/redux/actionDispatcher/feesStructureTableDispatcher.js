import axios from "axios";
import swal from "sweetalert";
// import getData from "../../services/agent";
import {
    FEES_STRUCTURE_TABLE_FAILED,
    FEES_STRUCTURE_TABLE,
    FEES_STRUCTURE_TABLE_SUCCESS,
} from "../constants/actions";

export const createFeesStructure = (data) => {
    console.log("The data is ",data.data);
    return async (dispatch) => {
        // Console the data getting from the form of create admin
        try {
            dispatch(feesReq());
            axios(data)
                .then(function(response) {
                    //Printing the response of the data
                    // console.log(("Response is  :::", response));
                    // console.log(("The response code is ::", response.status));

                    if(response.status === 208) {
                        swal({
                            title: "this fees structure already created",
                            icon: "info",
                        });
                    } else if(response.status === 200) {
                        dispatch(feesReqSuccess());
                        swal({
                            title: "fees structure created successfully",
                            icon: "success",
                        });
                    } else if(response.status === 401) {
                        dispatch(feesReqSuccess());

                    }
                })
                .catch(function(error) {
                    dispatch(feesReqFail(error));
                    swal({
                        title: "Request failed",
                        icon: "error",
                    });
                });
        } catch(error) {
            console.log(error);
        }
    };
};

export const feesReq = () => {
    return {
        type: CREATE_FEES_STRUCTURE,
    };
};

export const feesReqSuccess = () => {
    return {
        type: CREATE_FEES_SUCCESS,
    };
};

export const feesReqFail = (error) => {
    return {
        type: CREATE_FEES_FAILED,
        payload: error,
    };
};
