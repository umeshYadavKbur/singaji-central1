import { CButton, CToast, CToastBody, CToastClose, CToaster } from '@coreui/react'
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';


function ToastAction() {
    const history = useHistory();
    const toaster = useRef();
    const [toast, addToast] = useState(0);

    const exampleToast = (
        <CToast autohide={false} visible={true}>
            <CToastBody>
                Mail send successfully
                <div className="mt-2 pt-2 border-top">
                    <CButton type="button" color="success" size="sm" onClick={() => {
                        history.push('login')
                    }}>
                        Go to Mail
                    </CButton>
                    <CToastClose component={CButton} color="secondary" size="sm" className="ms-1">
                        Close
                    </CToastClose>
                </div>
            </CToastBody>
        </CToast>
    )
    return (
        <>
            <CButton onClick={() => addToast(exampleToast)}>Send a toast</CButton>
            <CToaster ref={toaster} push={toast} placement="top-end" />
        </>
    )
}

export default ToastAction
