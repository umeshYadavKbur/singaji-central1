import React from 'react'
import '../styles/sidebar.css'
export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <>
            <input style={{ width: "270px", height: "41px", outline: "none", border: "1px solid #7979792b", padding: "5px", borderRadius: "4px", paddingLeft: '12px' }} type="search" value={filter || ''} onChange={(e) => setFilter(e.target.value)} placeholder='Search..' />
            <i style={{ marginLeft: "-31px", color: "rgb(90, 96, 127,0.7)" }} className="fas fa-search" ></i>

        </>
    )
}
