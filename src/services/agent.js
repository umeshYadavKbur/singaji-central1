import axios from "axios";
import { baseUrl } from "../redux/constants/url";

// Make a post api where we can call it and hold the data in another variable
async function getData(data, loginUrl) {
  var url = `${baseUrl}${loginUrl}`;
  console.log(url);
  try {
    var res = await axios.post(url, data);
    console.log("The response of new password is :: ", res);
    if (res.status === 200) {
      // console.log(res.data)
      return res;
    }
    // Don't forget to return something
    return res;
  } catch (err) {
    return err;
  }
}

export default getData;
