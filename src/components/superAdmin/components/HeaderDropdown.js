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

import avatar8 from '../../assests/image/Mask Group 39.png'
import "./styles/HeaderDropdown.css";

const AppHeaderDropdown = () => {
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
          <CAvatar src={avatar8} size="lg" style={{ margin: "10% 120%" }} />
          <p
            style={{
              width: "320%",
              fontSize: "12px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            roshany.bca2020@ssism.org
          </p>
        </div>
        <CDropdownItem style={{ marginTop: "60px" }} href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
