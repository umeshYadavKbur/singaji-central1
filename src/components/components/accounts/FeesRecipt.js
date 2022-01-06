import React from 'react'

function FeesRecipt() {
    return (
        <>
            <div className=" p-3 m-2 me-3" style={{backgroundColor:'white',borderRadius:'8px'}}>

              
                    <div className="row">
                        <div className="col">
                            <label htmlFor="">Account status</label>
                            <input type="text" className='form-control' placeholder='Account status' />
                        </div>
                        <div className="col">
                            <label htmlFor="">Fees Scheme</label>
                            <input type="text" className='form-control' placeholder='Fees Scheme' />
                        </div>
                        <div className="col">
                            <label htmlFor="">Course Fees</label>
                            <input type="number" className='form-control' placeholder='Course Fees' />
                        </div>
                        <div className="col">
                            <label htmlFor="">Scolarship Type</label>
                            <input type="number" className='form-control' placeholder='Father contact' />
                        </div>
                </div>
            </div>
        </>
    )
}

export default FeesRecipt
