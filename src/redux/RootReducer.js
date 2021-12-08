import { combineReducers } from "redux";
import userReducer from "./reducers/authReducer";
import newPassReducer from "./reducers/newPassReducer";
import forgetPassReducer from "./reducers/forgotPasswordReducer";
import addNewStudentReducer from "./reducers/addNewStudentReducer";

//Combining the reducer's into a rootReducer
const RootReducer = combineReducers({
  auth: userReducer,
  newPassword: newPassReducer,
  response: forgetPassReducer,
  addStudent: addNewStudentReducer
});

export default RootReducer;
