// import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { changeStatus } from "../../../redux/actionDispatcher/changeStudentStatus";
import { baseUrl } from "../../../redux/constants/url";

function activeButton({ original, changeStatus }) {
  const token = localStorage.getItem("token");

  const changeStateOn = (original) => {
    console.log("====================================");
    console.log(original.email);
    console.log("====================================");
    var data = JSON.stringify({
      email: original.email,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/varify_student`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    changeStatus(config);
  };

  return (
    <div>
      <button
        style={
          original.status === "Active"
            ? {
                width: "80px",
                borderRadius: "5px",
                backgroundColor: "#FFC700",
                color: "white",
                fontWeight: "bold",
                border: "1px #FFC700",
              }
            : {
                width: "80px",
                backgroundColor: "#FBC775",
                borderRadius: "5px",
                fontWeight: "bold",
                color: "white",
                border: "none",
              }
        }
        onClick={() =>
          // console.log("====================================");
          // console.log(original);
          // console.log("====================================");
          changeStateOn(original)
        }
      >
        {original.status}
      </button>
    </div>
  );
}

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    changeStatus: (data) => dispatch(changeStatus(data)),
  };
};

//Connecting the component to our store
export default connect(null, mapDispatchToProps)(activeButton);
