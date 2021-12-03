import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux/index'

function UsersContainer({ userData, fetchUsers }) {
    useEffect(() => {
        fetchUsers()
        // eslint-disable-next-line
    }, [])
    return userData.loading ? (
        <h2>Loading</h2>
    ) : userData.error ? (
        <h2>{userData.error}</h2>
    ) : (
        <div>
            <h2>Users List</h2>
            <div>
                {userData &&
                    userData.users &&
                    userData.users.map(user => <p>{user.name}</p>)}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersContainer)