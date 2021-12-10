import React from 'react'
import Logout from './Logout'
import Admin from './Admin'
// import CreateNewAdmin from './CreateNewAdmin'
function AdminMainPage() {
    return (
        <div>
            <Logout></Logout>
            <Admin></Admin>
            {/* <CreateNewAdmin></CreateNewAdmin> */}
        </div>
    )
}

export default AdminMainPage
