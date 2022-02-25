import {
  CButton,
  CModal,
  CModalBody,
  // CModalHeader,
  // CModalTitle,
  // CModalTitle,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import crossButton from "../assests/image/crossButton.svg";
import "./styles/createAdmin.css";
import { createNewAdmin } from "../../redux/actionDispatcher/superAdmin/createNewAdminDispatcher";
// import { useNavigate } from "react-router-dom";
import LoaderButton from "../assests/common/LoaderButton";
// import AllUrl from "../../redux/constants/url";
import axios from 'axios';
import personal_png from "../assests/image/personal-profile.svg"
// import { useAnimate } from "react-simple-animate";
import Settings from '../assests/image/setting.svg';
import AllUrl from "../../redux/constants/url";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import passKey from "../assests/image/key.svg";
import "./styles/SettingModalFile.css"
// import Plus_icon from '../assests/image/Plus_icon.svg'

function CreateAdminPopup({ adminData, createNewAdmin, setShow2 }) {


  // --------------- Render count -----------------
  // const[render,setRender] = useState(0);
  // useEffect(()=>{
  //   setRender( prevRenderCount => prevRenderCount + 1)
  // },[])
  // console.log(`this component rendered ${render} times`)

  // let render = useRef(0);
  // useEffect(()=>{
  //   render.current = render.current + 1 ;
  // },[])
  // console.log(render.current)

  const myname = localStorage.getItem("user");
  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  console.log("------------------------------")
  // console.log(myname)

  const token = localStorage.getItem("token");
  // const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [visible, setVisibleSe] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [removemargin , setRemovemargin] = useState(false);

  const test = (val) => {

    console.log(val);
    if (show) {
      return (val ? val.length > 0 : false)
    } else {
      return true;
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Please fill the field above"),
    password: Yup.string().test('len', 'required', test),
    newpass: Yup.string().test('len', 'required', test),
    newpassAgain: Yup.string().test('len', 'required', test),
  });

 

  const formik = useFormik({
    initialValues: {
      name: myname ? myname : "",
      password: '',
      newpass: '',
      newpassAgain: '',
      photo: ''
    },
    validationSchema,
    onSubmit: async (values) => {

     
      
      // alert('ok')


      setLoading(true)

      var data = JSON.stringify({
        userId: userId,
        name: formik.values.name,
        oldPassword: formik.values.password,
        newPassword: formik.values.newpass,
        confirmPassword: formik.values.newpassAgain,
        photo: formik.values.photo
      });
      console.log(data, ":::::::::::::::::::: ");
      var config = {
        method: "POST",
        url: AllUrl.settingApi,
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      console.log("form submitted ---------------------")
      var response;
      if(formik.values.password === ''){

        response = await axios(config)
      }
      else if(formik.values.newpass !== formik.values.newpassAgain) {
        toast.success('New passwords are not same! ', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false)
      }
      else{
        response = await axios(config)
      }
      console.log(response);
      setLoading(false)
      
      if (response.status === 200) {
        setLoading(false)
        toast.success('Crendentials updated successfully ', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setVisibleSe(!visible)
        setShow2(false)
      }
     else if (response.status === 208) {
        setLoading(false)
        toast.warn('Your current password is invalid', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    
      // if (formik.values.password === '' && formik.values.newpass === '' && formik.values.newpassAgain === '') {

      //   response = await axios(config)
      //   setLoading(false)
      // }
      // else if (formik.values.password !== '' && formik.values.newpass === '' && formik.values.newpassAgain === '') {
      //   toast.warn('Enter the remaining two fields!', {
      //     position: "bottom-center",
      //     autoClose: 4000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      //   setLoading(false)

      // } else if (formik.values.password !== '' && formik.values.newpass !== '' && formik.values.newpassAgain === '') {

      //   toast.warn('Enter the remaining one field!', {
      //     position: "bottom-center",
      //     autoClose: 4000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      //   setLoading(false)
      // } else {
      //   if (formik.values.password !== '' && formik.values.newpass !== '' && formik.values.newpassAgain !== '') {
      //     if (formik.values.newpass === formik.values.newpassAgain) {

      //       response = await axios(config)
      //       setLoading(false)
      //     } else {
      //       toast.warn('Enter the same new passwords!', {
      //         position: "bottom-center",
      //         autoClose: 4000,
      //         hideProgressBar: true,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //       });
      //       setLoading(false)
      //     }
      //   }
      // }




      // } else if (formik.values.password !== '' && formik.values.newpass !== '' && formik.values.newpassAgain !== '') {
      //   if (formik.values.newpass === formik.values.newpassAgain) {
      //     setLoading(false)
      //     response = await axios(config)

      //   } else {
      //     toast.warn('Enter the same new passwords!', {
      //       position: "bottom-center",
      //       autoClose: 4000,
      //       hideProgressBar: true,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   }
      // }

     

      // createNewAdmin(config, navigate);

    },
  });

  // useEffect(() => {
  //   console.log(formik.errors);
  //   if (!show) {
  //     formik.errors.newpass = ''
  //     formik.errors.newpassAgain = ''
  //     formik.errors.password = ''
  //   }
  // }, [show, formik.errors])
  useEffect(()=>{

    console.log(formik.errors);
  },[formik.errors])

  const imageToBase64 = async (file, feildName) => {
    if (file) {
      const options = {
        maxSizeMB: 0.01,
        maxWidthOrHeight: 1920,
        // useWebWorker: true
      }
      try {
        const compressedFile = await imageCompression(file, options);
        // console.log(compressedFile)
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        var reader = new FileReader();
        reader.readAsDataURL(compressedFile)
        reader.onload = async () => {
          var Base64 = reader.result
          // console.log(Base64)
          formik.setFieldValue("photo1", Base64)

          // setIs_data(true);
        }
        reader.onerror = (err) => {
          console.log(err);
        }
      } catch (error) {
        console.log(error);
      }

    }
  }

  return (
    <div>
      <CButton
        className="personal-setting-button button"
        onClick={() => setVisibleSe(!visible)}
      >
        <img style={{
          height: '18px',
          width: '18px',
          marginLeft: '-50px',

          marginRight: "10px"
        }} src={Settings} alt="Settings" />
        {/* <i className="fas fa-plus"></i> */}
        Settings
      </CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          formik.handleReset();
          setVisibleSe(false);
        }}
      >
        <CModalBody className="my-modal-body" >
          <div className="main-container createAdmin ">
            <div className=" cross-btn-div d-flex ">
              <img onClick={() => setVisibleSe(!visible)}
                src={crossButton} alt="close" className="cross-button" />
            </div>
            <div className="second_div justify-content-center mt-0 ">
              <form onSubmit={formik.handleSubmit} className="d-flex justify-content-center flex-column" >

                <div className="row d-flex justify-content-center" style={{ marginTop: "-85px" }}  >


                  <div className="form-row d-flex justify-content-center  mt-2  " >
                    {/* {formik.values.photo1 !== '' ? <img style={{cursor: 'pointer',height: '100px',width: '100px',borderRadius: '50%',cursor: 'pointer' , marginTop: "-16px"}} className='ml-2' onClick={() => {document.getElementById("profilePhoto").click()}} src={formik.values.photo1} alt="pppp" />
                                        : <img style={{cursor: 'pointer',height:  '100px',width:  '100px', marginTop: "-16px"}} className='ml-2' onClick={() => {document.getElementById("profilePhoto").click()}} src={personal_png} alt="pppp" /> 
                                    }
                                    <img  alt="Plus_icon" src={Plus_icon} style={{marginTop:'21px', marginLeft:'-11px'}} />
                                    <input type="file" name="photo"  value={formik.values.photo} id="profilePhoto" style={{display: "none"}} accept="image/*" onChange={(e) => {
                                        imageToBase64(e.target.files[0],"photo");
                                    }} /> */}
                    <img src={personal_png} alt="logo ssism" className="personal-profile" />{" "}
                  </div>




                </div>
                <div className="row d-flex justify-content-center mt-2 font-color " >{userEmail}</div>
                <div className="row d-flex justify-content-center fw-bold mt-2 font-color" style={{ fontSize: "22px" }}>Edit Profile</div>

                <div className="d-flex flex-column justify-content-center align-items-center" >

                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="inputs name-input"
                    // onClick={(e) => (e.stopPropagation())}
                    // aria-label="email"
                    name="name"
                    type="text"
                    id="name"

                  // placeholder="Enter name "
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <div style={{ marginRight: "95px" }} className="text-danger fs-6">
                      {formik.errors.name}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="  d-flex">
                    <div className="col-10" style={{ marginLeft: "2px" }}>

                      <input


                        class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"

                        autocomplete="off" 
                        value={formik.values.pass}
                        onChange={formik.handleChange}
                        onClick={() => setShow(!show)}

                        onBlur={formik.handleBlur}
                        className="inputs key-icon-input "
                        // aria-label="email"
                        name="password"
                        type=""
                        // className="key-icon-input"
                        id="password"
                        placeholder={!show ? "Password" : "Current password"}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <div style={{ marginRight: "45px" }} className="text-danger fs-6">
                          {formik.errors.password}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-2">

                      <img src={passKey} height="25px" onClick={() => setShow(!show)} width="25px" className="key-icon" alt="" />
                    </div>

                  </div>

                  <div >
                    {
                      show ?
                        <div id="box" className="box d-flex flex-column justify-content-center"  >
                          <input type="text"
                            value={formik.values.newpass}
                            onChange={formik.handleChange}
                            name="newpass"
                            style={{marginTop: `${(formik.errors.newpass && formik.touched.newpass) ? "2px" : "22px"}`}}
                            autocomplete="off" 
                            placeholder="New password" className="hidden-inputs" />
                          {formik.errors.newpass && formik.touched.newpass ? (
                            <div className="text-danger fs-6">
                              {formik.errors.newpass}
                         

                            </div>
                          ) : (
                            ""
                          )}


                          <input type="text"
                            value={formik.values.newpassAgain}
                            onChange={formik.handleChange}
                            name="newpassAgain"
                            style={{marginTop: `${(formik.errors.newpass && formik.touched.newpass) ? "2px" : "22px"}`}}
                            autocomplete="off" 
                            placeholder="New password, again" className="hidden-inputs" />
                          {formik.errors.newpassAgain && formik.touched.newpassAgain ? (
                            <div className="text-danger fs-6">
                              {formik.errors.newpassAgain}
                            
                            </div>
                          ) : (
                            ""
                          )}
                        </div> : ""
                    }
                  </div>

                </div>
                <div style={{ height: `${!show ? "35px" : "20px"}` }} ></div>
                <button
                  disabled={adminData.loading}

                  className=" setting-save-btn mx-auto"
                  type="submit"
                >
                  {loading ? <LoaderButton /> : "Save"}
                </button>
              </form>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </div>
  );
}

//Getting the state from the store
const mapStateToProps = (state) => {
  return {
    adminData: state.createAdmin,
  };
};

//passing the userData in createNewAdmin function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    createNewAdmin: (config, navigate) => dispatch(createNewAdmin(config, navigate)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminPopup);
