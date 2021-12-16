import * as React from 'react';
// import {DataGrid} from '@mui/x-data-grid';
// import getDataFromApi from '../../services/getApi';
// import { useEffect,useState } from 'react';
import {useMemo} from 'react';
import {useFormik} from 'formik';
import { GlobalFilter } from '../../../services/GlobalFilter';
import {useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table';
import MockData from '../../../services/mockData.json'
import Column from '../../../services/Column'
import './styles/Table.css'


// const columns = [
//     {field: 'id',headerName: 'SN.',width: 70},
//     {field: 'email',headerName: 'Email',width: 180},
//     {field: 'adminid',headerName: 'AdminId',width: 130},
//     {
//         field: 'role',
//         headerName: 'Role',
//         type: 'string',
//         width: 160,
//     },
//     // {
//     //     field: 'fullName',
//     //     headerName: 'Full name',
//     //     description: 'This column has a value getter and is not sortable.',
//     //     sortable: false,
//     //     width: 160,
//     //     valueGetter: (params) =>
//     //         `${params.getValue(params.id,'firstName') || ''} ${params.getValue(params.id,'lastName') || ''
//     //         }`,
//     // },
//     {field: 'status',headerName: 'Status',width: 130},

// ];



// const rows = [
//     {id: 1,adminid: 'Snow',email: 'example1@gmail.com',role: 'accountadmin' ,status:'Active'},
//     {id: 2,adminid: 'Lannister',email: 'example2@gmail.com',role: 'superadmin' ,status:'Active'},
//     {id: 3,adminid: 'Lannister',email: 'example3@gmail.com',role: 'superadmin' ,status:'Active'},
//     {id: 4,adminid: 'Stark',email: 'example4@gmail.com',role: 'education cordinator' ,status:'Active'},
//     {id: 5,adminid: 'Targaryen',email: 'example5@gmail.com',role: 'accountadmin' ,status:'Active'},
//     {id: 6,adminid: 'Melisandre',email: "example6@gmail.com",role: 'accountadmin' ,status:'Active'},
//     {id: 7,adminid: 'Clifford',email: 'example7@gmail.com',role: 'education cordinator' ,status:'Active'},
//     {id: 8,adminid: 'Frances',email: 'example8@gmail.com',role: 'accountadmin'  ,status:'Active'},
//     {id: 9,adminid: 'Roxie',email: 'example9@gmail.com',role: 'education cordinator' ,status:'Active'},
// ];

export default function DataTable() {
  
    const formik = useFormik({
        initialValues: {searchBox:''}
    })

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
 

    const columns = useMemo(() => Column,[])
    const data = useMemo(() => MockData,[])
    // const tableData = 
    const {getTableProps,
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
        prepareRow,
    } = useTable({
        columns,
        data
    },

        useGlobalFilter,useSortBy,
        usePagination,


    )


    const {globalFilter} = state
    const {pageIndex,pageSize} = state

    return (
        <>
            {/*
        <div style={{height:'auto',width: 'auto'}}>
                <DataGrid id="myTable"
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div> */}
        
            <div style={{backgroundColor:"rgb(246 249 252)" ,height:"auto",width:"auto"}}>

            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
            <br />
            <select style={{height:"50px",width:"auto" ,borderRadius:"10px",padding:"5px"}} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {
                    [10,25,50].map(pageSize => (
                        <option value={pageSize} key={pageSize}>show Entrie {pageSize}</option>
                    ))
                }
            </select>
            <table {...getTableProps()} id="customers" className="table table-sm" >
                <thead >
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th  {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? <i class="fas fa-chevron-down ms-2"></i> : <i class="fas fa-chevron-up ms-2"></i>) : ''}
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
                <div style={{border: "rgb(246 249 252)",justifyContent:'right'}}>
                <span>
                    Page{' '}
                    <strong>{pageIndex + 1} of {pageOptions.length} </strong>
                </span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
            </div>
            </div>
        </>
    );
}   





