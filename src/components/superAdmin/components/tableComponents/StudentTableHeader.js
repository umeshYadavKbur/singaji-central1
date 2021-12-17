const StudentTableHeader = [
    {
        header: 'Name',
        accessor: 'firstName'
    },
    {
        header: 'Father Name',
        accessor: "fathersName"
    },
    {
        header: 'Stream',
        accessor: 'branch'
    },
    {
        header: 'Year',
        accessor: 'year'
    },
    {
        header: 'Village',
        accessor: 'village'
    },
    {
        header: 'Mobile',
        accessor: 'mobile'
    },
    {
        header: 'Reg.fee',
        accessor: 'reg_Fees'
    },
    {
        header: 'Status',
        accessor: 'accessor',
        Cell: ({ row: { original } }) => (
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
                {original.status}Data
            </button>
        )
    }
]

export default StudentTableHeader;
