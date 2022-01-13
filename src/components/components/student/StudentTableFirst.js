import React from "react";
import '../styles/Table.css'
import '../styles/HeaderDropdown.css'
import { Fragment, useMemo } from "react";
import { useTable, useFilters, useSortBy, useGlobalFilter, usePagination, useRowSelect, useAsyncDebounce } from "react-table";
import updown_sort from '../../assests/image/updown_sort.svg'
import { TableCheckbox } from '../tableComponents/TableCheckbox';
// import tableData from './fees_receipt.json'
import filtericon from '../../assests/image/AccountIcons/filter.svg'
import { ActivateButton, DeactivateButton } from '../../assests/common/Color'
import { CDropdown, CDropdownMenu, CDropdownToggle, CPopover } from '@coreui/react'
// import feesReceiptTableData from "../../../redux/actionDispatcher/account/feesReceiptTableDispather";
// import AllUrl from "../../../redux/constants/url";
// import { connect } from "react-redux";
// import SkeletonColor from "../../../helpers/Skeletrone";
import tableData from './studentTable.json'
import Pagination from "../../assests/common/Pagination";

const MultipleFilter = (rows, accessor, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
        if (filterValue.includes(val.original[accessor])) arr.push(val);
    });
    return arr;
};

function setFilteredParams(filterArr, val) {
    if (filterArr.includes(val)) {
        filterArr = filterArr.filter((n) => {
            return n !== val;
        });
    } else filterArr.push(val);

    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
}

