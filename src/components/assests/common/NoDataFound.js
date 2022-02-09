const NoDataFound=({rows})=>{

    // when there is no data availble in tables ==========

    return(
        !rows.length && (
            <div style={{ width: "100%", justifyContent: "center", alignItems: "center", display: "flex" }}>
                <h1 style={{ color: "#5A607F" }}>No Result Found</h1>
            </div>
        )
    )
}
export default NoDataFound