import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { fetchFeesTableData } from "../../../redux/actionDispatcher/feesStructureTableDataDispatcher";
import { fetchFeesTableDataConfig } from "../../../redux/constants/config";
import { baseUrl } from "../../../redux/constants/url";
function HeaderColumn({ original, fetchFeesTable }) {
  const changeStatus = (data) => {
    const token = localStorage.getItem("token");
    var fetchData = {
      method: "GET",
      url: `${baseUrl}/api/list_schema`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    var config = {
      method: "post",
      url: `${baseUrl}/api/active_schema`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        fetchFeesTable(fetchFeesTableDataConfig);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
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
          showCancelButton: true,
          cancelButtonText: `${original.active === 1 ? "Deactive" : "Active"}`,
          confirmButtonText: "Cancel",
          showCloseButton: true,
          cancelButtonColor: `${original.active === 1 ? "#8585ed" : "#3f58fc"}`,
          confirmButtonColor: "gray",
        }).then((result) => {
          if (result.isConfirmed === false) {
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
    fetchFeesTable: (data) => dispatch(fetchFeesTableData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderColumn);
