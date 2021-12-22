import React from "react";
import {
  CAvatar,
  // CBadge,
  CDropdown,
  CDropdownDivider,
  // CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilSettings } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "../../assests/image/david.png";
import "./styles/HeaderDropdown.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/actionDispatcher/authDispatcher";
import { connect } from "react-redux";

const AppHeaderDropdown = ({ userData, logout }) => {
  // const history = useHistory();
  const navigate = useNavigate();

  const logoutfunction = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };


  return (

    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="lg" />
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <div style={{ flexDirection: 'column', height: '369px', width: '294px', alignItems: 'center', paddingTop: '49px', display: 'flex', flex: 'basis' }}>
          <CAvatar
            src={avatar8}
            style={{
              height: "82px",
              width: "82px",
            }}
          />
          <button
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
          </button>
          <p style={{ color: 'white', fontSize: '11px' }}><span style={{ color: 'white', fontSize: '13px' }}>{userData.userInfo}</span><br /> {userData.email}</p>
          <hr style={{ color: 'white', width: '294px', height: '1px', opacity: '1' }} />
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


{/* <CDropdownDivider style={{ color: "white" }} /> */ }
{/* <CDropdownItem
              style={{
                color: "white",
                marginTop: "20px",
                marginLeft: "94px",
                hover: "false",
                width: "fit-content",
              }}
            > */}
{/* <div className="dropdown_profile_pic" onClick={logoutfunction}>
                <CIcon icon={cilLockLocked} className="me-2" />
                <button
                  style={{
                    outline: "1px solid white",
                    color: "white",
                    backgroundColor: "#7e7e7e",
                    borderRadius: "4px",
                    border: "none",
                    width: "90px",
                  }}
                >
                  Log out
                </button>
              </div> */}
{/* </CDropdownItem> */ }