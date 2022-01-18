import React from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import avatar8 from "../assests/image/david.png";
import "./styles/HeaderDropdown.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actionDispatcher/auth/authDispatcher";
import { connect } from "react-redux";
import Settings from '../assests/image/setting.svg';


const AppHeaderDropdown = ({ userData, logout }) => {
  // const history = useHistory();
  const navigate = useNavigate();

  const logoutfunction = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };


  return (
    <CDropdown variant="nav-item" style={{ zIndex: '510' }} >
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="lg" />
      </CDropdownToggle>

      <CDropdownMenu component={'div'} className="pt-0 " placement="bottom-end" style={{ backgroundColor: '#7e84a3', marginLeft: '-223px', height: '-webkit - fill - available', zIndex: '510' }} >
        <div style={{ flexDirection: 'column', backgroundColor: '#7e84a3', minHeight: '369px', width: '294px', alignItems: 'center', paddingTop: '49px', display: 'flex', flex: 'basis', zIndex: '510' }}>
         
         
          <CAvatar
            src={avatar8}
            style={{
              height: "82px",
              width: "82px",
            }}
          />
          <p style={{ textAlign: 'center', color: 'white', fontSize: '11px' }}><span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>{userData.userInfo}</span><br /> {userData.email}</p>
          {/* <button
            style={{
              outline: "1px solid white",
              color: "white",
              backgroundColor: "#7e84a3",
              borderRadius: "4px",
              border: "none",
              height: "29px",
              width: "220px",
              fontSize: "13px"
            }}
          >
            Manage your server
          </button> */}
          <hr style={{ color: 'white', width: '294px', height: '1px', opacity: '1' }} />
          <div style={{ cursor: 'pointer' }}>
            <img style={{ height: '18px', width: '18px', marginLeft: '-50px' }} src={Settings} alt="Settings" />
            <span style={{ color: 'white', fontWeight: '4px', marginLeft: '8px' }}>
              Settings
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
      </CDropdownMenu>
    </CDropdown >
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
