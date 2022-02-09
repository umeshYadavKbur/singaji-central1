import React from 'react'
import './styles/Loader.css'

// ========================= skeleton loader on the tables ======================

function Loader() {
    return (
        <div
            style={{
                display: 'flex',
                position: 'fixed',
                minHeight: '100%',
                minWidth: '100%',
                zIndex: "100000",
                // backgroundColor: 'rgb(227 227 227)',
                opacity: '0.5'
            }}
        >

            <div
                className="lds-roller"
                style={{
                    position: "absolute",
                    left: "35%",
                    top: "40%",
                    zIndex: "100000",
                }}
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader
