import React from 'react';
import Offline_svg from '../assests/image/Offline.svg';
import "./Styles/Offline_page.css"

const Offline_page = () => {
    return (
        <>
            <div className=" container-fluid main-div">
                <div className="row">
                <img src={Offline_svg} className='offline-svg' alt="you are offline!" />
                </div>
                <div className=" row offline-text">Slow or no Internet connection</div>
            </div>
        </>
    )
}

export default Offline_page
