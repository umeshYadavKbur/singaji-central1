import React from 'react';
import Offline_svg from '../assests/image/Offline.svg';

const Offline_page = () => {
    return (
        <>
            <div className="container d-flex justify-content-center" style={{ backgroundColor: "blueviolet"}}>
                <img src={Offline_svg} alt="you are offline!" />
            </div>
        </>
    )
}

export default Offline_page
