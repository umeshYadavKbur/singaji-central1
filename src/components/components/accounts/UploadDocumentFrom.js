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

    const ImgDiv = ({ IMG, DISPLAY_NAME, NAME_FOR_FILE }) => {
        return (
            <div className="col m-2" style={{ height: '250px', width: 'auto', backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                {IMG === '' ? <div style={{ height: '190px', width: '100%' }} className='d-flex justify-content-center' ><img className='mx-auto my-auto' height='80px' src={UploadDocumentImage} alt="avtar_photo" /></div> : <img className='mt-1 p-1' src={IMG} alt="avtar_photo2" style={{ height: '190px', width: '100%' }} />}
                <button type="button" className="btn btn-sm btn-outline-warning fw-bold m-2 " style={{ width: '90%' }}
                    onClick={() => { document.getElementById(NAME_FOR_FILE).click() }}>
                    {DISPLAY_NAME}</button>
                <input name={NAME_FOR_FILE} id={NAME_FOR_FILE} type="file" onChange={(e) => {
                    imageToBase64(e.target.files[0], NAME_FOR_FILE);
                }} value={formik.values.NAME_FOR_FILE} style={{ display: 'none' }} />
            </div>
        )
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="row m-1">
                    {<ImgDiv IMG={imgData.passportPhoto} DISPLAY_NAME={'+ Passport Photo'} NAME_FOR_FILE={'passportPhoto'} />}
                    {<ImgDiv IMG={imgData.marksheet10} DISPLAY_NAME={'+ 10th Marksheet'} NAME_FOR_FILE={'marksheet10'} />}
                    {<ImgDiv IMG={imgData.marksheet12} DISPLAY_NAME={'+ 12th Marksheet'} NAME_FOR_FILE={'marksheet12'} />}
                    {<ImgDiv IMG={imgData.aadharCard} DISPLAY_NAME={'+ Aadhar Card'} NAME_FOR_FILE={'aadharCard'} />}
                    {<ImgDiv IMG={imgData.castCertificate} DISPLAY_NAME={'+ Cast Certificate'} NAME_FOR_FILE={'castCertificate'} />}

                </div>
                <div className="row m-1">
                    {<ImgDiv IMG={imgData.incomeCertificate} DISPLAY_NAME={'+ Income Cretificate'} NAME_FOR_FILE={'incomeCertificate'} />}
                    {<ImgDiv IMG={imgData.domicile} DISPLAY_NAME={'+ Mp Domicile'} NAME_FOR_FILE={'domicile'} />}
                    {<ImgDiv IMG={imgData.transferCertificate} DISPLAY_NAME={'+ Transfer Certificate'} NAME_FOR_FILE={'transferCertificate'} />}
                    {<ImgDiv IMG={imgData.otherDocument1} DISPLAY_NAME={'+ Other Document'} NAME_FOR_FILE={'otherDocument1'} />}
                    {<ImgDiv IMG={imgData.otherDocument2} DISPLAY_NAME={'+ Other Document'} NAME_FOR_FILE={'otherDocument2'} />}
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
