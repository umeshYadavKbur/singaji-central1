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
    {
        header: 'Status',
        accessor: 'status'
    },
    {
        accessor: 'accessor',
        header: 'status',
        Cell: ({ row: { original } }) => (
            <button onClick={() => console.log(original.status)}>
                Button text
            </button>
        )
    }


]

export default FeesStructureColumn;