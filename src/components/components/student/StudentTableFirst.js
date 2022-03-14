import React from "react";
import { Fragment, useMemo } from "react";
import {
    useTable,
    useFilters,
    useSortBy,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useAsyncDebounce,
} from "react-table";
import { TableCheckbox } from "../tableComponents/TableCheckbox";
import rightArrow from '../../assests/image/right_arrow_icon.svg'

import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CPopover,
} from "@coreui/react";
import filtericon from "../../assests/image/AccountIcons/filter.svg";
// import './Styles/StudentAccountTable.css';

import updown_sort from '../../assests/image/updown_sort.svg';
import "rsuite/dist/rsuite.min.css";
import AllUrl from '../../../redux/constants/url';
import { connect } from 'react-redux';
import { fetchStudentAccountData, changeDailyReport } from '../../../redux/actionDispatcher/superAdmin/studentAccountTableDataDispatcher';
import SkeletonColor from '../../../helpers/Skeletrone';
import Pagination from "../../assests/common/Pagination";
import Loader from "../../assests/common/Loader";
// import { ActivateButton, DeactivateButton } from "../../assests/common/Color";
// import OfflinePage from "../../auth/OfflinePage";
import NoDataFound from "../../assests/common/NoDataFound";

export const MultipleFilter = (rows, accessor, filterValue) => {
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

    let offsetObj = [0, 0];

    if (id === 'branch') offsetObj = [190, 18]
    if (id === 'joinBatch') offsetObj = [150, 18]
    if (id === 'year') offsetObj = [40, 18]



    let name = id;

    switch (id) {
        case 'branch':
            name = 'Branch';
            break;
        case 'joinBatch':
            name = 'Join Year';
            break;
        case 'year':
            name = 'Year';
            break;
        default:
            break;
    }

    return (
        <Fragment>
            <div onClick={(e) => { e.preventDefault() }} className="d-flex justify-content-end">
                {/* <span className="block capitalize mb-4">{id}</span> */}
                <CPopover

                    offset={offsetObj}

                    content={
                        <div className="">
                            {options.map((option, i) => {
                                let option_label = option;

                                if (id === 'is_active') {
                                    if (option === 'true')
                                        option_label = 'Active'
                                    else
                                        option_label = 'Deactive'
                                }


                                return (
                                    <Fragment key={i}>
                                        <div id={`${id}`} style={{ height: '30px', cursor: 'pointer' }} className="filter_btn_hover p-1 pt-2 my-1 d-flex align-items-center ">
                                            <label
                                                onClick={(e) => { e.stopPropagation() }}
                                                className="font-medium text-gray-700 d-flex align-items-center cursor-pointer"
                                                // onCLick={}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <input
                                                    checked={filterValue.includes(option)}
                                                    type="checkbox"
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded mr-1"
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
                                                >

                                                </input>
                                                {
                                                    option_label
                                                }
                                            </label>
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    }
                    placement="right"

                >

                    <div className="btn-group filter_btn_hover">
                        {/* === "Join Year" ? "" : option_label */}
                        {
                            name === "Join Year" ? "" :
                                <>
                                    <button
                                        onClick={(e) => { e.preventDefault() }}
                                        className="btn filter_btn"
                                    >
                                        {name}
                                    </button>
                                    <img src={rightArrow} alt=">" width="6px" style={{
                                        marginTop: "4px",
                                        marginRight: '10px'
                                    }} />
                                </>
                        }
                    </div>
                </CPopover>
            </div >
        </Fragment >
    );
}


// Define a default UI for filtering
function GlobalFilter({ filter, setFilter, preGlobalFilteredRows }) {
    // const count = preGlobalFilteredRows.length;
    // const [value, setValue] = React.useState(filter);
    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 1);

    return (
        <>
            <input
                style={{
                    width: "270px",
                    height: "41px",
                    outline: "none",
                    border: "1px solid #7979792b",
                    padding: "5px",
                    borderRadius: "4px",
                    paddingLeft: '12px'
                }}
                type="search"
                value={filter || ""}
                onChange={(e) => {
                    // setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder="Search..."
            />
            <i
                style={{ marginLeft: "-31px", alignSelf: 'center', marginBottom: '7px', color: "rgb(90, 96, 127,0.7)" }}
                className="fas fa-search"
            ></i>
        </>
    );
}

function StudentTableFirst({ fetchUsers, studentData }) {
    const token = localStorage.getItem("token");

    //     React.useEffect(() => {
    //         // const getData =as ()=>{
    // // 
    //             var config = {
    //                 method: "GET",
    //                 url: AllUrl.allRegistratedStudent,
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             };
    //             fetchUsers(config);
    //         // }
    //         // getData()
    //     }, []);

    React.useEffect(() => {
        var config = {
            method: "GET",
            url: AllUrl.allActiveStudent,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        fetchUsers(config);
        // settable_data(table_data.table_data);
        // eslint-disable-next-line
    }, []);

    const columns = React.useMemo(
        () => [
            {
                header: "S. No",
                accessor: "S.N",
                Cell: ({ row: { original, index } }) => {
                    return (index + 1)
                },
                Filter: "",
                filter: "",
            },
            {
                header: "Name",
                accessor: "firstName",
                Filter: "",
                filter: ""
            },
            {
                header: "Father's Name",
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
                header: "Year",
                accessor: "year",
                Filter: SelectColumnFilter,
                filter: MultipleFilter,
            },
            {
                header: "Join Batch",
                accessor: "joinBatch",
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
                accessor: "fatherContactNumber",
                Filter: "",
                filter: "",
            },
            // {
            //     header: "Reg. Fees",
            //     accessor: "regFees",
            //     Filter: "",
            //     filter: ""
            // },
            {
                header: "Status",
                accessor: "status",
                Cell: ({ row: { original, index } }) => {
                    return (
                        <p
                            style={{ marginTop: "3px", marginBottom: "3px", fontWeight: "600" }}
                        >


                            {original.status === "false" ? "Deactive" : "Active"}

                        </p>
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
        rows,
        nextPage,
        previousPage,
        canPreviousPage,
        pageCount,
        gotoPage,
        canNextPage,
        setPageSize,
        pageOptions,
        state,
        setGlobalFilter,
        preGlobalFilteredRows,
        prepareRow,
    } = useTable(
        { columns, data: studentData.table_data },
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

    const { globalFilter, pageSize, pageIndex, } = state;




    return studentData.loading ? (
        <SkeletonColor></SkeletonColor>
    ) :
        // studentData.error ? (
        //     <OfflinePage />
        // ) : 

        (
            <Fragment>
                {studentData.loading && (
                    <Loader />
                )}
                <div className="container-fluid">
                    <div style={{ position: 'sticky', top: '80px', backgroundColor: '#f4f7fc', zIndex: '6', paddingBottom: '20px' }}>
                        <div className="row  mx-0 mt-3" >

                            <div className="d-flex">
                                <div style={{ marginLeft: '-12px' }}>
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

                                <div className="d-flex ml-auto me-3">
                                    <div className="d-flex mr-2" style={{ height: '40px', width: '42px', backgroundColor: '#fff', borderRadius: '3px', border: "1px solid #EDEDED" }}>

                                        <CDropdown variant="nav-item" style={{ color: 'white' }}>
                                            <CDropdownToggle
                                                placement="bottom-end"
                                                className="py-0"
                                                caret={false}
                                            >
                                                <img
                                                    src={filtericon}
                                                    alt=""
                                                    style={{
                                                        height: "22px",
                                                        width: "35px",
                                                        marginTop: "-35px",
                                                        marginLeft: "-13px",
                                                    }}
                                                />
                                            </CDropdownToggle>

                                            <CDropdownMenu
                                                component={"div"}
                                                className="pt-0 filter-dropdown-menu"
                                                placement="bottom-end"

                                            >
                                                <div className="p-lg-2 pb-0">
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

                        <thead style={{ position: 'sticky', top: '135px', width: '100%', backgroundColor: '#f4f7fc', zIndex: '5' }}>
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
                    <NoDataFound rows={rows} />

                    <Pagination data={studentData.table_data} rows={rows}
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

            </Fragment >
        );
}

const mapStateToProps = (state) => {
    return {
        studentData: state.accountStudentTableData,
    };
};

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (data) => dispatch(fetchStudentAccountData(data)),
        backOriginal: () => dispatch(changeDailyReport()),

    };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(StudentTableFirst);
