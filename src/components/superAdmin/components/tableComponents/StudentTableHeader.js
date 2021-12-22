import { Fragment } from "react";
import ActiveButton from "../../../assests/common/ActiveButton";
import Edit_icon from '../../../assests/image/Edit_icon.svg'

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
    header: "Reg.fee",
    accessor: "reg_fees_status",
    Cell: ({row: {original}}) => (
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
    Cell: ({row: {original}}) => (
      <button
        style={ {
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
          console.log(original)
          alert("Do you want to change this   : " + original)
        }}>
        Deactive
      </button>)
  },
  {
    header: 'Edit',
    accessor: 'icon',
    Cell: ({row: {original}}) => (
      // <i onClick={() => {alert("hii")}} class="far fa-edit"></i>
      <img src={Edit_icon} alt="Edit" />

    )
  }
];

export default StudentTableHeader;


const appliedStudentVerify = () => {
  return (
    <div>

    </div>
  )
}