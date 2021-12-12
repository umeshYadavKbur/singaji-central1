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
import { cilLockLocked, cilSettings } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "../../assests/image/Mask Group 39.png";
import "./styles/HeaderDropdown.css";
import { useHistory } from "react-router-dom";
import { logout } from "../../../redux/actionDispatcher/authDispatcher";
import { connect } from "react-redux";

const AppHeaderDropdown = ({ userData, logout }) => {
  const history = useHistory();

  const logoutfunction = () => {
    console.log("====================================");
    logout();
    localStorage.clear();
    history.push("/login");
    console.log("====================================");
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="lg" />
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <div
          style={{
            height: "50px",
            width: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <img  src={avatar8} alt="logo" /> */}
          <CAvatar
            src={avatar8}
            // size="lg"
            style={{
              top: "20px",
              left: "110px",
              height: "82px",
              width: "82px",
            }}
          />
          <p
            style={{
              marginTop: "20px",
              marginLeft: "70px",
              width: "320%",
              fontSize: "12px",
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {userData.userInfo} roshany.bca2020@ssism.org
          </p>
        </div>
        <CDropdownItem
          style={{
            marginTop: "120px",
            marginLeft: "94px",
            marginBlockEnd: "20px",
            color: "white",
            width: 'fit-content',
          }}
          href="#"
        >
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider style={{ color: "white" }} />
        <CDropdownItem
          style={{
            color: "white",
            marginTop: "20px",
            marginLeft: "94px",
            hover: "false",
            width: 'fit-content',
          }}
        >
          <div className="dropdown_profile_pic" onClick={logoutfunction}>
            {/* <CIcon icon={cilLockLocked} className="me-2" /> */}
            <button style={{ outline: '1px solid white', color: 'white', backgroundColor: "#7e7e7e", borderRadius: '4px', border: 'none', width: '90px' }}>Log out</button>
          </div>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
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
