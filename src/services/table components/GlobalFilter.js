import React from 'react'

export const GlobalFilter = ({filter , setFilter}) => {
    return (
        <>
            <input style={{width: "auto",height: "auto",padding:"5px"}}  type="text" value={filter || ''} onChange={(e) => setFilter(e.target.value)} placeholder='  Search here' />
            
        
       </>
    )
}
