import HeaderColumn from "../../../assests/common/HeaderColumn";
import Edit_icon from "../../../assests/image/Edit_icon.svg";

const FeesStructureColumn = [
  {
    header: "S.No",
    accessor: "sno",
  },
  {
    header: "Branch Name",
    accessor: "branch_name",
  },
  {
    header: "Starting Year",
    accessor: "starting_year",
  },
  {
    header: "Ending Year",
    accessor: "ending_year",
  },
  {
    header: "Total Fees",
    accessor: "total_fees",
  },
  {
    header: "Status",
    accessor: "active",
    Cell: ({ row: { original } }) => <HeaderColumn original={original} />,
  },
  {
    header: "Edit",
    accessor: "icon",
    Cell: ({ row: { original } }) => (
      // <i onClick={() => {alert("hii")}} class="far fa-edit"></i>
      <img src={Edit_icon} alt="Edit" />
    ),
  },
];

export default FeesStructureColumn;
