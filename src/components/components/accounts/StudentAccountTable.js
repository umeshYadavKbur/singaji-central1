import React, { useState } from 'react';
import StuAccmockdata from './StuAccmockData.json';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { useMemo } from 'react';
import './StudentAccountTable.css';
import updown_sort from '../../assests/image/updown_sort.svg';
import { GlobalFilter } from '../../components/tableComponents/GlobalFilter';
import { Link } from 'react-router-dom';
import { isSuperAdmin } from '../../../helpers/SuperAdmin';
import { isAccountAdmin } from '../../../helpers/AccountAdmin';
import { isStudentAdmin } from '../../../helpers/StudentAdmin';


const StudentAccount = () => {

    const getRoutesRoleWise = () => {
        if (isStudentAdmin()) {
            return '/student_admin_dashboard/addnewstudent';
        } else if (isAccountAdmin()) {
            return '/account_admin_dashboard/addnewstudent';
        }
        else if (isSuperAdmin()) {
            return '/admin_dashboard/addnewstudent';
        }
    }
    const [columns] = useState([
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
                    <Link to={getRoutesRoleWise()}>
                        <img
                            alt="profile"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                localStorage.setItem('userEdit', JSON.stringify(original))
                            }}
                            className="mx-auto"
                            src={original.photo}
                            width={50}
                            textColor="#fff"
                            text="Image"
                        />
                    </Link>
                    <p className="mx-auto"> {original.name}</p>
                </div>
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
        },
        {
            Header: 'Village',
            accessor: 'village'
        },
        {
            Header: 'Received Fee',
            accessor: 'received_Amount'
        },
        {
            Header: 'Pending Fee',
            accessor: 'remain_Amount'
        },
        {
            Header: 'Action',
            accessor: ''
        }
    ])

    // -----------------------------------------------------------------------------------------------
    // const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => StuAccmockdata, [])

    const tableInstance = useTable({
        columns,
        data
    },
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    const { getTableProps, getTableBodyProps, headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter } = tableInstance

    const { globalFilter } = state;
    const { pageIndex } = state;
    return (
        <>
            <div className="container-fluid">
                <div className="row Stu-Acc-info" >
                    <div className="col-2 info-col">
                        <h5>1900 <br /> <p style={{ color: "rgb(247, 146, 42)", marginBottom: "0px" }}>Total Students</p> </h5>
                    </div>
                    <div className="col-2 info-col">
                        <h5>2000000 <br /> <p style={{ color: "rgb(247, 146, 42)", marginBottom: "0px" }}>Total Amount</p> </h5>
                    </div>
                    <div className="col-2 info-col">
                        <h5>208000 <br /> <p style={{ color: "rgb(247, 146, 42)", marginBottom: "0px" }}>Total Paid Amount</p> </h5>
                    </div>
                    <div className="col-2 info-col">
                        <h5>10000 <br /> <p style={{ color: "rgb(247, 146, 42)", marginBottom: "0px" }}>Remaining Amount</p> </h5>
                    </div>
                    <div className="col-2 info-col">
                        <h5>1000 <br /> <p style={{ color: "rgb(247, 146, 42)", marginBottom: "0px" }}>Waive Off</p> </h5>
                    </div>
                </div>
                <div className="row d-flex justify-content-end">
                    <div className="col-3" style={{ marginRight: "16px" }} >
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                                            {column.isSorted ? (column.isSortedDesc ? '' : '') : ''}
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
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                </div>
            </div>

        </>
    )
}

export default StudentAccount
