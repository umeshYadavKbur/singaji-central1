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
import Pagination from '../assests/common/Pagination';
import Loader from '../assests/common/Loader';
import OfflinePage from '../auth/OfflinePage';
import NoDataFound from '../assests/common/NoDataFound';


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
            header: "S.No",
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
            header: 'Admin Id',
            accessor: 'userId'
        },
        {
            header: 'Role',
            accessor: 'role',
            Cell: ({ row: { original } }) => {
                var data2 = original.role.charAt(0).toUpperCase() + original.role.slice(1).toLowerCase();
                data2 = data2.replace('admin', ' Admin');

                return (data2)

            }
        },
        {
            header: 'Status',
            accessor: 'isActive',
            Cell: ({ row: { original } }) => (
                <button
                    className="table_btn_size "
                    style={
                        original.isActive === 1
                            ? ActivateButton
                            : DeactivateButton}
                    onClick={() => {
                        Swal.fire({
                            title: `${original.isActive === 0 ? 'Active' : 'Deactive'}`,

                            html:
                                '<hr>' +
                                'Are you sure?' +
                                '<br>' +
                                `You want to ${original.isActive === 0 ? 'active' : 'deactive'} this admin`,
                            showCancelButton: true,
                            showConfirmButton: true,
                            cancelButtonText: 'Cancel',
                            confirmButtonText: `${original.isActive === 0 ? 'Active' : 'Deactive'} `,
                            // confirmButtonText:'Deactive',
                            reverseButtons: true,
                            showCloseButton: true,
                            // cancelButtonColor: 'gray',
                            confirmButtonColor: "#4f83df",

                            showLoaderOnDeny: true,

                            showClass: {
                                backdrop: 'swal2-noanimation', // disable backdrop animation
                                popup: '',                     // disable popup animation
                                icon: ''                       // disable icon animation
                            },
                            hideClass: {
                                popup: '',                     // disable popup fade-out animation
                            }

                        }).then(async (result) => {
                            console.log('====================================');
                            console.log("++++++++++++++++++++++++++++");
                            console.log('====================================');
                            if (result.isConfirmed) {
                                let res = await AdminStatusChange(original)
                                console.log(res);
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
                    {original.isActive === 1 ? 'Active' : 'Deactive'}
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
        rows,
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
        <OfflinePage />
    ) : (
        <>
            {table_data.second_loading && (
                <Loader />
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
                <div style={{ position: 'sticky', top: '80px', width: '100%', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#f4f7fc', zIndex: '5' }}>
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

                </div>
                <table {...getTableProps()} id="customers" className="table table-sm" >
                    <thead style={{ position: 'sticky', top: '135px', width: '100%', backgroundColor: '#f4f7fc', zIndex: '5' }}>
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
                <NoDataFound rows={rows} />
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



