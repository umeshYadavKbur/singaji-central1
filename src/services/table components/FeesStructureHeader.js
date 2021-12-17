const FeesStructureColumn = [
    {
        header: 'S.No',
        accessor: 'sno'
    },
    {
        header: 'Branch Name',
        accessor: "branch_name"
    },
    {
        header: 'Starting Year',
        accessor: 'starting_year'

    },
    {
        header: 'Ending Year',
        accessor: 'ending_year'
    },
    {
        header: 'Total Fees',
        accessor: 'Total_Fees'
    },
    // {
    //     header: 'Status',
    //     accessor: 'status'
    // },
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
                onClick={() => console.log(original)}>
                {original.status}
            </button>
        )
    }
]

export default FeesStructureColumn;