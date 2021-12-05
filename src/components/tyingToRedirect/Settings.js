import React from 'react'
import { useHistory } from 'react-router'

function Settings() {
    const history = useHistory();
    const goToHome = () => {
        history.push('/home')
    }
    const about = () => {
        history.push('/about')
    }
    return (
        <div>
            Settings
            <input>
            </input>
            <button onClick={goToHome} >
                go to home page
            </button>
            <button onClick={about} >
                go to About page
            </button>
        </div>
    )
}

export default Settings




