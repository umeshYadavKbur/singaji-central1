import HeaderColumn from "../../assests/common/HeaderColumn";
// import Edit_icon from "../../../assests/image/Edit_icon.svg";
import FeesStructure from "../FeesStructure";
const FeesStructureColumn = [
  {
    header: "S.No",
    accessor: "Srno",
    Cell: ({ row: { original, index } }) => {
      return (index + 1)
    }
  },
  {
    header: "Branch Name",
    accessor: "branchName",
  },
  {
    header: "Starting Year",
    accessor: "startingYear",
  },
  {
    header: "Ending Year",
    accessor: "endingYear",
  },
  {
    header: "Total Fees",
    accessor: "totalFees",
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
      <FeesStructure original={original} />
    ),
  },
];

export default FeesStructureColumn;
