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
        <div style={{ border: "rgb(246 249 252)" }} className="d-flex mb-4">
            <div className="mx-4">
                <span style={{ fontWeight: '700', color: "gray", }}>
                    Showing {page.length * (pageIndex + 1) - (page.length - 1)} to{" "}
                    {page.length * (pageIndex + 1)} of {pageCount * pageSize} Entries{" "}
                    {"  "}
                </span>
            </div>
            <div className="ml-auto me-3">
                {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button> */}
                <button
                    style={canPreviousPage ?
                        { height: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray", borderRadius: " 10px 0px 0px 10px" }
                        : {
                            backgroundColor: "#bbbbbb", height: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white", borderRadius: " 10px 0px 0px 10px "
                        }}
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    Previous
                </button>
                <button
                    style={{
                        height: "35px", width: "30px",
                        color: "gray",
                        fontWeight: '700', outline: "none", border: "2px solid gray", color: 'white', backgroundColor: '#898989'
                    }}
                >
                    {pageIndex + 1}
                </button>
                <button
                    style={
                        pageOptions.length > pageIndex + 1 ?
                            { height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray" }
                            : {
                                backgroundColor: "#bbbbbb", height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white"
                            }
                    }
                    onClick={() => gotoPage(pageIndex + 1)}
                    disabled={pageOptions.length < pageIndex + 2}
                >
                    {pageIndex + 2}
                </button>
                <button
                    disabled={pageOptions.length < pageIndex + 3}
                    style={
                        pageOptions.length > pageIndex + 2 ?
                            { height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray" }
                            : {
                                backgroundColor: "#bbbbbb", height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white"
                            }}
                    onClick={() => {
                        gotoPage(pageIndex + 2);
                    }}
                >
                    {pageIndex + 3}
                </button>
                <button
                    style={
                        pageOptions.length > pageIndex + 3 ?
                            { height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray" }
                            : {
                                backgroundColor: "#bbbbbb", height: "31px", width: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white"
                            }}
                    onClick={() => gotoPage(pageIndex + 3)}
                    disabled={pageOptions.length < pageIndex + 4}
                >
                    {pageIndex + 4}
                </button>
                <button
                    style={canNextPage ?
                        { height: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid gray", borderRadius: "0px 10px 10px 0px" }
                        : {
                            backgroundColor: "#bbbbbb", height: "31px", color: "gray", fontWeight: '700', outline: "none", border: "2px solid white", borderRadius: "0px 10px 10px 0px"
                        }}
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
