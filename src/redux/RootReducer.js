import { combineReducers } from "redux";
import userReducer from "./reducers/auth/authReducer";
import newPassReducer from "./reducers/auth/newPassReducer";
import forgetPassReducer from "./reducers/auth/forgotPasswordReducer";


import newAdminReducer from "./reducers/superAdmin/createAdminReducer";
import showSideBarReducer from "./reducers/superAdmin/showSideBarReducer";
import createNewFeesStructure from "./reducers/superAdmin/createFeesStructureReducer";
import changeStudentStatus from "./reducers/superAdmin/activeDeactiveStudentReducer";
import addNewStudentReducer from "./reducers/superAdmin/studentTableReducer";
import adminTableReducer from "./reducers/superAdmin/adminTableReducer"
// import feesstructureTableReducer from "./reducers/superAdmin/feesStuctureTableReducer"
import feesstructureTableReducer from "./reducers/superAdmin/feesStuctureTableReducer.js"
import VerifyStudentReducer from "./reducers/superAdmin/studentVerifyTableReducer";
import AdminStatusChangeReducer from "./reducers/superAdmin/adminStatusChangeReducer";
import fetchStudentAccountData from "./reducers/superAdmin/StudentAccountTableReducer";
import studentAccountTableStudentInformation from "./reducers/account/studentAccountTableStudentInformationreducer";


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
    AdminStatusChangeData: AdminStatusChangeReducer,
    addStudent: addNewStudentReducer,
    accountStudentTableData: fetchStudentAccountData,
    studentAccountTableStudentInformation: studentAccountTableStudentInformation,

});

export default RootReducer;