import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useState } from 'react'

function Modal() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton>
            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                    egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </CModalBody>
            </CModal>
        </>
    )
}

export default Modal