function SelectColumnFilter({
    column: { filterValue = [], setFilter, preFilteredRows, id },
}) {
    const options = useMemo(() => {
        const options = new Set();

        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return (
        <Fragment>
            <div onClick={(e) => { e.preventDefault() }} className="d-flex justify-content-end">
                {/* <span className="block capitalize mb-4">{id}</span> */}

                <CPopover


                    content={
                        <div className="">

                            {options.map((option, i) => {
                                return (

                                    <Fragment key={i}>
                                        <div id={`${id}`}>
                                            <input
                                                checked={filterValue.includes(option)}
                                                type="checkbox"
                                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                id={option}
                                                name={option}
                                                value={option}
                                                style={{ cursor: 'pointer' }}
                                                onChange={(e) => {

                                                    setFilter(
                                                        setFilteredParams(filterValue, e.target.value)
                                                    );
                                                }}
                                                onClick={(e) => { e.stopPropagation() }}
                                            ></input>
                                            <label
                                                htmlFor={option}
                                                className="ml-1.5 font-medium text-gray-700"
                                            >
                                                {option}
                                            </label>
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    }
                    placement="right"
                >
                    <div className="btn-group dropright">
                        <button

                            onClick={(e) => { e.preventDefault() }}
                            className="btn  dropdown-toggle"

                        >
                            {id}
                        </button>
                    </div>
                </CPopover>
            </div >
        </Fragment >
    );
}
// Define a default UI for filtering
function GlobalFilter({
    filter, setFilter, preGlobalFilteredRows
}) {
    // const count = preGlobalFilteredRows.length
    // eslint-disable-next-line
    const [value, setValue] = React.useState(filter)
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 200)

    return (
        <>
            <input
                style=
                {{ width: "270px", height: "41px", outline: "none", border: "1px solid #7979792b", padding: "5px", borderRadius: "4px" }} type="search" value={filter || ''}
                onChange={e => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }}
                placeholder="Search" />
            <i style={{ marginLeft: "-31px", color: "rgb(90, 96, 127,0.7)" }}
                className="fas fa-search" >
            </i>
        </>
    )
}


function StudentTableFirst() {

    // const token = localStorage.getItem("token");
    // React.useEffect(() => {
    //     var config = {
    //         method: "GET",
    //         url: AllUrl.feesReceiptTable,
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //         },
    //     };

    //     fetchData(config);
    //     // settable_data(table_data.table_data);
    //     // eslint-disable-next-line
    // }, []);

    const data = React.useMemo(
        () => tableData,
        []
    );
    console.log(data);

    const columns = React.useMemo(
        () => [
            {
                header: "S No",
                accessor: "S.N",
                Cell: ({ row: { original, index } }) => {
                    return (index + 1)
                },
                Filter: "",
                filter: "",
            },
            {
                header: "Name",
                accessor: "first_name",
                Filter: "",
                filter: ""
            },
            {
                header: "Father Name",
                accessor: "id",
                Filter: "",
                filter: ""
            },
            {
                header: "Stream",
                accessor: "stream",
                Filter: SelectColumnFilter,
                filter: MultipleFilter,
            },
            {
                header: "Year",
                accessor: "year",
                Filter: SelectColumnFilter,
                filter: MultipleFilter,
            },
            {
                header: "Village",
                accessor: "village",
                Filter: "",
                filter: ""
            },
            {
                header: "Mobile No",
                accessor: "mobile",
                Filter: "",
                filter: "",
            },
            {
                header: "Registration Fee",
                accessor: "reg_fees",
                Filter: "",
                filter: ""
            },
            {
                header: "Status",
                accessor: "status",
                Cell: ({ row: { original, index } }) => {
                    return (
                        <button
                            style={
                                original.status
                                    ? ActivateButton
                                    : DeactivateButton
                            }

                        >
                            {original.status ? "Active" : "Deactive"}
                        </button>
                    )
                },
                Filter: "",
                filter: ""
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        setPageSize,
        pageCount,
        gotoPage,
        pageOptions,
        selectedFlatRows,
        state,
        setGlobalFilter,
        // rows,
        preGlobalFilteredRows,
        prepareRow,
    } = useTable(
        // { columns, data: feesReceipt.table_data },
        { columns, data },

        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: "selection",
                        header: ({ getToggleAllRowsSelectedProps }) => (
                            < TableCheckbox {...getToggleAllRowsSelectedProps()} />
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

    const { globalFilter, pageSize, pageIndex } = state;
    const checkboxData = JSON.stringify(
        {
            selectedFlatRows: selectedFlatRows.map((row) => row.original)
        },
        null,
        2
    );
    console.log(checkboxData)

    // return
    // feesReceipt.loading ? (
    //     <SkeletonColor></SkeletonColor>
    // ) : feesReceipt.error ? (
    //     <h2>{feesReceipt.error}</h2>
    // ) : 
    return (
        <Fragment>
            <div className="container-fluid">
                <div style={{ position: 'sticky', top: '80px', width: '100%', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#f4f7fc', zIndex: '500' }}>
                    <div className="d-flex">
                        <div className="">
                            <select
                                className="form-select table_select_row_options"
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                            >
                                {[10, 25, 50, 100].map((pageSize) => (
                                    <option value={pageSize} key={pageSize}>
                                        Show Entries {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="d-flex ml-auto me-1">
                            <div className="d-flex mr-2" style={{ height: '40px', width: '42px', backgroundColor: '#fff', borderRadius: '3px', border: "1px solid #EDEDED" }}>
                                <CDropdown variant="nav-item" style={{ color: 'white' }} >
                                    <CDropdownToggle
                                        placement="bottom-end"
                                        className="py-0"
                                        caret={false}
                                    >
                                        <img
                                            src={filtericon}
                                            alt=""
                                            style={{
                                                height: "35px",
                                                width: "35px",
                                                marginTop: "-35px",
                                                marginLeft: "-13px",
                                            }}
                                        />
                                    </CDropdownToggle>

                                    <CDropdownMenu
                                        component={"div"}
                                        className="pt-0 "
                                        placement="bottom-end"

                                    >
                                        <div>
                                            {headerGroups.map((headerGroup) => (
                                                <div
                                                    style={{ display: "flex flex-column" }}
                                                    {...headerGroup.getHeaderGroupProps()}
                                                >
                                                    {headerGroup.headers.map((column, i) => (
                                                        <div
                                                            key={i}
                                                            style={{ display: "block", justifyContent: "center" }}
                                                        >
                                                            {column.canFilter ? column.render("Filter") : null}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </CDropdownMenu>
                                </CDropdown>
                            </div>

                            <div className="ml-auto me-4">
                                <GlobalFilter
                                    preGlobalFilteredRows={preGlobalFilteredRows}
                                    filter={globalFilter}
                                    setFilter={setGlobalFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <table {...getTableProps()} id="customers">
                    <thead style={{ position: 'sticky', top: '135px', width: '100%', backgroundColor: '#f4f7fc', zIndex: '500' }}>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("header")}
                                        <span>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <img
                                                        src={updown_sort}
                                                        style={{ marginLeft: "5px" }}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <img
                                                        src={updown_sort}
                                                        style={{ marginLeft: "5px" }}
                                                        alt=""
                                                    />
                                                )
                                            ) : (
                                                ""
                                            )}
                                            {column.isSorted ? (column.isSortedDesc ? "" : "") : ""}
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
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination
                    page={page}
                    pageIndex={pageIndex}
                    pageCount={pageCount}
                    pageSize={pageSize}
                    canPreviousPage={canPreviousPage}
                    previousPage={previousPage}
                    pageOptions={pageOptions}
                    gotoPage={gotoPage}
                    canNextPage={canNextPage}
                    nextPage={nextPage}
                />
            </div>
        </Fragment>
    );
}



//Connecting the component to our store
export default StudentTableFirst

