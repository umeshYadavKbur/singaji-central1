import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import UploadDocumentImage from '../../assests/image/UploadDocument.svg'

function UploadDocumentFrom() {
    // const [base64feildvalue, setBase64Feildvalue] = useState('');

    const initialValues = {
        passportPhoto: '',
        aadharCard: '',
        castCertificate: '',
        incomeCertificate: '',
        marksheet10: '',
        marksheet12: '',
        domicile: '',
        transferCertificate: '',
        otherDocument1: '',
        otherDocument2: '',

    }
    const [imgData, setImageData] = useState(initialValues)

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values);
            console.log(imgData)
        }
    })


    const imageToBase64 = (file, feildName) => {

      
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file)
            reader.onload = () => {
                var Base64 = reader.result
                console.log('base64', Base64);

                setImageData((val) => {

                    return {

                        ...val,
                        [feildName]: Base64
                    }


                })
                //    formik.setFieldValue(feildName,Base64)
            }
            reader.onerror = (err) => {
                console.log(err);
            }
        }
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="row m-1">
                    <div className="col m-2" style={{ height: '250px', width: 'auto', backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        {imgData.passportPhoto === '' ? <div style={{ height: '190px', width: '100%' }} ><img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" /></div> : <img className='mt-1 p-1' src={imgData.passportPhoto} alt="avtar_photo2" style={{ height: '190px', width: '100%' }} />}
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2 " style={{ width: '90%' }}
                            onClick={() => { document.getElementById("passportPhoto").click() }}>
                            + Password Photo</button>
                        <input name='passportPhoto' id='passportPhoto' type="file" onChange={(e) => {
                            imageToBase64(e.target.files[0], 'passportPhoto');
                        }} value={formik.values.passportPhoto} style={{ display: 'none' }} />
                    </div>
                    <div className="col m-2" style={{ backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        <img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" style={{ height: '190px', width: '100%' }} />
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2" style={{ width: '90%' }}>+ 10<sup>th</sup> Marksheet</button>
                    </div>

                    <div className="col m-2" style={{ backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        <img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" style={{ height: '190px', width: '100%' }} />
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2" style={{ width: '90%' }}>+ 12<sup>th</sup> Marksheet</button>
                    </div>
                    <div className="col m-2" style={{ backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        <img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" style={{ height: '190px', width: '100%' }} />
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2" style={{ width: '90%' }}>+ Aadhar</button>
                    </div>
                    <div className="col m-2" style={{ backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        <img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" style={{ height: '190px', width: '100%' }} />
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2" style={{ width: '90%' }}>+ Cast Certificate</button>
                    </div>
                </div>
                <div className="row m-1">
                    <div className="col m-2" style={{ backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        <img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" style={{ height: '190px', width: '100%' }} />
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2" style={{ width: '90%' }}>+ Income Cretificate</button>
                    </div>
                    <div className="col m-2" style={{ backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        <img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" style={{ height: '190px', width: '100%' }} />
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2" style={{ width: '90%' }}>+ Mp Domicile</button>
                    </div>
                    <div className="col m-2" style={{ backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        <img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" style={{ height: '190px', width: '100%' }} />
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2" style={{ width: '90%' }}>+ Transfer Certificate</button>
                    </div>
                    <div className="col m-2" style={{ backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        <img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" style={{ height: '190px', width: '100%' }} />
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2" style={{ width: '90%' }}>+ Other Document</button>
                    </div>
                    <div className="col m-2" style={{ backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                        <img className='mt-1 p-1' src={UploadDocumentImage} alt="avtar_photo" style={{ height: '190px', width: '100%' }} />
                        <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2" style={{ width: '90%' }}>+ Other Document</button>
                    </div>
                </div>

                <div className="justify-self-end mb=5">

                    <button className="btn btn-sm btn-warning text-light fw-bold " style={{ width: "200px" }} type="submit">Submit</button>

                </div>
                <input type="file" name='aadharCard' onChange={formik.handleChange} value={formik.values.aadharCard} />

            </form>
        </>
    )
}

export default UploadDocumentFrom
