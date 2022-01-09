import React, { useState } from "react";
// import "../styles/Table.css";
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
// import updown_sort from "../../assests/image/updown_sort.svg";
import { TableCheckbox } from "../tableComponents/TableCheckbox";
// import tableData from "./pending_fees.json";
import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CPopover,
} from "@coreui/react";
import filtericon from "../../assests/image/AccountIcons/filter.svg";
import { CSVLink } from "react-csv";
import { DateRangePicker } from "rsuite";
// import React, { useState } from 'react';
// import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import './Styles/StudentAccountTable.css';
import updown_sort from '../../assests/image/updown_sort.svg';
// import { GlobalFilter } from '../../components/tableComponents/GlobalFilter';
import { isSuperAdmin } from '../../../helpers/SuperAdmin';
import { isAccountAdmin } from '../../../helpers/AccountAdmin';
import { isStudentAdmin } from '../../../helpers/StudentAdmin';
import allUrls from '../../../redux/constants/url'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
// import { TableCheckbox } from '../tableComponents/TableCheckbox';
import AllUrl from '../../../redux/constants/url';
import { connect } from 'react-redux';
import { fetchStudentAccountData } from '../../../redux/actionDispatcher/superAdmin/studentAccountTableDataDispatcher';
import SkeletonColor from '../../../helpers/Skeletrone';
// import { CSVDownload, CSVLink } from 'react-csv';

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
        </div>
      </Fragment>
    );
  }

// Define a default UI for filtering
function GlobalFilter({ filter, setFilter, preGlobalFilteredRows }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(filter);
    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 200);

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
                }}
                type="search"
                value={filter || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`Search ${count} records...`}
            />
            <i
                style={{ marginLeft: "-31px", color: "rgb(90, 96, 127,0.7)" }}
                className="fas fa-search"
            ></i>
        </>
    );
}

function StudentAccountTable({ fetchUsers, studentData }) {

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
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem("token");


    const getAllInfoOfStudent = async (original) => {
        setLoading(true)
        // set data or original table to localStorage we need it later
        localStorage.setItem('userEdit', JSON.stringify(original))
        let data = JSON.stringify({
            // "stdId": "353c55ed-1e67-48a3-9ed2-fa1dfaecec73" // trmporary true condition for chenking information
            "stdId": original.stdId,
        });
        console.log("_______");
        console.log(data);
        console.log("_______");

        let config = {
            method: 'post',
            url: allUrls.allInfoOfActiveStudent,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios(config)
        localStorage.setItem('userEdit', JSON.stringify(response.data))
        setLoading(false)

        if (isStudentAdmin()) {
            console.log("Navigated ");
            navigate('/student_admin_dashboard/studentprofile');
        }
        else if (isAccountAdmin()) {
            console.log("Navigated ");
            navigate('/account_admin_dashboard/studentprofile');
        }
        else if (isSuperAdmin()) {
            console.log("Navigated ");
            navigate('/admin_dashboard/studentprofile');
        }
    }


    // const data = React.useMemo(() => tableData, []);

    const mainColoumns = React.useMemo(
        () => [
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
                                getAllInfoOfStudent(original)
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
                    <div className='row d-flex d-inline-flex'>
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
                Filter: SelectColumnFilter,
                filter: MultipleFilter,
            },
            {
                header: 'Pending Fee',
                accessor: 'remain_Amount',
                Cell: ({ row: { original } }) => (
                    <div className='row d-flex d-inline-flex'>
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
            // {
            //     header: 'Action',
            //     accessor: "",
            //     Filter: "",
            //     filter: "",
            // },
        ],
        []
    );



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

            Cell: ({ row: { original, index } }) => (
                <div className="d-flex m-0 flex-column justify-content-start">
                    <img
                        alt="profile"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            // getAllInfoOfStudent(original)
                        }}
                        className="mx-auto"
                        src={original.photo}
                        width={50}
                        // textColor="#fff"
                        text="Image"
                    />
                    <p className="mx-auto"> {original.name}</p>
                </div >
            ),
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
            header: 'Mobile No.',
            accessor: 'mobile',
            Filter: "",
            filter: "",
        },
        {
            header: 'Stream',
            accessor: 'stream',
            Filter: "",
            filter: "",
        }
    ]

    const [columns, setColoumns] = useState(mainColoumns)


    const showDailyReport = () => {

        setColoumns(dailyReportColumn)




    }

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
        rows,
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

    const { globalFilter, pageSize, pageIndex, selectedRowIds } = state;
    var exportData = [];
    var exportCsv = [];
    const checkboxData = JSON.stringify(
        {
            selectedFlatRows: selectedFlatRows.map((row) => {
                let data = Object.assign({}, row.original);
                console.log(data);
                delete data.photo
                // console.log(data);

                console.log(data);
                exportData.push(data)
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

    return studentData.loading ? (
        <SkeletonColor></SkeletonColor>
    ) : studentData.error ? (
        <h2>{studentData.error}</h2>
    ) : (
        <Fragment>
            {loading && (
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
            <div className="container-fluid">
                <div className="row Stu-Acc-info " style={{ color: "rgb(90, 96, 127)", margin: "Auto", height: "70px" }} >
                    <div className=" info-col"  >
                        <h5 style={{ marginTop: "12px" }}>1900 <br /> <p >Total Students</p> </h5>
                    </div>
                    <div className=" info-col" >
                        <h5 style={{ marginTop: "12px" }}>2000000 <br /> <p>Total Amount</p> </h5>
                    </div>
                    <div className=" info-col" >
                        <h5 style={{ marginTop: "12px" }}>208000 <br /> <p >Total Paid Amount</p> </h5>
                    </div>
                    <div className=" info-col" >
                        <h5 style={{ marginTop: "12px" }}>10000 <br /> <p >Remaining Amount</p> </h5>
                    </div>
                    <div className=" info-col">
                        <h5 style={{ marginTop: "12px" }}>1000 <br /> <p >Waive Off</p> </h5>
                    </div>
                </div>
                <div className="row  mx-0 mt-3" style={{ width: "98%" }}>

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
                        <CSVLink className='btn  download-btn ml-3' data={exportCsv}>Download</CSVLink>

                        <div className="d-flex ml-1">
                            <DateRangePicker onExit={() => { setColoumns(mainColoumns) }} onChange={(val) => { console.log(val) }} appearance="default" className='stu-acc-table' placeholder="TO" style={{ width: 230 }} />
                            <button onClick={showDailyReport} className='date-range-button'>Daily report</button>
                        </div>


                        <div className="d-flex ml-auto me-4">
                            <div className="">

                                <CDropdown variant="nav-item">
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
            </div>

        </Fragment>
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
    };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountTable);

