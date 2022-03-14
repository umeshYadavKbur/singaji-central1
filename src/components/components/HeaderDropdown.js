import React, { useState } from "react";
import avatar8 from "../assests/image/david.png";
import "./styles/HeaderDropdown.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actionDispatcher/auth/authDispatcher";
import { connect } from "react-redux";
import { Tooltip, Whisper } from "rsuite";
import SettingsModalFile from "./SettingsModalFile";
import imageCompression from "browser-image-compression";
import david from "../assests/image/Avtar.jpeg"

const AppHeaderDropdown = ({ userData, logout }) => {
  // const history = useHistory();
  const [show, setShow2] = useState(false)
  const navigate = useNavigate();

  const logoutfunction = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };
  const [photo, setPhoto] = useState("");
  async function imageToBase64(file) {
    if (file) {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 1920
      });
      // var size = compressedFile.size / 1024 / 1024
      // size.slice(0,4)
      // console.log(` file size ${size} mb`);
      var reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = async () => {
        var base64 = reader.result;
        console.log(base64);
        setPhoto(base64);
      };
      reader.onerror = (err) => {
        console.log(err);
      };
    }
  }


  return (
    <div>
      <Whisper placement="bottom" controlId="control-id-hover" trigger="hover" speaker={
        <Tooltip>
          View Profile
        </Tooltip>
      }>
        <img
          onClick={() => setShow2(!show)}
          src={avatar8} alt=""
          style={{
            height: "42px",
            width: "42px",
            margin: "10px",
            marginRight: "0px",
            cursor: "pointer"
          }}
        />
      </Whisper>
      {
        show ?
          <div style={{ position: 'fixed', marginLeft: '-270px', marginTop: '10px' }}>
            <div style={{ flexDirection: 'column', backgroundColor: '#7e84a3', minHeight: '369px', width: '294px', alignItems: 'center', paddingTop: '49px', display: 'flex', flex: 'basis', zIndex: '510' }}>
              {/* <img
                alt=""
                src={avatar8}
                style={{
                  height: "82px",
                  width: "82px",
                }}
              /> */}
               <input
        type="file"
        accept="image/*"
        name="photo"
        id="photoOK"
        style={{ display: "none",cursor: "pointer" }}
        onChange={(e) => imageToBase64(e.target.files[0])}
      /> <div>
      {photo === "" ? (
        <img
          height="100px"
          width="100px"
          onClick={() => {
            document.getElementById("photoOK").click();
          }}
          style={{borderRadius: "50%" , cursor: "pointer"}}
          src={david}
          alt="--"
        />
      ) : (
        <img
          onClick={() => {
            document.getElementById("photoOK").click();
          }}
          style={{borderRadius: "50%", cursor: "pointer"}}

          height="100px"
          width="100px"
          src={photo}
          alt="---"
        />
      )}
    </div>
              <p style={{
                textAlign: 'center',
                color: 'white',
                fontSize: '11px'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}>{userData.userInfo}</span>
                <br /> {userData.email}</p>
              <hr style={{
                color: 'white',
                width: '294px',
                height: '1px',
                opacity: '1'
              }} />
                      
              <div style={{ marginTop: '-23px', cursor: 'pointer' }}>

                <span style={{
                  color: 'white',
                  fontWeight: '4px',
                  marginLeft: '8px'
                }}>
                  {/* Settings */}
                  <SettingsModalFile   setShow2={setShow2} />
                </span>
              </div>
              <hr style={{ color: 'white', width: '294px', height: '1px', opacity: '1' }} />
              <button
                style={{
                  marginTop: '10px',

                  outline: "1px solid white",
                  color: "white",
                  backgroundColor: "#7e84a3",
                  borderRadius: "4px",
                  border: "none",
                  height: "29px",
                  width: "110px",
                  fontSize: "13px"
                }}
                onClick={logoutfunction}
              >
                Log out
              </button>
            </div>
          </div>
          : ""
      }
    </div >
  );
};

//Getting the state from the store
const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};
//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderDropdown);
