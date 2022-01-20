import React from 'react';
import Offline_svg from '../assests/image/Offline.svg';

const OfflinePage = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <div >
                    <img src={Offline_svg} alt="you are offline!" />
                </div>
            </div>
        </>
    )
}

export default OfflinePage
