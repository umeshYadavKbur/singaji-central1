import {
  CButton,
  CModal,
  CModalBody,
  // CModalHeader,
  // CModalTitle,
  // CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
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
import { useAnimate } from "react-simple-animate";
import Settings from '../assests/image/setting.svg';
import AllUrl from "../../redux/constants/url";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import Plus_icon from '../assests/image/Plus_icon.svg'

function CreateAdminPopup({ adminData, createNewAdmin,setShow2 }) {

  const myname = localStorage.getItem("user");
  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  console.log("------------------------------")
  console.log(myname)

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [visible, setVisibleSe] = useState(false);
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object({
    name: Yup.string().required("Please fill the field above"),
    password: Yup.string().required("Please fill the field above"),
    newpass: Yup.string().required("Please fill the field above"),
    newpassAgain: Yup.string().required("Please fill the field above"),
  });

  const formik = useFormik({
    initialValues: {
      name: myname ? myname : "",
      password: '',
      newpass: '',
      newpassAgain: ''
    },
    validationSchema,

    onSubmit: async (values) => {
      if (formik.values.newpass === formik.values.newpassAgain) {
        setLoading(true)

        var data = JSON.stringify({
          userId: userId,
          name: formik.values.name,
          password: formik.values.role,
          oldPassword: formik.values.password,
          newPassword: formik.values.newpass,
          confirmPassword: formik.values.newpassAgain,
          photo: formik.values.photo1
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

      }
      const response = await axios(config);
      setLoading(false)
      if (response.status === 200) {
        toast.suc('Crendentials updated successfully ', {
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
      if(response.status === 201){
        toast.warn('There is an problem while uploading new data ', {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // createNewAdmin(config, navigate);

    },
  });

  const imageToBase64 = async (file,feildName) => {
    if(file) {
        const options = {
            maxSizeMB: 0.01,
            maxWidthOrHeight: 1920,
            // useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(file,options);
            // console.log(compressedFile)
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            var reader = new FileReader();
            reader.readAsDataURL(compressedFile)
            reader.onload = async () => {
                var Base64 = reader.result
                // console.log(Base64)
                formik.setFieldValue("photo1",Base64)
                
                // setIs_data(true);
            }
            reader.onerror = (err) => {
                console.log(err);
            }
        } catch(error) {
            console.log(error);
        }

    }
}

  return (
    <div>
      <CButton
        className="personal-setting-button"
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
          <div className="first_div createAdmin ">
            <div className=" cross-btn-div d-flex ">
              <img onClick={() => setVisibleSe(!visible)}
                style={{ height: "22px", width: "22px", cursor: "pointer", marginRight: "14px", marginTop: "15px" }} src={crossButton} alt="close" className="logo_img" />
            </div>
            <div className="second_div justify-content-center  " style={{ marginTop: "0px" }}>
              <form onSubmit={formik.handleSubmit} className="d-flex justify-content-center flex-column" >

                <div className="row d-flex justify-content-center" style={{ marginTop: "-85px" }}  >
                  

                <div className="form-row d-flex justify-content-center  mt-2" style={{cursor: 'pointer'}} >
                                    {formik.values.photo1 !== '' ? <img style={{cursor: 'pointer',height: '100px',width: '100px',borderRadius: '50%',cursor: 'pointer' , marginTop: "-16px"}} className='ml-2' onClick={() => {document.getElementById("profilePhoto").click()}} src={formik.values.photo1} alt="pppp" />
                                        : <img style={{cursor: 'pointer',height:  '100px',width:  '100px', marginTop: "-16px"}} className='ml-2' onClick={() => {document.getElementById("profilePhoto").click()}} src={personal_png} alt="pppp" /> 
                                    }
                                    <img  alt="Plus_icon" src={Plus_icon} style={{marginTop:'21px', marginLeft:'-11px'}} />
                                    <input type="file" name="photo"  value={formik.values.photo} id="profilePhoto" style={{display: "none"}} accept="image/*" onChange={(e) => {
                                        imageToBase64(e.target.files[0],"photo");
                                    }} />
                                </div>




                </div>
                <div className="row d-flex justify-content-center mt-2 " style={{ color: "#5a607f" }}>{userEmail}</div>
                <div className="row d-flex justify-content-center fw-bold mt-2 " style={{ color: "#5a607f", fontSize: "22px" }}>Edit Profile</div>

                <div className="d-flex flex-column justify-content-center" style={{ alignItems: "center" }}>

                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="inputs"
                    // onClick={(e) => (e.stopPropagation())}
                    // aria-label="email"
                    name="name"
                    type="text"
                    style={{ width: "270px", marginTop: "32px", height: "40px" }}
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
                  <input
                    value={formik.values.pass}
                    onChange={formik.handleChange}
                    onClick={() => setShow(!show)}

                    onBlur={formik.handleBlur}
                    className="inputs"
                    // aria-label="email"
                    name="password"
                    type=""
                    style={{ width: "270px", marginTop: "38px", height: "40px" }}
                    id="password"
                    placeholder="Current password"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div style={{ marginRight: "95px" }} className="text-danger fs-6">
                      {formik.errors.password}
                    </div>
                  ) : (
                    ""
                  )}

                  <div >
                    {
                      show ? <div id="box" className="box d-flex flex-column justify-content-center"  >
                        <input type="text"
                          value={formik.values.newpass}
                          onChange={formik.handleChange}
                          name="newpass"

                          placeholder="New password" style={{ width: "270px", marginTop: "38px", height: "40px" }} className="" />
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

                          placeholder="New password, again" style={{ width: "270px", marginTop: "38px", height: "40px" }} className="" />
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
                <div style={{ height: "35px" }} ></div>
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
