import React, { useEffect, useState } from 'react';
import Offline_svg from '../assests/image/error.svg';
import "./Styles/Offline_page.css"

const Offline_page = () => {

    // onClick={window.location.reload()}
    // function refreshPage(){
    //     window.location.reload();
    // } 
    // onClick={refreshPage()}

    const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    if(sendRequest){
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
                        <div className=" row offline-text">Slow or no Internet connection. <br />please check your internet settings and try again</div>
                        <button onClick={() => setSendRequest(true)}   className='Offline-page-button' >Reload</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Offline_page
