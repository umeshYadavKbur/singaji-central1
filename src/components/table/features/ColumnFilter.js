import React from "react";
import { MDBInput } from "mdb-react-ui-kit";

function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <div style={{ marginTop: "10px" }}>
      <MDBInput
        label="Search"
        id="form1"
        type="text"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default ColumnFilter;
