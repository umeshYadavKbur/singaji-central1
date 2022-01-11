import * as React from 'react';
// import { useMemo } from 'react';
import { GlobalFilter } from './tableComponents/GlobalFilter';
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import './styles/Table.css'
import { ToastContainer } from "react-toastify";
import { TableCheckbox } from './tableComponents/TableCheckbox';
import AllUrl from '../../redux/constants/url';
import { fetchAdminTableData, getAdminTableData } from '../../redux/actionDispatcher/superAdmin/adminTableDatadispatcher';
import { connect } from 'react-redux';
import SkeletonColor from '../../helpers/Skeletrone';
import { AdminStatusChange } from '../../redux/actionDispatcher/superAdmin/adminStatusChangeDispatcher'
import Swal from 'sweetalert2';
import updown_sort from '../assests/image/updown_sort.svg'
import { ActivateButton, DeactivateButton } from '../assests/common/Color';


function DataTable({ table_data, fetchAdminTable, AdminStatusChange, getAdminTableData }) {
    const token = localStorage.getItem("token");




    React.useEffect(() => {
        var config = {
            method: "GET",
            url: AllUrl.infoAllAdmin,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        fetchAdminTable(config);
        // settable_data(table_data.table_data);
        // eslint-disable-next-line
    }, []);

    const [columns] = React.useState([
        {
            header: "S No",
            accessor: "Srno",
            Cell: ({ row: { original, index } }) => {
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
        },
        {
            header: 'Status',
            accessor: 'is_active',
            Cell: ({ row: { original } }) => (
                <button
                    style={
                        original.is_active === 1
                            ? ActivateButton
                            : DeactivateButton}
                    onClick={() => {
                        Swal.fire({
                            title: `${original.is_active === 0 ? 'Active' : 'Deactive'}`,

                            html:
                                '<hr>' +
                                'Are you sure?' +
                                '<br>' +
                                `You want to ${original.is_active === 0 ? 'Active' : 'Deactive'} this admin`,
                            // icon: 'warning',
                            showCancelButton: true,
                            // showCancelButton: true,
                            cancelButtonText: 'Cancel',
                            confirmButtonText: `${original.is_active === 0 ? 'Active' : 'Deactive'}`,
                            showCloseButton: true,
                            cancelButtonColor: 'gray',
                            confirmButtonColor: "#4f83df",
                            showLoaderOnDeny: true,
                            reverseButtons: true

                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                let res = await AdminStatusChange(original);
                                if (res === 200) {
                                    var config = {
                                        method: "GET",
                                        url: AllUrl.infoAllAdmin,
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                            "Content-Type": "application/json",
                                        },
                                    };
                                    getAdminTableData(config);
                                }
                            }
                        })

                    }}>
                    {original.is_active === 1 ? 'Active' : 'Deactive'}
                </button>
            )
        }
    ])
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

        useGlobalFilter, useSortBy,
        usePagination, useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        header: ({ getToggleAllRowsSelectedProps }) => (
                            <TableCheckbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <TableCheckbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        }
    )

    const { globalFilter } = state
    const { pageIndex, pageSize, selectedRowIds } = state


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
            {table_data.second_loading && (
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

            <div style={{ backgroundColor: "#F4F7FC", height: "auto", width: "auto" }}>

                <div className="d-flex">
                    <div className=''>
                        <select className="form-select table_select_row_options" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                            {
                                [10, 25, 50, 100].map(pageSize => (
                                    <option value={pageSize} key={pageSize}>Show Entries {pageSize}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='d-flex ml-auto me-1'>
                        <div className='ml-auto me-4'>
                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
                        </div>
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
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <i style={{ transform: 'scale(0.6)' }} className="fas fa-chevron-down"></i>
                                                        ) : (
                                                            <i style={{ transform: 'scale(0.6)' }} className="fas fa-chevron-up"></i>
                                                            // <img src={updown_sort} style={{ marginLeft: "5px" }} alt="" />
                                                        )
                                                    ) : (

                                                        column.id !== 'Srno' && column.id !== 'selection' && <img src={updown_sort} style={{ marginLeft: "5px" }} alt="" />


                                                    )}
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
                <div style={{ border: "rgb(246 249 252)" }} className="d-flex mb-4">
                    <div className="mx-4">
                        <span style={{ fontWeight: '700', color: "gray", }}>
                            Showing {page.length * (pageIndex + 1) - (page.length - 1)} to{" "}
                            {page.length * (pageIndex + 1)} of {pageCount * pageSize} Entries{" "}
                            {"  "}
                        </span>
                    </div>
                    <div className="ml-auto me-3">
                        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button> */}
                        <button
                            style={canPreviousPage ?
                                { height: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray", borderRadius: " 10px 0px 0px 10px" }
                                : {
                                    backgroundColor: "#bbbbbb", height: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white", borderRadius: " 10px 0px 0px 10px "
                                }}
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            Previous
                        </button>
                        <button
                            style={{
                                height: "35px", width: "30px",
                                color: "gray",
                                fontWeight: '700', outline: "none", border: "2px solid gray", color: 'white', backgroundColor: '#898989'
                            }}
                        >
                            {pageIndex + 1}
                        </button>
                        <button
                            style={
                                pageOptions.length > pageIndex + 1 ?
                                    { height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray" }
                                    : {
                                        backgroundColor: "#bbbbbb", height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white"
                                    }
                            }
                            onClick={() => gotoPage(pageIndex + 1)}
                            disabled={pageOptions.length < pageIndex + 2}
                        >
                            {pageIndex + 2}
                        </button>
                        <button
                            disabled={pageOptions.length < pageIndex + 3}
                            style={
                                pageOptions.length > pageIndex + 2 ?
                                    { height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray" }
                                    : {
                                        backgroundColor: "#bbbbbb", height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white"
                                    }}
                            onClick={() => {
                                gotoPage(pageIndex + 2);
                            }}
                        >
                            {pageIndex + 3}
                        </button>
                        <button
                            style={
                                pageOptions.length > pageIndex + 3 ?
                                    { height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray" }
                                    : {
                                        backgroundColor: "#bbbbbb", height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white"
                                    }}
                            onClick={() => gotoPage(pageIndex + 3)}
                            disabled={pageOptions.length < pageIndex + 4}
                        >
                            {pageIndex + 4}
                        </button>
                        <button
                            style={canNextPage ?
                                { height: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray", borderRadius: "0px 10px 10px 0px" }
                                : {
                                    backgroundColor: "#bbbbbb", height: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white", borderRadius: "0px 10px 10px 0px"
                                }}
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            Next - {pageOptions.length - pageIndex - 1}
                        </button>
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
        getAdminTableData: (data) => dispatch(getAdminTableData(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);



