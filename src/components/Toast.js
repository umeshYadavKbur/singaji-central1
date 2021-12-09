import React, { useRef, useState } from 'react';
import { CToastClose } from '@coreui/react'
import { CToastBody } from '@coreui/react'
// import { CToastClose } from '@coreui/react'
import { CToaster } from '@coreui/react'
import { CToast } from '@coreui/react'
import { CButton } from '@coreui/react'
import ToastAction from './ToastAction';
import Modal from './Modal';

function Toast() {
    const [toast, addToast] = useState(0);
    const toaster = useRef();
    const exampleToast = (
        <CToast autohide={true} visible={true} className="align-items-center">
            <div className="d-flex">
                <CToastBody> Login successfully </CToastBody>
                <CToastClose className="me-2 m-auto" />
            </div>
        </CToast>
    );
    return (
        <>
            <CButton onClick={() => addToast(exampleToast)}>Send a toast</CButton>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            {/* Anoter thoast */}
            <ToastAction />
            {/* Modal testing */}
            <Modal />
        </>
    );
}

export default Toast;
