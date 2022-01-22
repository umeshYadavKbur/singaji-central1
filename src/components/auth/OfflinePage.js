import React, { useEffect, useState } from 'react';
import Offline_svg from '../assests/image/error2.png';
import "./Styles/Offline_page.css"

const OfflinePage = () => {

    // onClick={window.location.reload()}
    // function refreshPage(){
    //     window.location.reload();
    // } 
    // onClick={refreshPage()}

    const [sendRequest, setSendRequest] = useState(false);

    useEffect(() => {
        if (sendRequest) {
            //send the request
            //    setSendRequest(false);
            window.location.reload();
            console.log("page reloaded 👍!")
        }
    },
        [sendRequest]);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center main-div">
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
