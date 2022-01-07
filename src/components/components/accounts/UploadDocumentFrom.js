import { useFormik } from 'formik'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import AllUrl from '../../../redux/constants/url'
import ImageLightbox from './ImageLightbox'
import { useNavigate } from 'react-router-dom'
import UploadDocumentImage from '../../assests/image/UploadDocument.svg';
import { isSuperAdmin } from '../../../helpers/SuperAdmin';
import { isAccountAdmin } from '../../../helpers/AccountAdmin';
import { isStudentAdmin } from '../../../helpers/StudentAdmin';
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";

function UploadDocumentFrom() {
    const navigate = useNavigate();
    const [showLightBox, setShowLightBox] = useState(false);
    const [Lightbox, setLightBox] = useState({ image: '', title: '' });
    const [loading, setLoading] = useState(false)

    const initialValues = {
        PHOTO: '',//
        BANK_PASSBOOK: '',//
        AADHAR_CARD: '',////
        CAST_CERTIFICATE: '',//
        DOMICILE_CERTIFICATE: '',//
        INCOME_CERTIFICATE: '',//
        TWELTH_MARKSHEET: '',//
        TENTH_MARKSHEET: '',//
        TRANSFER_CERTIFICATE: '',//
        OTHER_CERTIFICATE1: '',
        OTHER_CERTIFICATE2: ''

    }
    const [imgData, setImageData] = useState(initialValues);
    const [imgDataOnline, setImageDataOnline] = useState(initialValues);
    const [stdId1, setStdId] = useState('');
    const [is_data, setIs_data] = useState(false);

    useEffect(() => {
        


        const stdData = JSON.parse(localStorage.getItem('userEdit'));


        if (!stdData) {
            if (isStudentAdmin()) {
                console.log("Navigated ");
                navigate('/student_admin_dashboard/studentaccounttable');
            }
            else if (isAccountAdmin()) {
                console.log("Navigated ");
                navigate('/account_admin_dashboard/studentaccounttable');
            }
            else if (isSuperAdmin()) {
                console.log("Navigated ");
                navigate('/admin_dashboard/studentaccounttable');
            }

        }
        setStdId((stdData.accountInfo.stdId).toString())


        console.log(stdId1)

        const getData = async () => {
            console.log(stdId1)
            var config = {
                method: 'get',
                url: `${AllUrl.GetDocumentsOfStudents}/${(stdData.accountInfo.stdId).toString()}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios(config);

            if (response.status === 200) {
                const data = response.data;
                console.log(data)

                data.forEach((ele) => {
                    setImageDataOnline((val) => {

                        return {

                            ...val,
                            [ele.doc_type]: ele.doc_Url


                        }

                    })

                })

            }

        }
        getData();


    }, [])


    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            // console.log(values);
            // console.log(imgData)
            let img_obj_db = [];
            Object.entries(imgData).forEach(([key, value]) => {

                if (value !== '') {
                    img_obj_db.push({
                        document_type: key,
                        base64Data: value

                    })

                    console.log(key)
                }
            })

            if(img_obj_db.length >=1){
setLoading(true)

                
                const data = [
                    {
                        stdId: stdId1
                        
                },
                img_obj_db
            ]
            
            var config = {
                method: 'POST',
                url:AllUrl.UploadDocument,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                data:data
            };
            const result = await axios(config);
            if(result.status === 200){
                setLoading(false)
                toast('file upload succefullly!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
             

            }
            console.log(result)
            
        }
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
                setIs_data(true);
            }
            reader.onerror = (err) => {
                console.log(err);
            }
        }
    }

    const showImgOnLightBox = (image, title) => {
        setLightBox({ image, title })
        setShowLightBox(true)
    }

    const ImgDiv = ({ IMG, ONLINE_IMG, DISPLAY_NAME, NAME_FOR_FILE }) => {
        return (
            <div className="col m-2" style={{ height: '250px', width: 'auto', backgroundColor: 'white', border: '3px solid #7E84A3', borderRadius: '5px' }}>
                {IMG !== '' ?

                    <img className='mt-1 p-1' onClick={() => { showImgOnLightBox(IMG, NAME_FOR_FILE) }} src={IMG} alt="avtar_photo2" style={{ height: '190px', width: '100%', cursor: 'pointer' }} />
                    :
                    ONLINE_IMG !== '' ?

                        <img className='mt-1 p-1' onClick={() => { showImgOnLightBox(ONLINE_IMG, NAME_FOR_FILE) }} src={ONLINE_IMG} alt="avtar_photo1" style={{ height: '190px', width: '100%', cursor: 'pointer' }} />
                        :
                        <div style={{ height: '190px', width: '100%', cursor: 'pointer' }} className='d-flex justify-content-center' >
                            <img className='mx-auto my-auto' src={UploadDocumentImage} alt="avtar_photo" />
                        </div>
                }
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
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
 {loading && (
                <div
                    className="lds-roller"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
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
            )}

            {showLightBox && <ImageLightbox image={Lightbox.image} title={Lightbox.title} onClose={() => { setShowLightBox(false) }} />}

            <form onSubmit={formik.handleSubmit}>

                <div className="row m-1">
                    {<ImgDiv IMG={imgData.PHOTO} ONLINE_IMG={imgDataOnline.PHOTO} DISPLAY_NAME={'+ Passport Photo'} NAME_FOR_FILE={'PHOTO'} />}
                    {<ImgDiv IMG={imgData.TENTH_MARKSHEET} ONLINE_IMG={imgDataOnline.TENTH_MARKSHEET} DISPLAY_NAME={'+ 10th Marksheet'} NAME_FOR_FILE={'TENTH_MARKSHEET'} />}
                    {<ImgDiv IMG={imgData.TWELTH_MARKSHEET} ONLINE_IMG={imgDataOnline.TWELTH_MARKSHEET} DISPLAY_NAME={'+ 12th Marksheet'} NAME_FOR_FILE={'TWELTH_MARKSHEET'} />}
                    {<ImgDiv IMG={imgData.AADHAR_CARD} ONLINE_IMG={imgDataOnline.AADHAR_CARD} DISPLAY_NAME={'+ Aadhar Card'} NAME_FOR_FILE={'AADHAR_CARD'} />}
                    {<ImgDiv IMG={imgData.CAST_CERTIFICATE} ONLINE_IMG={imgDataOnline.CAST_CERTIFICATE} DISPLAY_NAME={'+ Cast Certificate'} NAME_FOR_FILE={'CAST_CERTIFICATE'} />}

                </div>
                <div className="row m-1">
                    {<ImgDiv IMG={imgData.INCOME_CERTIFICATE} ONLINE_IMG={imgDataOnline.INCOME_CERTIFICATE} DISPLAY_NAME={'+ Income Cretificate'} NAME_FOR_FILE={'INCOME_CERTIFICATE'} />}
                    {<ImgDiv IMG={imgData.DOMICILE_CERTIFICATE} ONLINE_IMG={imgDataOnline.DOMICILE_CERTIFICATE} DISPLAY_NAME={'+ Mp Domicile'} NAME_FOR_FILE={'DOMICILE_CERTIFICATE'} />}
                    {<ImgDiv IMG={imgData.TRANSFER_CERTIFICATE} ONLINE_IMG={imgDataOnline.TRANSFER_CERTIFICATE} DISPLAY_NAME={'+ Transfer Certificate'} NAME_FOR_FILE={'TRANSFER_CERTIFICATE'} />}
                    {<ImgDiv IMG={imgData.OTHER_CERTIFICATE1} ONLINE_IMG={imgDataOnline.OTHER_CERTIFICATE1} DISPLAY_NAME={'+ Other Document'} NAME_FOR_FILE={'OTHER_CERTIFICATE1'} />}
                    {<ImgDiv IMG={imgData.OTHER_CERTIFICATE2} ONLINE_IMG={imgDataOnline.OTHER_CERTIFICATE2} DISPLAY_NAME={'+ Other Document'} NAME_FOR_FILE={'OTHER_CERTIFICATE2'} />}
                </div>

                <div className="justify-self-end mb=5">

                    <button disabled={!is_data} className="btn btn-sm btn-warning text-light fw-bold " style={{ width: "200px" }} type="submit">Submit</button>

                </div>


            </form>
        </>
    )
}

export default UploadDocumentFrom
