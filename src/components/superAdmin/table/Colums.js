import { format } from "date-fns";
import SelectColumnFilter from "./features/SelectColumnFilter";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    Filter: SelectColumnFilter,
    // disableFilters: true,
    sticky: "left",
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
    // Filter: ColumnFilter,
    sticky: "left",
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
    // Filter: ColumnFilter,
    sticky: "left",
  },
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/mm/yyyy");
    },
    // Filter: ColumnFilter,
  },
  {
    Header: "Age",
    Footer: "Age",
    accessor: "age",
    // Filter: SelectColumnFilter,
  },
];
