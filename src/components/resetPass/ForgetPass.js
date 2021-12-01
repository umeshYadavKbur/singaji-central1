import React, { useState } from "react";
import logo from "../assests/image/logo.png";

function ForgetPass() {
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleFocus = () => {
    console.log("handle focus triggered");
    setIsFocused(true);
  };
  const handleBlur = () => {
    console.log("handle blur triggered");
    setIsFocused(false);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      console.log("Please enter the same password");
    } else {
      console.log("Successfully submitted");
    }
  };
  return (
    <div>
      <div
        style={{
          backgroundColor: "#f1cafa",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "#FFF",
            border: "1px",
            height: "300px",
            minWidth: "359px",
            maxHeight: "445px",
            maxWidth: "648px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "2%",
              height: "20%",
              width: "20%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={logo}
              style={{ height: "60px", width: "60px" }}
              alt="Logo"
            />
          </div>
          <div
            style={{
              marginTop: "4%",
              height: "10%",
              width: "80%",
              // backgroundColor: "red",
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Enter New Password
          </div>
          <input
            style={{
              marginTop: "4%",
              height: "13%",
              width: "80%",
              fontSize: "90%",
              backgroundColor: "#f1cafa",
              borderRadius: "4px",
              border: "2px solid #c9c9c9",
              color: "black",
              paddingLeft: "5%",
            }}
            type="text"
            placeholder="Enter New Password"
            onchange={(e) => setPassword(e.target.value)}
          />
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              marginTop: "4%",
              height: "13%",
              width: "80%",
              fontSize: "90%",
              backgroundColor: "#f1cafa",
              borderRadius: "4px",
              borderWidth: "2px",
              // border: "2px solid #c9c9c9",
              color: "black",
              borderColor: isFocused ? "red" : "blue",
              paddingLeft: "5%",
            }}
            type="text"
            placeholder="Confirm Password"
            onchange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            style={{
              marginTop: "4%",
              height: "13%",
              width: "80%",
              fontSize: "90%",
              borderRadius: "4px",
              backgroundColor: "#d67a18",
              color: "#FFFFFF",
              borderWidth: "0px",
              fontWeight: "bold",
            }}
            onclick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

// export default ForgetPass;
export default ForgetPass;
