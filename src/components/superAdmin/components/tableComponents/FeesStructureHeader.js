import HeaderColumn from "../../../assests/common/HeaderColumn";
// import Edit_icon from "../../../assests/image/Edit_icon.svg";
import FeesStructure from "../FeesStructure";
const FeesStructureColumn = [
{
  header: "S No",
  accessor: "Srno",
  Cell: ({row: {original,index}}) => {
      return (index + 1)
  }
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
      <FeesStructure edit="edit" original={original} />
    ),
  },
];

export default FeesStructureColumn;
