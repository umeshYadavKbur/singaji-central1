const i = 0 ;
 const Column = [
    {
        header:'SNo',
          accessor: 'sno', 
        
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
        header: 'AdminId',
        accessor: 'userId'
    },
    {
        header: 'Role',
        accessor: 'roleId',
         Cell: ({row: {original}}) => (
             original.roleId === 1 ? "Super Admin" : original.roleId === 2 ? "Admin" : original.roleId === 1 ? "Student" : ''   
         )
    }
    ,
     {
         header: 'Status',
         accessor: 'is_active',
         Cell: ({row: {original}}) => (
            <button
                style={
                    original.is_active === 1
                        ? {
                            width: "80px",
                            borderRadius: "5px",
                            backgroundColor: "#FFC700",
                            color: "white",
                            fontWeight: "bold",
                            border: '1px #FFC700',
                            // height: "15px"
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
                    alert("Do you want to change status of  : " + original.name)
                }}>
                {original.is_active === 1 ? 'Active' : 'Deactive'}
            </button>
        )
     }

]

export default Column;