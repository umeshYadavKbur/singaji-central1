import * as React from 'react';
import {useMemo} from 'react';
import {GlobalFilter} from './tableComponents/GlobalFilter';
import {useTable,useSortBy,useGlobalFilter,usePagination,useRowSelect} from 'react-table';
// import MockData from './tableComponents/mockData.json'
import Column from './tableComponents/Column'
import './styles/Table.css'
import {ToastContainer} from "react-toastify";
import {TableCheckbox} from './tableComponents/TableCheckbox';
// import { useEffect } from 'react';
import {baseUrl} from '../../../redux/constants/url';
// import { getDataFromApi } from '../../../services/getApi';
// import axios from 'axios'
import {fetchAdminTableData} from '../../../redux/actionDispatcher/adminTableDatadispatcher';
import {connect} from 'react-redux';
import SkeletonColor from '../../../helpers/Skeletrone';
import {AdminStatusChange} from '../../../redux/actionDispatcher/adminStatusChangeDispatcher'
import Swal from 'sweetalert2';


function DataTable({table_data,fetchAdminTable,AdminStatusChange}) {
    const token = localStorage.getItem("token");
    // ////////////////////

    const Column = [
        {
            header: "S No",
            accessor: "Srno",
            Cell: ({row: {original,index}}) => {
                return (index + 1)
            }
        },
        {
            header: 'Email',
            accessor: 'email'
        },
        {
            header: 'Name',
            accessor: 'name'
        },
        {
            header: 'AdminId',
            accessor: 'userId'
        },
        {
            header: 'Role',
            accessor: 'role',
            //  Cell: ({row: {original}}) => (
            //      original.roleId === 1 ? "Super Admin" : original.roleId === 2 ? "Admin" : original.roleId === 1 ? "Student" : ''   
            //  )
        }
        ,
        {
            header: 'Status',
            accessor: 'is_active',
            Cell: ({row: {original}}) => (
                <button
                    style={
                        original.is_active === 1
                            ? {
                                width: "80px",
                                borderRadius: "5px",
                                backgroundColor: "blue",
                                color: "white",
                                fontWeight: "bold",
                                border: '1px #FFC700',
                                // height: "15px"
                            }
                            : {
                                width: "80px",
                                backgroundColor: "#8585ed",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                color: "white",
                                border: 'none'
                            }}
                    onClick={() => {
                        // setData(original.status)
                        console.log(original.email)
                        // alert("Do you want to change status of  : " + original.name)
                        Swal.fire({
                            title: `${original.is_active === 0 ? 'Active' : 'Deactive'}`,

                            html:
                                '<hr>' +
                                'Are you sure?' + '<br>' +
                                `You want to ${original.is_active === 0 ? 'Active' : 'Deactive'} this admin`,
                            // icon: 'warning',
                            showCancelButton: true,
                            // showCancelButton: true,
                            cancelButtonText:'Cancel',
                            confirmButtonText:  `${original.is_active === 0 ? 'Active' : 'Deactive'}`,
                            showCloseButton: true,
                            cancelButtonColor: 'gray',
                            confirmButtonColor: "blue",
                            showLoaderOnDeny:true,
                            reverseButtons:true

                        }).then(async(result) => {
                            if(result.isConfirmed) {
                               let res =await AdminStatusChange(original);
                               if(res === 200)
                               {
                                   var config = {
                                       method: "GET",
                                       url: `${baseUrl}/api/infoOfAdmins`,
                                       headers: {
                                           Authorization: `Bearer ${token}`,
                                           "Content-Type": "application/json",
                                       },
                                   };
                                   fetchAdminTable(config);
                               }
                            //    console.log("admin status change",res);
                            }
                        })

                    }}>
                    {original.is_active === 1 ? 'Active' : 'Deactive'}
                </button>
            )
        }

    ]

    // ////////////////////

    console.log("====================================");
    console.log(table_data);
    console.log("====================================");

    React.useEffect(() => {
        var config = {
            method: "GET",
            url: `${baseUrl}/api/infoOfAdmins`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        fetchAdminTable(config);
        // settable_data(table_data.table_data);
        // eslint-disable-next-line
    },[]);

    const columns = useMemo(() => Column,[])
    // const data = useMemo(() => MockData, [])

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
    } = useTable({
        columns,
        data: table_data.table_data,
    },

        useGlobalFilter,useSortBy,
        usePagination,useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        header: ({getToggleAllRowsSelectedProps}) => (
                            <TableCheckbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({row}) => (
                            <TableCheckbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        }

    )


    const {globalFilter} = state
    const {pageIndex,pageSize,selectedRowIds} = state


    const checkboxData =
        JSON.stringify(
            {
                selectedRowIds: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                    d => d.original
                ),
            },
            null,
            2
        )
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

            <div style={{backgroundColor: "#F4F7FC",height: "auto",width: "auto"}}>

                <div className="d-flex">
                    <div className='ms-4'>
                        <select style={{height: "auto",width: "auto",outline: "none",border: "none",borderRadius: "10px",padding: "5px"}} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                            {
                                [10,25,50].map(pageSize => (
                                    <option value={pageSize} key={pageSize}>show Entrie {pageSize}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='ml-auto me-5'>
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
                    </div>

                </div>
                <table {...getTableProps()} id="customers" className="table table-sm" >
                    <thead >
                        {
                            headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map((column) => (
                                            <th  {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? <i className="fas fa-chevron-down ms-2"></i> : <i className="fas fa-chevron-up ms-2"></i>) : ''}
                                                </span></th>
                                        ))
                                    }

                                </tr>
                            ))
                        }
                    </thead>
                    <tbody  {...getTableBodyProps()}>
                        {
                            page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return (

                                                    <td {...cell.getCellProps()}>{cell.render('Cell')} </td>

                                                )
                                            })
                                        }

                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
                <div style={{border: "rgb(246 249 252)"}} className='d-flex mb-4'>
                    <div className='mx-4'>
                        <span>
                            {/* Page{' '}
                        <strong>{pageIndex + 1} of {pageOptions.length} </strong> */}
                            Showing {(page.length * (pageIndex + 1) - (page.length - 1))} to  {page.length * (pageIndex + 1)} of  {pageCount * pageSize}{' '} Entries {"  "}
                        </span>
                    </div>

                    <div className='ml-auto me-3' >
                        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button> */}
                        <button style={{outline: "none",border: "1px solid gray",borderRadius: "10px 0 0 10px"}} onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                        <button style={{outline: "none",border: "1px solid gray"}} onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>1</button>
                        <button style={{outline: "none",border: "1px solid gray"}} onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>2</button>
                        <button style={{outline: "none",border: "1px solid gray"}} onClick={() => gotoPage(pageIndex + 2)} disabled={!canNextPage}>3</button>
                        <button style={{outline: "none",border: "1px solid gray"}} onClick={() => gotoPage(pageIndex + 3)} disabled={!canNextPage}>4</button>
                        <button style={{outline: "none",border: "1px solid gray",borderRadius: "0 10px  10px 0"}} onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                        {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button> */}
                    </div>
                </div>
            </div>


        </>
    );
}

const mapStateToProps = (state) => {
    return {
        table_data: state.adminTableData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAdminTable: (data) => dispatch(fetchAdminTableData(data)),
        AdminStatusChange: (data) => dispatch(AdminStatusChange(data)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(DataTable);



