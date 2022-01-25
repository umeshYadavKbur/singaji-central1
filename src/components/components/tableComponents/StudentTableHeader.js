// import {Fragment} from "react";
// import ActiveButton from "../../../assests/common/ActiveButton";
import Edit_icon from '../../../assests/image/Edit_icon.svg'
import { VerifyStudent } from "../../../../redux/actionDispatcher/studentVerifyTableDataDispatcher";
import Swal from 'sweetalert2'

const StudentTableHeader = [
  {
    header: "S No",
    accessor: "Srno",
  },
  {
    header: "Name",
    accessor: "firstName",
  },
  {
    header: "Father Name",
    accessor: "fathersName",
  },
  {
    header: "Stream",
    accessor: "branch",
  },
  {
    header: "Year",
    accessor: "year",
  },
  {
    header: "Village",
    accessor: "village",
  },
  {
    header: "Mobile",
    accessor: "mobile",
  },
  {
    header: "Reg. fees",
    accessor: "reg_fees_status",
    Cell: ({ row: { original } }) => (
      <button
        style={
          original.reg_fees_status === "Paid"
            ? {
              width: "80px",
              borderRadius: "5px",
              backgroundColor: "#FFC700",
              color: "white",
              fontWeight: "bold",
              border: '1px #FFC700',
              // height: "15px"
            }
            : {
              width: "80px",
              backgroundColor: "#FFC700",
              borderRadius: "5px",
              fontWeight: "bold",
              color: "white",
              border: 'none'
            }}
        onClick={() => {
          // setData(original.status)

          console.log(original)
          alert("Do you want to change this   : " + original)
        }}>
        {original.reg_fees_status}
      </button>)
  },
  {
    header: "Status",
    accessor: "status",
    Cell: ({ row: { original } }) => (
      <button
        style={{
          width: "80px",
          borderRadius: "5px",
          backgroundColor: "rgb(166 166 226)",
          color: "white",
          fontWeight: "bold",
          border: '1px #FFC700',
          // height: "15px"
        }
        }
        onClick={() => {
          // setData(original.status)
          console.log(original.email)
          Swal.fire({
            title: 'Active',

            html:
              '<hr>' +
              'Are you sure?' + '<br>' +
              `You want to active ${original.firstName} ${original.lastName} `,
            // icon: 'warning',
            showCancelButton: true,
            // showCancelButton: true,
            cancelButtonText: 'Active',
            confirmButtonText: 'Cancel',
            showCloseButton: true,
            cancelButtonColor: 'blue',
            confirmButtonColor: "gray",
            showClass: {
              backdrop: 'swal2-noanimation', // disable backdrop animation
              popup: '',                     // disable popup animation
              icon: ''                       // disable icon animation
            },
            hideClass: {
              popup: '',                     // disable popup fade-out animation
            }

          }).then((result) => {
            if (result.isConfirmed === false) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              VerifyStudent(original.email);
            }
          })
          // alert("Do you want to change this   : " + original.email)
          // VerifyStudent(original.email);
        }}>
        Deactive
      </button>)
  },
  {
    header: 'Edit',
    accessor: 'icon',
    Cell: ({ row: { original } }) => (
      // <i onClick={() => {alert("hii")}} class="far fa-edit"></i>
      <img src={Edit_icon} alt="Edit" />

    )
  }
];

export default StudentTableHeader;


