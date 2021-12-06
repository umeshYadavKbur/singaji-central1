import React from 'react'
import { useHistory } from 'react-router'

function About() {
    const history = useHistory();
    const Home = () => {
        history.push('/home')
    }
    const goToSettings = () => {
        history.push('/settings')
    }
    return (
        <div>
            About
            <input>
            </input>
            <button onClick={Home} >
                go to about page
            </button>
            <button onClick={goToSettings} >
                go to Settings page
            </button>
        </div>
    )
}

export default About




