    import * as React from 'react';
    import {useMemo} from 'react';
    import {useFormik} from 'formik';
    import {GlobalFilter} from '../../../services/GlobalFilter';
    import {useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table';
    import MockData from '../../../services/feesStructureTabledata.json'
    import FeesStructureHeader from '../../../services/FeesStructureHeader';
    import './styles/Table.css'

export default function FeesStructure() {

        const formik = useFormik({
            initialValues: {searchBox: ''}
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


    const columns = useMemo(() => FeesStructureHeader,[])
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
              

                <div style={{backgroundColor: "rgb(246 249 252)",height: "auto",width: "auto"}}>

                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
                    <br />
                    <select style={{height: "50px",width: "auto",borderRadius: "10px",padding: "5px"}} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
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
                    <div style={{border: "rgb(246 249 252)",justifyContent: 'right'}}>
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



