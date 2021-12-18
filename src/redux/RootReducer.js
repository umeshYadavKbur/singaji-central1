import { combineReducers } from "redux";
import userReducer from "./reducers/authReducer";
import newPassReducer from "./reducers/newPassReducer";
import forgetPassReducer from "./reducers/forgotPasswordReducer";
import newAdminReducer from "./reducers/createAdminReducer";
import showSideBarReducer from "./reducers/showSideBarReducer";
import createNewFeesStructure from "./reducers/createFeesStructureReducer";

//Combining the reducer's into a rootReducer
const RootReducer = combineReducers({
  auth: userReducer,
  newPassword: newPassReducer,
  response: forgetPassReducer,
  createAdmin: newAdminReducer,
  sidebar: showSideBarReducer,
  feeStructure: createNewFeesStructure,
  // addStudent: addNewStudentReducer,
});

export default RootReducer;
