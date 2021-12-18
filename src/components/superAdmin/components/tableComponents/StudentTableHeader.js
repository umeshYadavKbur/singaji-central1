import { Fragment } from "react";
import ActiveButton from "../../../assests/common/ActiveButton";

const StudentTableHeader = [
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
    accessor: "reg_Fees",
  },
  {
    header: "Status",
    accessor: "accessor",
    Cell: ({ row: { original } }) => (
      <Fragment>
        <ActiveButton original={original} />
      </Fragment>
    ),
  },
];

export default StudentTableHeader;
