import React from "react";
import '../styles/Table.css'
import { Fragment, useMemo } from "react";
import { useTable, useFilters, useSortBy, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import updown_sort from '../../assests/image/updown_sort.svg'
import { TableCheckbox } from '../tableComponents/TableCheckbox';
import tableData from './pending_fees.json'

export const MultipleFilter = (rows, accessor, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
        if (filterValue.includes(val.original[accessor])) arr.push(val);
    });
    return arr;
};

function setFilteredParams(filterArr, val) {
    if (filterArr.includes(val)) {
        filterArr = filterArr.filter((n) => {
            return n !== val;
        });
    } else filterArr.push(val);

    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
}

function SelectColumnFilter({
    column: { filterValue = [], setFilter, preFilteredRows, id }
}) {
    const options = useMemo(() => {
        const options = new Set();

        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return (
        <Fragment>
            <div className="block">
                <span className="block capitalize mb-4">{id}</span>
                {/* eslint-disable-next-line */}

                {options.map((option: string, i) => {
                    return (
                        <Fragment key={i}>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    id={option}
                                    name={option}
                                    value={option}
                                    onChange={(e) => {
                                        setFilter(setFilteredParams(filterValue, e.target.value));
                                    }}
                                ></input>
                                <label
                                    htmlFor={option}
                                    className="ml-1.5 font-medium text-gray-700"
                                >
                                    {option}
                                </label>
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </Fragment>
    );
}

export default function PendingScholarshipTable() {
    const data = React.useMemo(
        () => tableData,
        []
    );

    const columns = React.useMemo(
        () => [
            {
                header: "S No",
                accessor: "Srno",
                Cell: ({ row: { original, index } }) => {
                    return (index + 1)
                },
                Filter: "",
                filter: "",
            },
            {
                header: "Name",
                accessor: "name",
                Filter: "",
                filter: ""
            },
            {
                header: "Father name",
                accessor: "fathersName",
                Filter: "",
                filter: ""
            },
            {
                header: "Mobile no",
                accessor: "mobile",
                Filter: "",
                filter: ""
            },
            {
                header: "Stream",
                accessor: "stream",
                Filter: SelectColumnFilter,
                filter: MultipleFilter,
            },
            {
                header: "Category",
                accessor: "category",
                Filter: SelectColumnFilter,
                filter: MultipleFilter,
            },
            {
                header: "Scheme",
                accessor: "feesScheme",
                Filter: SelectColumnFilter,
                filter: MultipleFilter,
            },
            {
                header: "Total fees",
                accessor: "total_fees",
                Filter: "",
                filter: ""
            },
            {
                header: "Total scholarship fees",
                accessor: "total_scholarship",
                Filter: "",
                filter: ""
            },
            {
                header: "Pending amount",
                accessor: "pending_Amount",
                Cell: ({ row: { original } }) => (
                    <div className='row d-flex d-inline-flex'>
                        <div className="col">
                            <span className='recieved-fee-circle' style={{ backgroundColor: "#ffc107" }}></span>
                        </div>
                        <div className="col">
                            <span className='' >
                                {original.pending_Amount}
                            </span>
                        </div>
                    </div>
                ),
                Filter: "",
                filter: ""
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        setPageSize,
        pageOptions,
        selectedFlatRows,
        state,
        setGlobalFilter,
        rows,
        prepareRow,
    } = useTable(
        { columns, data },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: "selection",
                        header: ({ getToggleAllRowsSelectedProps }) => (
                            < TableCheckbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <TableCheckbox {...row.getToggleRowSelectedProps()} />
                        ),
                    },
                    ...columns,
                ];
            });
        }

    );

    const { globalFilter, pageSize, pageIndex, selectedRowIds, } = state;
    const checkboxData = JSON.stringify(
        {
            selectedFlatRows: selectedFlatRows.map((row) => row.original)
        },
        null,
        2
    );
    console.log(checkboxData)

    return (
        <Fragment>
            <div className="container-fluid">
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
                    {/* <div className='d-flex ml-auto me-1'>
                        <div className='ml-auto me-4'>
                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
                        </div>
                    </div> */}
                </div>
                {/* Filter section start  */}
                {headerGroups.map((headerGroup) => (
                    <div style={{ display: "flex" }} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, i) => (
                            <div key={i}>
                                {column.canFilter ? column.render("Filter") : null}
                            </div>
                        ))}
                    </div>
                ))}
                {/* filter selection end   */}

                <table {...getTableProps()} id='customers' >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {column.render("header")}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? <img src={updown_sort} style={{ marginLeft: "5px" }} alt="" /> : <img src={updown_sort} style={{ marginLeft: "5px" }} alt="" />) : ''}
                                            {column.isSorted ? (column.isSortedDesc ? '' : '') : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
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
        </Fragment>
    );
}
