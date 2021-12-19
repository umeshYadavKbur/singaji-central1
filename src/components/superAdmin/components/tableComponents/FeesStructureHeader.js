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
        accessor: 'total_fees'
    },
    {
        header: 'Status',
        accessor: 'active',
        Cell: ({row: {original}}) => (
            <button
                style={
                    original.active === 1
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
                    alert("Do you want to change this   : " + original)
                }}>
                {original.active === 1 ? 'Active' : 'Deactive'}
            </button>)
    },
]

export default FeesStructureColumn;
