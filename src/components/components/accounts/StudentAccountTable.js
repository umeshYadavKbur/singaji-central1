import React, { useState } from "react";
import { Fragment, useMemo } from "react";
import downloadPdf from "./PdfGenerator";
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
import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CPopover,
} from "@coreui/react";
import filtericon from "../../assests/image/AccountIcons/filter.svg";
import { DateRangePicker } from "rsuite";
import './Styles/StudentAccountTable.css';
import updown_sort from '../../assests/image/updown_sort.svg';

import allUrls from '../../../redux/constants/url'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "rsuite/dist/rsuite.min.css";
import AllUrl from '../../../redux/constants/url';
import { connect } from 'react-redux';
import { fetchStudentAccountData, getDailyReport, changeDailyReport, accountAction } from '../../../redux/actionDispatcher/superAdmin/studentAccountTableDataDispatcher';
import SkeletonColor from '../../../helpers/Skeletrone';
import Pagination from "../../assests/common/Pagination";
import Loader from "../../assests/common/Loader";

//importing for downloading data
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import "jspdf-autotable";



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

function StudentAccountTable({ backOriginal, getReport, fetchUsers, studentData, accountAction }) {
    const [is_dailyReport, set_is_dailyReport] = useState(false)
    const [MoneyCount, setMoneyCount] = useState({ TStudent: 0, TAmount: 0, TpaidAmount: 0, RAmount: 0, WaiveOff: 0, TpaidAmountByDailyReport: 0 });
    const [exportCsv, setExportCsv] = useState([])



    //for exporting data in csv
    function getExportFileBlob({ columns, data, fileType, fileName }) {
        if (fileType === "csv") {
            // CSV Export
            const headerNames = columns.map((col) => col.exportValue);
            const csvString = Papa.unparse({ fields: headerNames, data });
            return new Blob([csvString], { type: "text/csv" });
        }
        //PDF Export
        if (fileType === "pdf") {
            //Check it out here 
            console.log('====================================');
            console.log("CAlled ", data);
            console.log('====================================');
            setExportCsv(data)
            downloadPdf(exportCsv)

            return false;
        }

        // Other formats goes here
        return false;
    }

    React.useEffect(() => {
        var config = {
            method: "GET",
            url: AllUrl.accountStudent,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        fetchUsers(config);
        // settable_data(table_data.table_data);
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        let data = studentData?.table_data;
        console.log(data)

        let RAmount = 0;
        let TAmount = 0;
        let TpaidAmount = 0;
        let WaiveOff = 0;
        let TpaidAmountByDailyReport = 0;
        data.forEach((ele) => {
            RAmount += ele?.remain_Amount
            TAmount += ele?.total_Fees

            TpaidAmount += ele?.received_Amount;
            TpaidAmountByDailyReport += ele?.ReceivedAmount
            WaiveOff += ele?.WaiveOff;
        })

        setMoneyCount((val) => {
            return {

                'TStudent': data.length,
                RAmount,
                TAmount,
                TpaidAmount,
                WaiveOff,
                TpaidAmountByDailyReport

            }
        })


        // console.log(MoneyCount)


    }, [studentData.table_data]);


    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem("token");
    const [date, setDate] = useState({})


    ////////////////////////////
    const getAllInfoOfStudent = (original, is_reciptBtn) => {
        setLoading(true)
        let data = JSON.stringify({
            "stdId": original.stdId,
        });

        let config = {
            method: 'post',
            url: allUrls.allInfoOfActiveStudent,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        // const response = await axios(config)
        accountAction(config, navigate, is_reciptBtn, setLoading);

    }
    /////////////////////////////////////

    // const data = React.useMemo(() => tableData, []);
    const mainColoumns = [
        {
            header: "S No",
            accessor: "Srno",
            Cell: ({ row: { original, index } }) => {
                return index + 1;
            },
            Filter: "",
            filter: "",
        },
        {
            header: "Profile",
            accessor: "photo",

            Cell: ({ row: { original, index } }) => (
                <div className="d-flex m-0 flex-column justify-content-start">
                    <img
                        alt="profile"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            getAllInfoOfStudent(original, false)
                        }}
                        className="mx-auto"
                        src={original.photo}
                        width={50}
                        textColor="#fff"
                        text="Image"
                    />
                </div >
            ),
            Filter: "",
            filter: "",
        },
        {
            header: 'Name',
            accessor: 'name',
            Filter: "",
            filter: "",
        },
        {
            header: 'Father name',
            accessor: 'fathersName',
            Filter: "",
            filter: "",
        },
        {
            header: "Mobile no",
            accessor: "mobile",
            Filter: "",
            filter: "",
        },
        {
            header: "Stream",
            accessor: "stream",
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
        },
        {
            header: 'Village',
            accessor: 'village',
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
        },
        {
            header: 'Received Fee',
            accessor: 'received_Amount',
            Cell: ({ row: { original } }) => (
                <div className='row d-flex '>
                    <div className="col">
                        <span className='recieved-fee-circle' style={{ backgroundColor: "#56F000" }}></span>

                    </div>
                    <div className="col">
                        <span className='' >
                            {original.received_Amount}
                        </span>
                    </div>
                </div>
            ),
            Filter: "",
            filter: "",
        },
        {
            header: 'Pending Fee',
            accessor: 'remain_Amount',
            Cell: ({ row: { original } }) => (
                <div className='row d-flex '>
                    <div className="col">
                        <span className='recieved-fee-circle' style={{ backgroundColor: "#FCE83A" }}></span>

                    </div>
                    <div className="col">
                        <span className='' >
                            {original.remain_Amount}
                        </span>
                    </div>
                </div>
            ),
            Filter: "",
            filter: "",
        },
        {
            header: 'Action',
            accessor: 'accesory',
            Cell: ({ row: { original, index } }) => {
                return (
                    // <div className="d-flex m-0 flex-column justify-content-start">
                    <button className="table_btn_size" onClick={() => {
                        getAllInfoOfStudent(original, true)
                    }} style={{ backgroundColor: "#F99300", fontWeight: 'bold', color: 'white', borderRadius: '5px' }} >Receipt</button>
                    // </div >
                )
            },
            Filter: "",
            filter: "",
        },
    ];



    const dailyReportColumn = [
        {
            header: 'S.no',
            accessor: "Srno",
            Cell: ({ row: { original, index } }) => {
                return (index + 1)
            },
            Filter: "",
            filter: "",
        },
        {
            header: "Name",
            accessor: "name",
            Filter: "",
            filter: "",
        },
        {
            header: 'Father name',
            accessor: 'fathersName',
            Filter: "",
            filter: "",
        },
        {
            header: 'Stream',
            accessor: 'stream(year)',
            Filter: "",
            filter: "",
        },
        {
            header: 'Village',
            accessor: 'village',
            Filter: "",
            filter: "",
        },
        {
            header: 'Date',
            accessor: 'AccountsReceiptDate',
            Filter: "",
            filter: "",
        },
        {
            header: 'Received amount',
            accessor: 'ReceivedAmount',
            Filter: "",
            filter: "",
        },
        {
            header: 'Waive Off amount',
            accessor: 'WaiveOff',
            Filter: "",
            filter: "",
        }

    ]

    const [columns, setColoumns] = useState(mainColoumns)
    const showDailyReport = async () => {
        setLoading(true)

        function convert(str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
        }

        var first = convert(date.a)
        var last = convert(date.b)

        var config = {
            method: "GET",
            url: `${AllUrl.dailyReport}${first}&${last}`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const result = await axios(config)
        //if the data is getting successfully than they set the data to upcoming data
        setLoading(false)
        if (result.status === 200) {
            getReport(result.data)
            setColoumns(dailyReportColumn)
            set_is_dailyReport(true)
        }
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        pageCount,
        gotoPage,
        canNextPage,
        setPageSize,
        pageOptions,
        selectedFlatRows,
        state,
        setGlobalFilter,
        exportData,
        preGlobalFilteredRows,
        prepareRow,
    } = useTable(
        {
            columns,
            data: studentData.table_data,
            getExportFileBlob,
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination,
        useExportData,
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
    // var exportData = [];
    // var exportCsv = [];

    const checkboxData = JSON.stringify(
        {
            selectedFlatRows: selectedFlatRows.forEach((row) => {
                let data = Object.assign({}, row.original);
                // console.log(data);
                delete data.photo;
                if (data?.ReceivedAmount)
                    data.ReceivedAmount = (data?.ReceivedAmount)?.toString();

                console.log(data);
                // exportData.push(data)
                // console.log(selectedData);
                exportCsv.push(data)

            }
            )
            // console.log);
        },
        null,
        2
    );
    console.log(checkboxData)

    /// for download pdf



    const getBackPosition = () => {
        backOriginal()
        setColoumns(mainColoumns)
    }

    return studentData.loading ? (
        <SkeletonColor></SkeletonColor>
    ) : studentData.error ? (
        <h2>{studentData.error}</h2>
    ) : (
        <Fragment>
            {loading && (
                <Loader />
            )}
            <div className="container-fluid">
                <div style={{ position: 'sticky', top: '80px', backgroundColor: '#f4f7fc', zIndex: '6', paddingBottom: '10px' }}>
                    <div className="row Stu-Acc-info " style={{ color: "rgb(90, 96, 127)", margin: "Auto", height: "70px" }} >
                        <div className=" info-col"  >
                            <h5 style={{ marginTop: "12px" }}>{MoneyCount.TStudent} <br /> <p >Total Students</p> </h5>
                        </div>
                        <div className=" info-col" >
                            <h5 style={{ marginTop: "12px" }}>{MoneyCount.TAmount ? MoneyCount.TAmount : '-'} <br /> <p>{is_dailyReport ? '-' : 'Total Amount'}</p> </h5>
                        </div>
                        <div className=" info-col" >
                            <h5 style={{ marginTop: "12px" }}>{is_dailyReport ? MoneyCount.TpaidAmountByDailyReport : MoneyCount.TpaidAmount} <br /> <p >{is_dailyReport ? 'T. Received Amount' : 'Total Paid Amount'}</p> </h5>
                        </div>
                        <div className=" info-col" >
                            <h5 style={{ marginTop: "12px" }}>{MoneyCount.RAmount ? MoneyCount.RAmount : '-'} <br /> <p >{is_dailyReport ? '-' : 'Remaining Amount'}</p> </h5>
                        </div>
                        <div className=" info-col">
                            <h5 style={{ marginTop: "12px" }}>{MoneyCount.WaiveOff ? MoneyCount.WaiveOff : '0'}<br /> <p >Waive Off</p> </h5>
                        </div>
                    </div>
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


                            <div className="d-flex  ml-3">
                                <DateRangePicker onClean={(e) => {
                                    e.preventDefault();
                                    getBackPosition()
                                    set_is_dailyReport(false)
                                }}

                                    onChange={(value) => {

                                        if (!value) {

                                            return;
                                        }
                                        var a = value[0]
                                        var b = value[1]

                                        setDate({
                                            a, b
                                        })
                                    }} appearance="default" className='stu-acc-table' placeholder="TO" style={{ width: 230 }} />
                                <button onClick={showDailyReport} className='date-range-button'>Daily report</button>
                            </div>
                            <div class="btn-group  ml-1">
                                <button class="btn  btn-sm download-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Download
                                </button>
                                <div class="dropdown-menu mt-1">
                                    <div >
                                        <button className="dropdown-item" style={{ fontWeight: 'bold' }}
                                            onClick={() => {
                                                exportData("csv", false);
                                            }}
                                        >
                                            Excel
                                        </button>
                                    </div>
                                    {/* {is_dailyReport && */}
                                    <div className="dropdown-item" onClick={() => {
                                        exportData("pdf", false)
                                    }}><b>Pdf</b></div>
                                    {/* } */}

                                </div>
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
                                                    height: "35px",
                                                    width: "35px",
                                                    marginTop: "-35px",
                                                    marginLeft: "-13px",
                                                }}
                                            />
                                        </CDropdownToggle>

                                        <CDropdownMenu
                                            component={"div"}
                                            style={{ width: 'auto' }}
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
                    <thead style={{ position: 'sticky', top: '212px', width: '100%', backgroundColor: '#f4f7fc', zIndex: '5' }}>
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
                    <tbody {...getTableBodyProps()}
                        style={{ position: 'sticky', width: '100%', backgroundColor: 'red', height: '450px'}}
                    >
                        {
                            studentData ?
                                (<>
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
                                </>)
                                : (<h2>hello</h2>)
                        }


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
        getReport: (data) => dispatch(getDailyReport(data)),
        backOriginal: () => dispatch(changeDailyReport()),
        accountAction: (config, navigate, is_reciptBtn, setLoading) => dispatch(accountAction(config, navigate, is_reciptBtn, setLoading)),
    };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountTable);

