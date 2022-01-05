import React, { useState } from 'react';
import StuAccmockdata from './StuAccmockData.json';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { useMemo } from 'react';
import './StudentAccountTable.css';
import updown_sort from '../../assests/image/updown_sort.svg';
import { GlobalFilter } from '../../components/tableComponents/GlobalFilter';
import { toast } from 'react-toastify';
// import { DateRangePicker } from 'rsuite';
// import 'rsuite/dist/rsuite-default.css';


const StudentAccount = () => {
    const [columns] = useState([
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
                  alt="kpkp"
                  style={{cursor: "pointer"}} onClick={()=>{toast(`${original.stdId} is ${original.name}`)}}
                  className="mx-auto"
                  src={original.photo}
                  width={50}
                  textColor="#fff"
                  text="Image"
                />
                {/* <p className="mx-auto"> {original.name}</p> */}
              </div>
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
        setPageSize, 
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter } = tableInstance

    const { globalFilter, pageSize } = state;
    const { pageIndex } = state;
    return (
        <>
            <div className="container-fluid">
                <div className="row Stu-Acc-info" style={{color:"rgb(90, 96, 127)" , margin: "Auto", height: "70px" ,backgroundColor: "#fff"}} >
                    <div className="col info-col"style={{ borderRight: "2px solid rgb(90, 96, 127)"}} >
                        <h5>1900 <br /> <p >Total Students</p> </h5>
                    </div>
                    <div className="col info-col" style={{ borderRight: "2px solid rgb(90, 96, 127)"}}>
                        <h5>2000000 <br /> <p>Total Amount</p> </h5>
                    </div>
                    <div className="col info-col"style={{ borderRight: "2px solid rgb(90, 96, 127)"}}>
                        <h5>208000 <br /> <p >Total Paid Amount</p> </h5>
                    </div>
                    <div className="col info-col"style={{ borderRight: "2px solid rgb(90, 96, 127)"}}>
                        <h5>10000 <br /> <p >Remaining Amount</p> </h5>
                    </div>
                    <div className="col info-col">
                        <h5>1000 <br /> <p >Waive Off</p> </h5>
                    </div>
                </div>
                <div className="row d-flex justify-content-end mt-4">
                    <div className="col-2">
                        <select className='select-acc-student' value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                            {
                                [10,25 ,50].map(pageSize => (
                                    <option value={pageSize} key={pageSize} >
                                        Show {pageSize}
                                    </option>
                                )

                                )
                            }
                        </select>
                    </div>
                  <div className="col-3">
                    {/* <DateRangePicker/> */}
                  </div>
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
