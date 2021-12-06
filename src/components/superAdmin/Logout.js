import React from 'react'
import { useHistory } from 'react-router';
function Logout() {
    const history = useHistory()
    return (
        <div>
            <button className="btn btn-primary" type="button" onClick={()=>{localStorage.clear(); history.push('/login')}}>Logout</button>
        </div>
    )
}

export default Logout
