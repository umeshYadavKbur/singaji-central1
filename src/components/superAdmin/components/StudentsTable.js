import * as React from "react";
import { useMemo } from "react";
import { GlobalFilter } from "./tableComponents/GlobalFilter";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import MockData from "./tableComponents/studentTable.json";
import StudentTableHeader from "./tableComponents/StudentTableHeader";
import "./styles/Table.css";
import { baseUrl } from "../../../redux/constants/url";
import { fetchStudentTable } from "../../../redux/actionDispatcher/studentTableDatadispatcher";
import { connect } from "react-redux";

function StudentTable({ table_data, fetchStudentTable }) {
  const columns = useMemo(() => StudentTableHeader, []);
  const token = localStorage.getItem("token");

  console.log("====================================");
  console.log(table_data);
  console.log("====================================");
 
  React.useEffect(() => {
    var config = {
        method: "GET",
        url: `${baseUrl}/api/registrated_student`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      fetchStudentTable(config);
      // setTableData(table_data.table_data);
 
    // eslint-disable-next-line
  }, []);


  // console.log("The columns are::" + columns);
  // const [data, setData] = React.useState(useMemo(() => MockData, []));
  // const data= React.useState(useMemo(() => MockData, []));

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    // pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    // selectedFlatRows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: table_data.table_data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  return table_data.loading ? (
    <h2>Loading</h2>
  ) : table_data.error ? (
    <h2>{table_data.error}</h2>
  ) : (
    //   return (
    <>
      <div
        style={{
          backgroundColor: "rgb(246 249 252)",
          height: "auto",
          width: "auto",
        }}
      >
        <div className="d-flex">
          <div className="ms-4">
            <select
              style={{
                height: "auto",
                width: "auto",
                borderRadius: "10px",
                padding: "5px",
              }}
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option value={pageSize} key={pageSize}>
                  show Entrie {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="ml-auto me-5">
            <GlobalFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            ></GlobalFilter>
          </div>
        </div>
        <table {...getTableProps()} id="customers" className="table table-sm">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i class="fas fa-chevron-down ms-2"></i>
                        ) : (
                          <i class="fas fa-chevron-up ms-2"></i>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ border: "rgb(246 249 252)" }} className="d-flex mb-4">
          <div className="mx-4">
            <span>
              Showing 1 to {page.length} of {pageCount * pageSize} Entries{" "}
              {"  "}
            </span>
          </div>
          <div className="ml-auto">
            {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button> */}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button
              onClick={() => gotoPage(pageIndex + 1)}
              disabled={!canNextPage}
            >
              {pageIndex + 2}
            </button>
            <button
              onClick={() => gotoPage(pageIndex + 2)}
              disabled={!canNextPage}
            >
              {pageIndex + 3}
            </button>
            <button
              onClick={() => gotoPage(pageIndex + 3)}
              disabled={!canNextPage}
            >
              {pageIndex + 4}
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
            {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    table_data: state.studentTableData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentTable: (data) => dispatch(fetchStudentTable(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);