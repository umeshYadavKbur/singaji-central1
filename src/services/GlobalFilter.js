import React from 'react'

export const GlobalFilter = ({filter , setFilter}) => {
    return (
        <div>
        <span>
                <input style={{width: "20%",alignSelf: 'center'}} className='position-absolute start-50 ' type="text" value={filter || ''} onChange={(e)=>setFilter(e.target.value)} placeholder='Search here' />
        </span>
        </div>
    )
}
