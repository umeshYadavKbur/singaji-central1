import * as React from 'react';
import {useMemo} from 'react';
import { GlobalFilter } from './tableComponents/GlobalFilter';
import {useTable,useSortBy,useGlobalFilter,usePagination,useRowSelect} from 'react-table';
import MockData from './tableComponents/mockData.json'
import Column from './tableComponents/Column'
import './styles/Table.css'
import { TableCheckbox } from './tableComponents/TableCheckbox';
import { useEffect } from 'react';
import { baseUrl } from '../../../redux/constants/url';
import { getDataFromApi } from '../../../services/getApi';
import axios from 'axios'
var Data  ;
export default function DataTable() {
    const token = localStorage.getItem("token");
// console.log(token);
//     const [adminInfo,setAdminInfo] = useState()
//    const access_token = localStorage.getItem("token")
    
    var config = {
        method: "get",
        url: `${baseUrl}/api/infoOfAdmins`,
        headers: {
            Authorization: `Bearer ${token}`,
            // token,
            "Content-Type": "application/json",
        },
     
    };
 
    useEffect(  () => {
         const result=   getDataFromApi(config);
        console.log("datta of api",result);
    })
    
//  const Data = localStorage.getItem("AdminInfo")

    const columns = useMemo(() => Column,[])
    const data = useMemo(() => MockData,[])
    // console.log("response   ",response.data);
    // console.log("data of mock",data);
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
        selectedFlatRows,
        prepareRow,
    } = useTable({
        columns,
        data
    },

        useGlobalFilter,useSortBy,
        usePagination,useRowSelect,
 (hooks) =>{
     hooks.visibleColumns.push((columns)=>{
         return[
             {
                 id:'selection',
                 header: ({getToggleAllRowsSelectedProps})=>(
                     <TableCheckbox {...getToggleAllRowsSelectedProps()}/>
                 ),
                 Cell:({row})=>(
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

    return (
        <>
          
        
            <div style={{backgroundColor:"rgb(246 249 252)" ,height:"auto",width:"auto"}}>

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
                            Showing 1 to  {page.length} of  {pageCount * pageSize}{' '} Entries {"  "}

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





