import React from 'react'
import {useHistory} from 'react-router'
import { useEffect } from 'react'


function ProtectedRoute(props) {
    var Cmp = props.Cmp
   const history = useHistory()
    useEffect(() => {
        if(!localStorage.getItem('role')) {
            history.push('/login')
        }
       
    })
    return (
        <div>
            <Cmp></Cmp>
        </div>
    )
}

export default ProtectedRoute
