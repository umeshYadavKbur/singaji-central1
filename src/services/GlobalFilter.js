import React from 'react'

export const GlobalFilter = ({filter , setFilter}) => {
    return (
        <>
            <input style={{width: "18%",height: "40px",marginTop: '20px'}} className='position-absolute start-50 ' type="text" value={filter || ''} onChange={(e) => setFilter(e.target.value)} placeholder='  Search here' />
            
        
       </>
    )
}
