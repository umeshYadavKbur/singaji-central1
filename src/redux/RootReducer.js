import { combineReducers } from "redux";
import userReducer from "./reducers/authReducer";
import newPassReducer from "./reducers/newPassReducer";
import forgetPassReducer from "./reducers/forgotPasswordReducer";
import newAdminReducer from "./reducers/createAdminReducer";
import showSideBarReducer from "./reducers/showSideBarReducer";
import createNewFeesStructure from "./reducers/createFeesStructureReducer";
import changeStudentStatus from "./reducers/activeDeactiveStudentReducer";
import addNewStudentReducer from "./reducers/studentTableReducer";
import adminTableReducer from "./reducers/adminTableReducer"
import feesstructureTableReducer from "./reducers/feesStuctureTableReducer"
import VerifyStudentReducer from "./reducers/studentVerifyTableReducer";

//Combining the reducer's into a rootReducer
const RootReducer = combineReducers({
  auth: userReducer,
  newPassword: newPassReducer,
  response: forgetPassReducer,
  createAdmin: newAdminReducer,
  sidebar: showSideBarReducer,
  feeStructure: createNewFeesStructure,
  statusStudent: changeStudentStatus,
  studentTableData: addNewStudentReducer,
  adminTableData: adminTableReducer,
  feesStructTableData: feesstructureTableReducer,
  VerifyStudent: VerifyStudentReducer,
  // addStudent: addNewStudentReducer,
});

export default RootReducer;
