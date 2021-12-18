import React from 'react'
import '../../components/superAdmin/components/styles/sidebar.css'
export const GlobalFilter = ({filter , setFilter}) => {
    return (
        <>
            <input style={{width: "auto",height: "auto",outline: "none",border: "none",padding: "5px"}} type="search" value={filter || ''} onChange={(e) => setFilter(e.target.value)} placeholder=' Search...' />
            <i style={{marginLeft: "-31px"}} class="fas fa-search" ></i>
        
       </>
    )
}
