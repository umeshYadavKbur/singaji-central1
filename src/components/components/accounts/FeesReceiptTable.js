import React from "react";
import '../styles/Table.css'
import '../styles/HeaderDropdown.css'
import { Fragment, useMemo } from "react";
import { useTable, useFilters, useSortBy, useGlobalFilter, usePagination, useRowSelect, useAsyncDebounce } from "react-table";
import updown_sort from '../../assests/image/updown_sort.svg'
import { TableCheckbox } from '../tableComponents/TableCheckbox';
// import tableData from './fees_receipt.json'
import filtericon from '../../assests/image/AccountIcons/filter.svg'

import { CDropdown, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import feesReceiptTableData from "../../../redux/actionDispatcher/account/feesReceiptTableDispather";
import AllUrl from "../../../redux/constants/url";
import { connect } from "react-redux";
import SkeletonColor from "../../../helpers/Skeletrone";


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
    column: { filterValue = [], setFilter, preFilteredRows, id }
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
            <div className="block">
                {/* <span className="block capitalize mb-4">{id}</span> */}
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="false" aria-controls={`${id}`}>
                                {id}
                            </button>
                        </h2>
                    </div>
                </div>
                {/* eslint-disable-next-line */}
                {options.map((option, i) => {
                    return (
                        <Fragment key={i}>
                            <div id={`${id}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <input
                                    checked={filterValue.includes(option)}
                                    type="checkbox"
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    id={option}
                                    name={option}
                                    value={option}
                                    onChange={(e) => {
                                        setFilter(setFilteredParams(filterValue, e.target.value));
                                    }}
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
        </Fragment>
    );
}

// Define a default UI for filtering
function GlobalFilter({
    filter, setFilter, preGlobalFilteredRows
}) {
    const count = preGlobalFilteredRows.length
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
                placeholder={`Search ${count} records...`} />
            <i style={{ marginLeft: "-31px", color: "rgb(90, 96, 127,0.7)" }}
                className="fas fa-search" >
            </i>
        </>
    )
}


function FeesReceiptTable({ feesReceipt, fetchData }) {

    const token = localStorage.getItem("token");
    React.useEffect(() => {
        var config = {
            method: "GET",
            url: AllUrl.feesReceiptTable,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        fetchData(config);
        // settable_data(table_data.table_data);
        // eslint-disable-next-line
    }, []);

    // const data = React.useMemo(
    //     () => tableData,
    //     []
    // );

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
                header: "Data",
                accessor: "AccountsReceiptDate",
                Filter: "",
                filter: ""
            },
            {
                header: "Receipt No",
                accessor: "AccountsReceiptNo",
                Filter: "",
                filter: ""
            },
            {
                header: "Name",
                accessor: "name",
                Filter: "",
                filter: ""
            },
            {
                header: "Father name",
                accessor: "fathersName",
                Filter: "",
                filter: ""
            },
            {
                header: "Stream",
                accessor: "branch",
                Filter: SelectColumnFilter,
                filter: MultipleFilter,
            },
            {
                header: "Installment",
                accessor: "InstallmentNo",
                Filter: "",
                filter: ""
            },
            {
                header: "Received Fee",
                accessor: "ReceivedAmount",
                Cell: ({ row: { original } }) => (
                    <div className='row d-flex d-inline-flex'>
                        <div className="col">
                            <span className='recieved-fee-circle' style={{ backgroundColor: "rgb(153, 248, 126)" }}></span>
                        </div>
                        <div className="col">
                            <span className='' >
                                {original.ReceivedAmount}
                            </span>
                        </div>
                    </div>
                ),
                Filter: "",
                filter: ""
            },
            {
                header: "Waive Off",
                accessor: "waiveOf",
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
        pageOptions,
        selectedFlatRows,
        state,
        setGlobalFilter,
        // rows,
        preGlobalFilteredRows,
        prepareRow,
    } = useTable(
        { columns, data: feesReceipt.table_data },

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

    return feesReceipt.loading ? (
        <SkeletonColor></SkeletonColor>
    ) : feesReceipt.error ? (
        <h2>{feesReceipt.error}</h2>
    ) : (
        <Fragment>
            <div className="container-fluid">
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
                                        marginTop: "-34px",
                                        marginRight: "5px",
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

                        <div className="ml-auto me-4">
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                filter={globalFilter}
                                setFilter={setGlobalFilter}
                            />
                        </div>
                    </div>
                </div>

                <table {...getTableProps()} id="customers">
                    <thead>
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
                <div>
                    <span>
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{" "}
                    </span>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </button>
                </div>
            </div>
        </Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        feesReceipt: state.feesReceiptData,
    };
};

//passing the userData in fetchData function and also dispatch method
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (data) => dispatch(feesReceiptTableData(data)),
    };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(FeesReceiptTable);

