import axios from "axios";
import {baseUrl} from "../redux/constants/url";

// Make a post api where we can call it and hold the data in another variable
async function getDataFromApi(loginUrl) {
    var url = `${baseUrl}${loginUrl}`;
    console.log(url);
    try {
        var response = await axios.get(url );
        console.log("The response of new password is :: ",response.data);
        if(response.status === 200) {
            //here i change the return data so the response object coming from an api is directly return
            return response.data;
        }
        // Don't forget to return something
        return response.data;
    } catch(err) {
        return err;
    }
}

export default getDataFromApi;
