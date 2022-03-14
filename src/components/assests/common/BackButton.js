import React from 'react'
import { useNavigate } from 'react-router-dom'
import backIcon from '../image/Back-Icon.svg'

const BackButton = (props) => {

        const navigate = useNavigate();
        
    
    return (
        <>
        
            <img src={backIcon} className="mr-3" style={{ cursor: "pointer" , marginBottom: `${props.addStudent ? "5px" : "2px"}`}}onClick={()=>navigate(-1) } alt="" />
        </>
    )
}

export default BackButton