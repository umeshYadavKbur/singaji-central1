import React from 'react'

function Pagination(
    {
        page,
        pageIndex,
        pageCount,
        pageSize,
        canPreviousPage,
        previousPage,
        pageOptions,
        gotoPage,
        canNextPage,
        nextPage,
    }
) {
    return (
        <div style={{ border: "rgb(246 249 252)" }} className="d-flex mb-4 mt-2">
            <div className="mx-4">
                <span style={{ fontWeight: '300', color: "#302E2F", }}>
                    Showing {page.length * (pageIndex + 1) - (page.length - 1)} to{" "}
                    {page.length * (pageIndex + 1)} of {pageCount * pageSize} Entries{" "}
                    {"  "}
                </span>
            </div>
            <div className="ml-auto me-3">
                {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button> */}
                <button
                    style={{ height: "28px", color: "#302E2F", fontWeight: '300', outline: "none", border: "1px solid #D5D7E3",backgroundColor:'#fff',  borderRadius: " 4px 0px 0px 4px" }}
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    Previous
                </button>
                <button
                    style={{
                        height: "30px", width: "28px",
                        color: "#302E2F",
                        marginBottom:'5px',
                        fontWeight: '300', outline: "none", border: "1px solid #D5D7E3", color: '#302E2F', backgroundColor: '#D5D7E3'
                    }}
                >
                    {pageIndex + 1}
                </button>
                <button
                    style={
                        { height: "28px", width: "28px", color: "#302E2F", fontWeight: '300', outline: "none",backgroundColor:'#fff',  border: "1px solid #D5D7E3" }

                    }
                    onClick={() => gotoPage(pageIndex + 1)}
                    disabled={pageOptions.length < pageIndex + 2}
                >
                    {pageIndex + 2}
                </button>
                <button
                    disabled={pageOptions.length < pageIndex + 3}
                    style={
                        { height: "28px", width: "28px", color: "#302E2F", fontWeight: '300', outline: "none",backgroundColor:'#fff',  border: "1px solid #D5D7E3" }
                    }
                    onClick={() => {
                        gotoPage(pageIndex + 2);
                    }}
                >
                    {pageIndex + 3}
                </button>
                <button
                    style={{ height: "28px", width: "28px", color: "#302E2F", fontWeight: '300', outline: "none",backgroundColor:'#fff',  border: "1px solid #D5D7E3" }}
                    onClick={() => gotoPage(pageIndex + 3)}
                    disabled={pageOptions.length < pageIndex + 4}
                >
                    {pageIndex + 4}
                </button>
                <button
                    style={{ height: "28px", color: "#302E2F", fontWeight: '300', outline: "none",backgroundColor:'#fff', border: "1px solid #D5D7E3", borderRadius: "0px 4px 4px 0px" }}
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    Next - {pageOptions.length - pageIndex - 1}
                </button>
            </div>
        </div>
    )
}

export default Pagination
