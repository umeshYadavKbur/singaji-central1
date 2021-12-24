import * as React from "react";
import {useMemo} from "react";

import Edit_icon from '../../assests/image/Edit_icon.svg'
import Swal from 'sweetalert2'
import {GlobalFilter} from "./tableComponents/GlobalFilter";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import {ToastContainer} from "react-toastify";
// import MockData from "./tableComponents/studentTable.json";
// import StudentTableHeader from "./tableComponents/StudentTableHeader";
import "./styles/Table.css";
import {baseUrl} from "../../../redux/constants/url";
import {fetchStudentTable} from "../../../redux/actionDispatcher/studentTableDatadispatcher";
import {connect} from "react-redux";
import SkeletonColor from "../../../helpers/Skeletrone";
import Archived_icon from "../../assests/image/Archived_icon.svg"
import {TableCheckbox} from "./tableComponents/TableCheckbox";
import {VerifyStudent} from "../../../redux/actionDispatcher/studentVerifyTableDataDispatcher";
import axios from "axios";
import AllUrl from "../../../redux/constants/url";
import {toast} from "react-toastify";


function StudentTable({table_data,fetchStudentTable,VerifyStudent}) {
  const token = localStorage.getItem("token");

  const StudentTableHeader = [
    {
      header: "S No",
      accessor: "Srno",
      Cell: ({row: {original,index}}) =>{
        return(index+1)
      }
    },
    {
      header: "Name",
      accessor: "firstName",
    },
    {
      header: "Father Name",
      accessor: "fathersName",
    },
    {
      header: "Stream",
      accessor: "branch",
    },
    {
      header: "Year",
      accessor: "year",
    },
    {
      header: "Village",
      accessor: "village",
    },
    {
      header: "Mobile",
      accessor: "mobile",
    },
    {
      header: "Reg.fee",
      accessor: "reg_fees_status",
      Cell: ({row: {original}}) => (
        <button
          style={
            original.reg_fees_status === "Paid"
              ? {
                width: "80px",
                borderRadius: "5px",
                backgroundColor: "#FFC700",
                color: "white",
                fontWeight: "bold",
                border: '1px #FFC700',
               
              } : {
                width: "80px",
                backgroundColor: "#FFC700",
                borderRadius: "5px",
                fontWeight: "bold",
                color: "white",
                border: 'none',
              }}
          disabled={original.reg_fees_status === "Paid"}
          onClick={() => {
            Swal.fire({
              title: 'Payment Confermation',

              html:
                '<hr>' +
                'Are you sure?' + '<br>' +
                `You want to confirm this payment `,
              // icon: 'warning',
              showCancelButton: true,
              // showCancelButton: true,
              cancelButtonText: 'Payment',
              confirmButtonText: 'Cancel',
              showCloseButton: true,
              cancelButtonColor: 'orange',
              confirmButtonColor: "gray",

            }).then(async (result) => {
              if(result.isConfirmed === false) {
                var body = JSON.stringify({
                  email: original.email
                });

                var config = {
                  method: 'post',
                  url: `${AllUrl.verifyStudentPaidUnpaid}`,
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                  },
                  data: body
                };

                const result = await axios(config)
                console.log("_____________________________________",result);
                if(result.status === 200) {
                  toast.success('Registration Fees Paid SuccessFul',{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  var con = {
                    method: "GET",
                    url: `${baseUrl}/api/registrated_student`,
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  };
                  fetchStudentTable(con);
                }
                else if(result.status === 404) {
                  toast.warning('User Not Found',{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
              }
            })
          }}>
          {original.reg_fees_status}
        </button>)
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({row: {original}}) => (
        <button
          style={{
            width: "80px",
            borderRadius: "5px",
            backgroundColor: "rgb(166 166 226)",
            color: "white",
            fontWeight: "bold",
            border: '1px #FFC700',
            // height: "15px"
          }
          }
          onClick={() => {
            // setData(original.status)
            console.log(original.email)
            Swal.fire({
              title: 'Active',

              html:
                '<hr>' +
                'Are you sure?' + '<br>' +
                `You want to active ${original.firstName} ${original.lastName} `,
              // icon: 'warning',
              showCancelButton: true,
              // showCancelButton: true,
              cancelButtonText: 'Active',
              confirmButtonText: 'Cancel',
              showCloseButton: true,
              cancelButtonColor: 'blue',
              confirmButtonColor: "gray",

            }).then((result) => {
              if(result.isConfirmed === false) {
                VerifyStudent(original);
              }
            })
            // alert("Do you want to change this   : " + original.email)
            // VerifyStudent(original.email);
          }}>
          Deactive
        </button>)
    },
    {
      header: 'Edit',
      accessor: 'icon',
      Cell: ({row: {original}}) => (
        // <i onClick={() => {alert("hii")}} class="far fa-edit"></i>
        <img src={Edit_icon} alt="Edit" />

      )
    }
  ];


  async function getData(data,loginUrl) {
    var url = `${baseUrl}${loginUrl}`;
    console.log(url);
    try {
      var res = await axios.post(url,data);
      console.log("The response of dat is :: ",res);
      if(res.status === 200) {
        //here i change the return data so the response object coming from an api is directly return
        return res;
      }
      // Don't forget to return something
      return res;
    } catch(err) {
      return err;
    }
  }
  const columns = useMemo(() => StudentTableHeader,[]);
  React.useEffect(() => {
    var config = {
      method: "GET",
      url: `${baseUrl}/api/registrated_student`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetchStudentTable(config);
    // setTableData(table_data.table_data);

    // eslint-disable-next-line
  },[]);


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
    // pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    // selectedFlatRows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: table_data.table_data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
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
  );

  const {globalFilter} = state;
  const {pageIndex,pageSize} = state;

  return table_data.loading ? (
    <SkeletonColor></SkeletonColor>
  ) : table_data.error ? (
    <h2>{table_data.error}</h2>
  ) : (
    //   return (
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
          <div className="ms-4">
            <div className='ms-4'>
              <select style={{height: "auto",width: "auto",outline: "none",border: "none",borderRadius: "10px",padding: "5px"}} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {
                  [10,25,50,100].map(pageSize => (
                    <option value={pageSize} key={pageSize}>Show Entrie {pageSize}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='d-flex ml-auto me-3'>

            <div className='me-4'>
              <button type="button" class="btn btn-outline-secondary fw-bold ">Archive <img src={Archived_icon} alt="downloadIcon" /></button>
            </div>
            <div className='me-4'>
              <button type="button" class="btn btn-outline-primary fw-bold ">Active</button>
            </div>
            <div className='me-4'>
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
            </div></div>
        </div>
        <table {...getTableProps()} id="customers" className="table table-sm">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i class="fas fa-chevron-down ms-2"></i>
                        ) : (
                          <i class="fas fa-chevron-up ms-2"></i>
                        )
                      ) : (
                        ""
                      )}
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{border: "rgb(246 249 252)"}} className="d-flex mb-4">
          <div className="mx-4">
            <span>
              {/* Page{' '}
                        <strong>{pageIndex + 1} of {pageOptions.length} </strong> */}
              Showing {(page.length * (pageIndex + 1) - (page.length - 1))} to  {page.length * (pageIndex + 1)} of  {pageCount * pageSize}{' '} Entries {"  "}
            </span>
          </div>
          <div className='ml-auto me-3' >
            {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button> */}
            <button style={{outline: "none",border: "1px solid gray",borderRadius: "10px 0 0 10px"}} onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            {canNextPage ? <button style={{outline: "none",border: "1px solid gray"}} onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>1</button> : ''}
            {canNextPage ? <button style={{outline: "none",border: "1px solid gray"}} onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>2</button> : ''}
            {canNextPage ? <button style={{outline: "none",border: "1px solid gray"}} onClick={() => gotoPage(pageIndex + 2)} disabled={!canNextPage}>3</button> : ' '}
            {canNextPage ? <button style={{outline: "none",border: "1px solid gray"}} onClick={() => gotoPage(pageIndex + 3)} disabled={!canNextPage}>4</button> : ''}
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
    table_data: state.studentTableData,


  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentTable: (data) => dispatch(fetchStudentTable(data)),
    VerifyStudent: (data) => dispatch(VerifyStudent(data))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(StudentTable);
