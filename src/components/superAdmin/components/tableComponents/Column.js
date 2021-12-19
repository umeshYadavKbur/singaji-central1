 const Column = [
    // {
    //     header:'SNo',
    //     accessor: 'Sno'
    // },
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
        accessor: 'roleId'
    }
    ,
     {
         header: 'Status',
         accessor: 'status',
         Cell: ({row: {original}}) => (
             <button
                 style={
                     original.status === "Active"
                         ? {
                             width: "80px",
                             borderRadius: "5px",
                             backgroundColor: "#FFC700",
                             color: "white",
                             fontWeight: "bold",
                             border: '1px #FFC700'
                         }
                         : {
                             width: "80px",
                             backgroundColor: "#FBC775",
                             borderRadius: "5px",
                             fontWeight: "bold",
                             color: "white",
                             border: 'none'
                         }}
                 onClick={() => {
                     // setData(original.status)
                     console.log(original)
                     alert("Do you want to change status of  : " + original.firstName)
                 }}>
                 {original.status}
             </button>
         )
     }

]

export default Column;