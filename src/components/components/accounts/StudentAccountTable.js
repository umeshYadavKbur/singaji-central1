import React, { useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import './Styles/StudentAccountTable.css';
import updown_sort from '../../assests/image/updown_sort.svg';
import { GlobalFilter } from '../../components/tableComponents/GlobalFilter';
import { isSuperAdmin } from '../../../helpers/SuperAdmin';
import { isAccountAdmin } from '../../../helpers/AccountAdmin';
import { isStudentAdmin } from '../../../helpers/StudentAdmin';
import allUrls from '../../../redux/constants/url'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import { TableCheckbox } from '../tableComponents/TableCheckbox';
import AllUrl from '../../../redux/constants/url';
import { connect } from 'react-redux';
import { fetchStudentAccountData } from '../../../redux/actionDispatcher/superAdmin/studentAccountTableDataDispatcher';
import SkeletonColor from '../../../helpers/Skeletrone';

// import { TablePagination } from 'react-pagination-table';


const StudentAccount = ({ fetchUsers, studentData }) => {

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











    const mainColoumns = [
        {
            Header: 'S.no',
            accessor: "Srno",
            Cell: ({ row: { original, index } }) => {
                return (index + 1)
            }
        },
        {

            Header: "Photo",
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

        },

        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Father name',
            accessor: 'fathersName'
        },
        {
            Header: 'Mobile No.',
            accessor: 'mobile'
        },
        {
            Header: 'Stream',
            accessor: 'stream'
        },
        {
            Header: 'Village',
            accessor: 'village'
        },
        {
            Header: 'Received Fee',
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
        },
        {
            Header: 'Pending Fee',
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
        },
        {
            Header: 'Action',
            accessor: ''
        }
    ]

    const dailyReportColumn = [
        {
            Header: 'S.no',
            accessor: "Srno",
            Cell: ({ row: { original, index } }) => {
                return (index + 1)
            }
        },
        {
            Header: "Name",
            accessor: "name",

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
                    <p className="mx-auto"> {original.name}</p>
                </div >
            ),
        },
        {
            Header: 'Father name',
            accessor: 'fathersName'
        },
        {
            Header: 'Mobile No.',
            accessor: 'mobile'
        },
        {
            Header: 'Stream',
            accessor: 'stream'
        }
    ]

    const [columns, setColoumns] = useState(mainColoumns)

    const showDailyReport = () => {

        setColoumns(dailyReportColumn)




    }
    // -----------------------------------------------------------------------------------------------
    // const columns = useMemo(() => COLUMNS, [])
    // const data = useMemo(() => StuAccmockdata, [])
    // studentData

    const tableInstance = useTable({
        columns,
        data: studentData.table_data
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
                        Header: ({ getToggleAllRowsSelectedProps }) => (
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

    )

    const { getTableProps, getTableBodyProps, headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        setPageSize,
        pageOptions,
        pageCount,
        selectedFlatRows,
        prepareRow,
        state,
        setGlobalFilter } = tableInstance

    const { globalFilter, pageSize } = state;
    const { pageIndex } = state;
    const checkboxData = JSON.stringify(
        {
            selectedFlatRows: selectedFlatRows.map((row) => row.original)
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
        <>
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
                    <div className="col d-flex">
                        <select className='form-select select-acc-student' value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                            {
                                [10, 25, 50].map(pageSize => (
                                    <option value={pageSize} key={pageSize} >
                                        Show {pageSize}
                                    </option>
                                )

                                )
                            }
                        </select>
                        <div className="col">
                            <DateRangePicker onExit={() => { setColoumns(mainColoumns) }} onChange={(val) => { console.log(val) }} appearance="default" className='stu-acc-table' placeholder="TO" style={{ width: 230 }} />
                            <button onClick={showDailyReport} className='date-range-button'>Daily report</button>
                        </div>
                    </div>

                    <div className="col-6 d-flex justify-content-end " >
                        <div style={{ marginRight: '-9px' }}>

                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                        </div>
                    </div>
                </div>


                {/* <GlobalFilter/> */}
                <table id='customers' {...getTableProps()} >
                    <thead>
                        {headerGroups.map((headerGroups) => (
                            <tr {...headerGroups.getHeaderGroupProps()}>

                                {headerGroups.headers.map(column => (
                                    <th{...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span>
                                            {/* {column.isSorted ? (column.isSortedDesc ? <img src={updown_sort} style={{ marginLeft: "5px" }} alt="" /> : <img src={updown_sort} style={{ marginLeft: "5px" }} alt="" />) : ''} */}
                                            {/* {column.isSorted ? (column.isSortedDesc ? '' : '') : ''} */}
                                            <img src={updown_sort} style={{ marginLeft: "5px" }} alt="" />
                                        </span>
                                    </th>
                                ))}


                            </tr>
                        ))}

                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} >
                                        {
                                            row.cells.map(cell => {
                                                return <td{...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })
                                        }

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <div>
                    <span>
                    Showing {page.length * (pageIndex + 1) - (page.length - 1)} to{" "}
                    {page.length * (pageIndex + 1)} of {pageCount * pageSize} Entries{" "}
                    {"  "}
                    </span>
                   
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                </div>
            </div>

        </>
    )
}
//Getting the state from the store
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
export default connect(mapStateToProps, mapDispatchToProps)(StudentAccount);

