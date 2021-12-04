import { combineReducers } from "redux";
import userReducer from "./reducers/authReducer";
import newPassReducer from "./reducers/newPassReducer";

//Combining the reducer's into a rootReducer
const RootReducer = combineReducers({
  auth: userReducer,
  newPassword: newPassReducer,
});

export default RootReducer;
