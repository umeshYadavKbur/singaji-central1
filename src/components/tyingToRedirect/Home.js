import React from 'react'
import { useHistory } from 'react-router'

function Home() {
    const history = useHistory();
    const goTOAbout = () => {
        history.push('/about')
    }
    const goToSettings = () => {
        history.push('/settings')
    }
    return (
        <div>
            HOme
            <input>
            </input>
            <button onClick={goTOAbout} >
                go to about page
            </button>
            <button onClick={goToSettings} >
                go to Settings page
            </button>
        </div>
    )
}

export default Home




