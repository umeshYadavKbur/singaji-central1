import * as React from 'react';
import { useMemo } from 'react';
import { GlobalFilter } from './tableComponents/GlobalFilter';
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import MockData from './tableComponents/mockData.json'
import Column from './tableComponents/Column'
import './styles/Table.css'
<<<<<<< HEAD
// import { TableCheckbox } from '../../../services/table components/TableCheckbox';
import { TableCheckbox } from './tableComponents/TableCheckbox'


export default function DataTable() {


    //     const [adminInfo,setAdminInfo] = useState()
    //    const access_token = localStorage.getItem("token")
    //     // console.log(access_token);
    //     useEffect(() => {
    //         // getDataFromApi(`/api/infoOfAdmins/`)
    //         //     .then(data => {
    //         //         setAdminInfo(data)
    //         //     }
    //         // )
    //             console.log("Admin info:::",adminInfo);
    //     },[1])


    const columns = useMemo(() => Column, [])
    const data = useMemo(() => MockData, [])
    // const tableData = 
    const { getTableProps,
=======
import { TableCheckbox } from './tableComponents/TableCheckbox';
import { useEffect } from 'react';
import { baseUrl } from '../../../redux/constants/url';
import { getDataFromApi } from '../../../services/getApi';
import axios from 'axios'
import { fetchAdminTableData } from '../../../redux/actionDispatcher/adminTableDatadispatcher';
import { connect } from 'react-redux';

function DataTable({ table_data, fetchAdminTable }) {
    const token = localStorage.getItem("token");
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
    }, []);

    const columns = useMemo(() => Column, [])
    // const data = useMemo(() => MockData, [])

    const {
        getTableProps,
>>>>>>> origin/harsh
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
        <h2>Loading</h2>
    ) : table_data.error ? (
        <h2>{table_data.error}</h2>
    ) : (
        <>
<<<<<<< HEAD


=======
>>>>>>> origin/harsh
            <div style={{ backgroundColor: "rgb(246 249 252)", height: "auto", width: "auto" }}>

                <div className="d-flex">
                    <div className='ms-4'>
<<<<<<< HEAD
                        <select style={{ height: "auto", width: "auto", borderRadius: "10px", padding: "5px" }} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
=======
                        <select style={{ height: "auto", width: "auto", outline: "none", border: "none", borderRadius: "10px", padding: "5px" }} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
>>>>>>> origin/harsh
                            {
                                [10, 25, 50].map(pageSize => (
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
<<<<<<< HEAD
                                                    {column.isSorted ? (column.isSortedDesc ? <i class="fas fa-chevron-down ms-2"></i> : <i class="fas fa-chevron-up ms-2"></i>) : ''}
=======
                                                    {column.isSorted ? (column.isSortedDesc ? <i className="fas fa-chevron-down ms-2"></i> : <i className="fas fa-chevron-up ms-2"></i>) : ''}
>>>>>>> origin/harsh
                                                </span></th>
                                        ))
                                    }

                                </tr>
                            ))
                        }
<<<<<<< HEAD

=======
>>>>>>> origin/harsh
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
                <div style={{ border: "rgb(246 249 252)" }} className='d-flex mb-4'>
                    <div className='mx-4'>
                        <span>
                            {/* Page{' '}
                        <strong>{pageIndex + 1} of {pageOptions.length} </strong> */}
                            Showing 1 to  {page.length} of  {pageCount * pageSize}{' '} Entries {"  "}
                        </span>
                    </div>
                    <div className='ml-auto me-3' >
                        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button> */}
                        <button style={{ outline: "none", border: "1px solid gray", borderRadius: "10px 0 0 10px" }} onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                        <button style={{ outline: "none", border: "1px solid gray" }} onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>1</button>
                        <button style={{ outline: "none", border: "1px solid gray" }} onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>2</button>
                        <button style={{ outline: "none", border: "1px solid gray" }} onClick={() => gotoPage(pageIndex + 2)} disabled={!canNextPage}>3</button>
                        <button style={{ outline: "none", border: "1px solid gray" }} onClick={() => gotoPage(pageIndex + 3)} disabled={!canNextPage}>4</button>
                        <button style={{ outline: "none", border: "1px solid gray", borderRadius: "0 10px  10px 0" }} onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                        {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button> */}
                    </div>
                </div>
            </div>


        </>
    );
}
<<<<<<< HEAD
=======

const mapStateToProps = (state) => {
    return {
        table_data: state.adminTableData,
    };
};
>>>>>>> origin/harsh

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAdminTable: (data) => dispatch(fetchAdminTableData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);



