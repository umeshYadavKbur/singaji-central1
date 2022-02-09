import React, { useEffect, useState } from 'react';
import Offline_svg from '../assests/image/error2.png';
import "./Styles/Offline_page.css"

const OfflinePage = ({isFullPage}) => {

    // page reload button ================================
    const [sendRequest, setSendRequest] = useState(false);

    useEffect(() => {
        if (sendRequest) {
            window.location.reload();
            console.log("page reloaded 👍!")
        }
    },
        [sendRequest]);

    return (
        <>
            <div style={isFullPage? {height: "100vh"} : ""} className="d-flex justify-content-center align-items-center main-div">
                <div>

                    <div className="">
                        <img src={Offline_svg} className='offline-svg' alt="you are offline!" />
                    </div>

                    <div className='offlinePage_reload' >
                        <div className=" row offline-text">No internet connection found! <br />check your connection</div>
                        <button onClick={() => setSendRequest(true)} className='Offline-page-button' >Reload</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OfflinePage
