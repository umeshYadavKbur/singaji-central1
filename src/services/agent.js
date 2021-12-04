import axios from "axios";
import { baseUrl } from "../redux/constants/url";

// Make a post api where we can call it and hold the data in another variable
async function getData(data, loginUrl) {
  var url = `${baseUrl}${loginUrl}`;
  try {
    var res = await axios.post(url, data);
    console.log("The url is  :: ", res.data);
    if (res.status === 200) {
      // console.log(res.data)
      return res.data;
    }
    // Don't forget to return something
    return res.data;
  } catch (err) {
    return err.message;
  }
}

export default getData;
