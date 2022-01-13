// import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { changeFeesStructureStatus } from "../../../redux/actionDispatcher/superAdmin/feesStructureTableDataDispatcher";
// import { fetchFeesTableDataConfig } from "../../../redux/constants/config";
import { baseUrl } from "../../../redux/constants/url";
import { ActivateButton, DeactivateButton } from "./Color";
function HeaderColumn({ original, table_data, changeFeesStatus }) {
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
            `You want to  ${original.active === 1 ? "Deactive" : "Active"
            } this ${original.branch_name}`,
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
              branch_schema_code: original.branch_name + original.starting_year,
              is_active: `${original.active === 1 ? "0" : "1"}`,
            });
            changeStatus(data);
          }
        });
      }}
    >
      {original.active === 1 ? "Active" : "Deactive"}
    </button>
  );
}

const mapStateToProps = (state) => {
  return {
    table_data: state.feesStructTableData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFeesStatus: (data) => dispatch(changeFeesStructureStatus(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderColumn);
