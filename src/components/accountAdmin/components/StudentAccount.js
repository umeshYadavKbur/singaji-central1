import React from 'react';
import StuAccmockdata from './StuAccmockData.json';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { useMemo } from 'react';
import './StudentAccount.css';
import updown_sort from '../assests/image/TableIcons/updown_sort.svg';
import { GlobalFilter } from '../../components/tableComponents/GlobalFilter';


const StudentAccount = () => {
    const COLUMNS = [
        {
            Header: 'S.no',
            accessor: "Srno",
            Cell: ({ row: { original, index } }) => {
                return (index + 1)
            }
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
    ]

    // -----------------------------------------------------------------------------------------------

    const columns = useMemo(() => COLUMNS, [])
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
                    <div className="col-2" style={{ marginRight: "16px" }} >
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
