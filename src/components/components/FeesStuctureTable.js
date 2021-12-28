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
// import MockData from './tableComponents/feesStructureTabledata.json'
import FeesStructureHeader from "./tableComponents/FeesStructureHeader";
import "./styles/Table.css";
import { TableCheckbox } from "./tableComponents/TableCheckbox";
import { connect } from "react-redux";
import { fetchFeesTableData } from "../../redux/actionDispatcher/superAdmin/feesStructureTableDataDispatcher";
import AllUrl from "../../redux/constants/url";
import SkeletonColor from "../../helpers/Skeletrone";
import { ToastContainer } from "react-toastify";

// import LoaderButton from "../../assests/common/LoaderButton";

function FeesStructure({ table_data, fetchFeesTable }) {
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    var config = {
      method: "GET",
      url: AllUrl.allSchemaList,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetchFeesTable(config);
    // setTableData(table_data.table_data);
    // eslint-disable-next-line
  }, []);

  const columns = useMemo(() => FeesStructureHeader, []);

  // const tableData =
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
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: table_data.table_data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            header: ({ getToggleAllRowsSelectedProps }) => (
              <TableCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <TableCheckbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  // console.log("rows number :::", page.length);
  const { globalFilter } = state;
  const { pageIndex, pageSize, selectedRowIds } = state;

  const checkboxData = JSON.stringify(
    {
      selectedRowIds: selectedRowIds,
      "selectedFlatRows[].original": selectedFlatRows.map((d) => d.original),
    },
    null,
    2
  );
  console.log(checkboxData);
  return table_data.loading ? (
    <SkeletonColor></SkeletonColor>
  ) : table_data.error ? (
    <h2>{table_data.error}</h2>
  ) : (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {table_data.second_loading && (
        <div
          className="lds-roller"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            zindex: "-1",
          }}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div
        style={{ backgroundColor: "#F4F7FC", height: "auto", width: "auto" }}
      >
        <div className="d-flex">
          <div className="ms-4">
            <select
              style={{
                height: "auto",
                width: "auto",
                outline: "none",
                border: "none",
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
          <div className="d-flex ml-auto me-3">
            <div className="me-4">
              <button type="button" class="btn btn-outline-primary fw-bold ">
                Active
              </button>
            </div>
            <div className="me-4">
              <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
              ></GlobalFilter>
            </div>
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
              {/* Page{' '}
                        <strong>{pageIndex + 1} of {pageOptions.length} </strong> */}
              Showing {page.length * (pageIndex + 1) - (page.length - 1)} to{" "}
              {page.length * (pageIndex + 1)} of {pageCount * pageSize} Entries{" "}
              {"  "}
            </span>
          </div>
          <div className="ml-auto me-3">
            {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button> */}
            <button
              style={{
                outline: "none",
                border: "1px solid gray",
                borderRadius: "10px 0 0 10px",
              }}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            <button
              style={{ outline: "none", border: "1px solid gray" }}
              onClick={() => gotoPage(pageIndex + 1)}
              disabled={!canNextPage}
            >
              1
            </button>
            <button
              style={{ outline: "none", border: "1px solid gray" }}
              onClick={() => gotoPage(pageIndex + 1)}
              disabled={!canNextPage}
            >
              2
            </button>
            <button
              style={{ outline: "none", border: "1px solid gray" }}
              onClick={() => gotoPage(pageIndex + 2)}
              disabled={!canNextPage}
            >
              3
            </button>
            <button
              style={{ outline: "none", border: "1px solid gray" }}
              onClick={() => gotoPage(pageIndex + 3)}
              disabled={!canNextPage}
            >
              4
            </button>
            <button
              style={{
                outline: "none",
                border: "1px solid gray",
                borderRadius: "0 10px  10px 0",
              }}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
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
    table_data: state.feesStructTableData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeesTable: (data) => dispatch(fetchFeesTableData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeesStructure);
