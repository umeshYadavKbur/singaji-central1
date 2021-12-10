import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

function GlobalFilter({ filter, setFilter, preGlobalFilteredRows }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 200);
  return (
    <div
      style={{
        padding: "10px",
        width: "170px",
        marginTop: "10px",
      }}
    >
      <input
        label={`Search ${count}`}
        id="form1"
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  );
}

export default GlobalFilter;
