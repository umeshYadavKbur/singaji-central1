import React from "react";
import Swal from "sweetalert2";

function HeaderColumn({ original }) {
  return (
    // <button
    //   style={
    //     original.active === 1
    //       ? {
    //           width: "80px",
    //           borderRadius: "5px",
    //           backgroundColor: "#242483",
    //           color: "white",
    //           fontWeight: "bold",
    //           border: "1px #FFC700",
    //           // height: "15px"
    //         }
    //       : {
    //           width: "80px",
    //           backgroundColor: "#8585ed",
    //           borderRadius: "5px",
    //           fontWeight: "bold",
    //           color: "white",
    //           border: "none",
    //         }
    //   }
    //   onClick={() => {
    //     // setData(original.status)
    //     console.log(original);
    //     alert("Do you want to change this   : " + original);
    //   }}
    // >
    //   {original.active === 1 ? "Active" : "Deactive"}
    // </button>
    <button
      style={
        original.active === 1
          ? {
              width: "80px",
              borderRadius: "5px",
              backgroundColor: "#3f58fc",
              color: "white",
              fontWeight: "bold",
              border: "1px #FFC700",
              // height: "15px"
            }
          : {
              width: "80px",
              backgroundColor: "#8585ed",
              borderRadius: "5px",
              fontWeight: "bold",
              color: "white",
              border: "none",
            }
      }
      onClick={() => {
        // setData(original.status)
        console.log(original.email);
        Swal.fire({
          title: `${original.active === 1 ? "Deactive" : "Active"}`,
          html:
            "<hr>" +
            "Are you sure?" +
            "<br>" +
            `You want to  ${
              original.active === 1 ? "Deactive" : "Active"
            } this ${original.branch_name}`,
          // icon: 'warning',
          showCancelButton: true,
          // showCancelButton: true,
          cancelButtonText: `${original.active === 1 ? "Deactive" : "Active"}`,
          confirmButtonText: "Cancel",
          showCloseButton: true,
          cancelButtonColor: `${original.active === 1 ? "#8585ed" : "#3f58fc"}`,
          confirmButtonColor: "gray",
        }).then((result) => {
          if (result.isConfirmed === false) {
            //  VerifyStudent(original);
            console.log("====================================");
            console.log("asdfasdfasdfasdf");
            console.log("====================================");
          }
        });
      }}
    >
      {original.active === 1 ? "Active" : "Deactive"}
    </button>
  );
}

export default HeaderColumn;
