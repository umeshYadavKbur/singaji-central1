import {ADMIN_STATUS_CHANGE_REQUEST,ADMIN_STATUS_CHANGE_SUCCESS,ADMIN_STATUS_CHANGE_FAIL} from "../constants/actions";
import {toast} from "react-toastify";
import AllUrl from "../constants/url";
var axios = require('axios');
// import getData from "../../services/agent";


export const AdminStatusChange = (data) => {
    console.log("data dispatch",data);
    return async (dispatch) => {
        // const url = loginUrl;
        // wait untill the data not received so getData function take data and url part

        dispatch(AdminStatusChangeRequest());
        var body = JSON.stringify({
            email: data.email,
            is_active: data.is_active=== 1 ? '0':'1',
        });

        var config = {
            method: 'post',
            url: `${AllUrl.adminStatusChange}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: body
        };

        let userResData;

        try {
            userResData = await axios(config);
            console.log(userResData)
            if(userResData.status === 200) {
                dispatch(AdminStatusChangeSuccess(userResData.data));
                toast.success(`Successfull `,{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // alert("succes")

            } else if(userResData.status === 404) {
                toast.warning('Data Not Found',{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(AdminStatusChangeFail(userResData.data));

            } else if(userResData.status === 208) {
                toast.warning('user are already available',{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(AdminStatusChangeFail('user are already available'));

            } else {
                toast.error('Internal Server Error',{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                let value = JSON.stringify(userResData.status);
                dispatch(AdminStatusChangeFail(value));

            }
            return userResData.status;
        } catch(error) {
            //if crudential fails than Login fail action dispatch
            let value = JSON.stringify(userResData);
            dispatch(AdminStatusChangeFail(value));

        }
    };
};


const AdminStatusChangeRequest = () => {
    return {
        type: ADMIN_STATUS_CHANGE_REQUEST
    };
};

const AdminStatusChangeSuccess = (data) => {
    return {
        type: ADMIN_STATUS_CHANGE_SUCCESS,
        payload: data
    };
};

const AdminStatusChangeFail = (error) => {
    return {
        type: ADMIN_STATUS_CHANGE_FAIL,
        payload: error
    };
};