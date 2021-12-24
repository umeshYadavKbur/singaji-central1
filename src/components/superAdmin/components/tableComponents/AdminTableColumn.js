const Column = [
  {
    header: "S.No",
    accessor: "sno",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "AdminId",
    accessor: "userId",
  },
  {
    header: "Role",
    accessor: "role",
    //  Cell: ({row: {original}}) => (
    //      original.roleId === 1 ? "Super Admin" : original.roleId === 2 ? "Admin" : original.roleId === 1 ? "Student" : ''
    //  )
  },
  {
    header: "Status",
    accessor: "is_active",
    Cell: ({ row: { original } }) => (
      <button
        style={
          original.is_active === 1
            ? {
                width: "80px",
                borderRadius: "5px",
                backgroundColor: "blue",
                color: "white",
                fontWeight: "bold",
                border: "1px #FFC700",
                // height: "15px"
              }
            : {
                width: "80px",
                backgroundColor: "#8585ed",
                borderRadius: "5px",
                fontWeight: "bold",
                color: "white",
                border: "none",
              }
        }
        onClick={() => {
          // setData(original.status)
          console.log(original.email);
          alert("Do you want to change status of  : " + original.name);
        }}
      >
        {original.is_active === 1 ? "Active" : "Deactive"}
        {/* {original.is_active} */}
      </button>
    ),
  },
];

export default Column;