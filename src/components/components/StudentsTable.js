import * as React from "react";
// import { useMemo } from "react";

import Edit_icon from '../assests/image/Edit_icon.svg'
import Swal from 'sweetalert2'
import { GlobalFilter } from "./tableComponents/GlobalFilter";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import { connect } from "react-redux";
import Loader from '../assests/common/Loader';


import "./styles/Table.css";
import { fetchStudentTable } from "../../redux/actionDispatcher/superAdmin/studentTableDatadispatcher";
import SkeletonColor from "../../helpers/Skeletrone";
import Archived_icon from "../assests/image/Archived_icon.svg"
import { TableCheckbox } from "./tableComponents/TableCheckbox";
import { VerifyStudent } from "../../redux/actionDispatcher/superAdmin/studentVerifyTableDataDispatcher";
// import AddNewStudent from "./AddNewStudent";
import AllUrl from "../../redux/constants/url"
import updown_sort from '../assests/image/updown_sort.svg'
import { PaidButton, UnpaidButton } from "../assests/common/Color";
import Pagination from "../assests/common/Pagination";
import { useNavigate } from "react-router-dom";
import { Tooltip, Whisper } from "rsuite";
import NoDataFound from "../assests/common/NoDataFound";

// import { baseUrl } from "../../redux/constants/url";


function StudentTable({ table_data, fetchStudentTable, VerifyStudent }) {

  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  // var AppliedStudent;
  const [columns] = React.useState([
    {
      header: "S.No",
      accessor: "Srno",
      Cell: ({ row: { original, index } }) => {
        return (index + 1)
      }
    },
    {
      header: "Name",
      accessor: "firstName",
    },
    {
      header: "Father's Name",
      accessor: "fathersName",
    },
    {
      header: "Branch",
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
      header: "RFS",
      accessor: "receiveFeesStatus",
      Cell: ({ row: { original } }) => (
        <div className='circle-main align-items-center'>
          <div className="d-flex align-items-center">
            {original.accRegFeesStatus === 'Paid' ? <span className='recieved-fee-circle' style={{ backgroundColor: "#56F000", marginRight: "10px", marginLeft: "15px" }}></span> : <span className='recieved-fee-circle' style={{ backgroundColor: "#F00018", marginRight: "10px", marginLeft: "15px" }}></span>}
          </div>
        </div>
      ),
    },
    {
      header: "Receiver",
      accessor: "receiver",
    },
    {
      header: "Reg. Fees",
      accessor: "regFeesStatus",
      Cell: ({ row: { original } }) => (
        <button
          className="table_btn_size"
          style={
            original.regFeesStatus === "Paid"
              ? PaidButton : UnpaidButton}
          disabled={original.regFeesStatus === "Paid" || original.receiver !== localStorage.getItem('user')}
          onClick={() => {
            Swal.fire({
              title: 'Payment Confermation',

              html:
                '<hr>' +
                'Are you sure?' +
                '<br>' +
                'You want to confirm this payment ',
              // icon: 'warning',
              showCancelButton: true,
              // showCancelButton: true,
              cancelButtonText: 'Cancel',
              confirmButtonText: 'Paid',
              showCloseButton: true,
              cancelButtonColor: 'gray',
              confirmButtonColor: "#F8A72C",
              reverseButtons: true,
              showClass: {
                backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: '',                     // disable popup animation
                icon: ''                       // disable icon animation
              },
              hideClass: {
                popup: '',                     // disable popup fade-out animation
              }


            }).then(async (result) => {
              if (result.isConfirmed) {
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
                // console.log("_____________________________________", result);
                if (result.status === 200) {
                  toast.success('Registration Fees Paid SuccessFul', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                  });
                  var con = {
                    method: "GET",
                    url: AllUrl.allRegistratedStudent,
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  };
                  fetchStudentTable(con, true);
                }
                else if (result.status === 404) {
                  toast.warning('User Not Found', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                  });
                }
              }
            })
          }}>
          {original.regFeesStatus}
        </button>)
    },

    {
      header: 'Edit',
      accessor: 'icon',
      Cell: ({ row: { original } }) => (
        // <i onClick={() => {alert("hii")}} class="far fa-edit"></i>
        <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
          <Tooltip>
            Edit Student Info
          </Tooltip>
        }>
          <img src={Edit_icon} style={{ cursor: "pointer" }} alt="Edit" onClick={() => {
            navigate("/admin_dashboard/addnewstudent")
            localStorage.setItem('RegistrationEdit', JSON.stringify(original))
            // localStorage.setItem('SelfRegistrationEdit', JSON.stringify(original))
          }} />

        </Whisper>

      )
    }
  ]);
  // async function getData(data,loginUrl) {
  //   var url = `${baseUrl}${loginUrl}`;
  //   console.log(url);
  //   try {
  //     var res = await axios.post(url,data);
  //     console.log("The response of dat is :: ",res);
  //     if(res.status === 200) {
  //       //here i change the return data so the response object coming from an api is directly return
  //       return res;
  //     }
  //     // Don't forget to return something
  //     return res;
  //   } catch(err) {
  //     return err;
  //   }
  // }
  // const columns = useMemo(() => StudentTableHeader, []);
  React.useEffect(() => {
    var config = {
      method: "GET",
      url: AllUrl.allRegistratedStudent,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetchStudentTable(config, false);
    // setTableData(table_data.table_data);
    // eslint-disable-next-line
  }, []);



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    setGlobalFilter,
    page,
    nextPage,
    rows,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
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
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  return table_data.loading ? (
    <SkeletonColor></SkeletonColor>
  ) :
    //  table_data.error ? (
    //   <h2>{table_data.error}</h2>
    // ) :
    (
      <>
        {table_data.secondLoading && (
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

                <div className='me-4'>
                  <button type="button" className="btn  fw-bold fees-structure-active-button ">Archive <img src={Archived_icon} alt="downloadIcon" /></button>
                </div>
                {/* <div className='me-4'>
              <button type="button" class="btn btn-outline-primary fw-bold ">Active</button>
            </div> */}
                <div className='me-4'>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
                </div></div>
            </div>
          </div>
          <table {...getTableProps()} id="customers" className="table table-sm">
            <thead style={{ position: 'sticky', top: '135px', width: '100%', backgroundColor: '#f4f7fc', zIndex: '5' }}>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("header")}
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
    table_data: state.studentTableData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentTable: (data, isLoading) => dispatch(fetchStudentTable(data, isLoading)),
    VerifyStudent: (data) => dispatch(VerifyStudent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);
