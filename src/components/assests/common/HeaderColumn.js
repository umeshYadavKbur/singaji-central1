
import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { changeFeesStructureStatus } from "../../../redux/actionDispatcher/superAdmin/feesStructureTableDataDispatcher";

import { baseUrl } from "../../../redux/constants/url";
import { ActivateButton, DeactivateButton } from "./Color";

// ================ fees structure table button column file ========================

function HeaderColumn({ original, changeFeesStatus }) {

  // this funtion will edit or update in fees structure table 
  const changeStatus = (data) => {
    const token = localStorage.getItem("token");
    var config = {
      method: "post",
      url: `${baseUrl}/api/active_schema`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    changeFeesStatus(config);
  };

  return (
    <button
      className="table_btn_size"
      style={
        original.active === 1
          ? ActivateButton
          : DeactivateButton
      }
      onClick={() => {
        // console.log(original.email);
        Swal.fire({
          title: `${original.active === 1 ? "Deactive" : "Active"}`,
          html:
            "<hr>" +
            "Are you sure?" +
            "<br>" +
            `You want to  ${original.active === 1 ? "deactive" : "active"
            } this ${original.branchName}`,
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: `${original.active === 1 ? "Deactive" : "Active"}`,
          showCloseButton: true,
          cancelButtonColor: "gray",
          confirmButtonColor: "#4f83df",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            var data = JSON.stringify({
              //Remaining integration 
              branch_schema_code: original.branchName + original.startingYear,
              is_active: `${original.active === 1 ? "0" : "1"}`,
            });
            // console.log('====================================');
            // console.log(data);
            // console.log('====================================');
            changeStatus(data);
          }
        });
      }}
    >
      {original.active === 1 ? "Active" : "Deactive"}
    </button>
  );
}

// =================== connect to store ==============

const mapDispatchToProps = (dispatch) => {
  return {
    changeFeesStatus: (data) => dispatch(changeFeesStructureStatus(data)),
  };
};

export default connect(null, mapDispatchToProps)(HeaderColumn);
