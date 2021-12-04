import axios from "axios";
import {baseUrl} from "../redux/constants/url";

// Make a post api where we can call it and hold the data in another variable
async function getData(data,loginUrl) {
  var url = `${baseUrl}${loginUrl}`

  try {
    let res = await axios.post(url,data)
    if(loginUrl === "/api/resetPasswordEmail") {
      return res
    }
    else if(res.status === 200) {
      return res.data
    }
    // Don't forget to return something   
    return res.data
  }
  catch(err) {
    console.log("catch",err);
    return err.status;
  }
}

export default getData