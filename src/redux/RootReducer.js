import { combineReducers } from "redux";
import userReducer from './reducers/authReducer'
import forgetPassReducer from "./reducers/forgotPasswordReducer";

//Combining the reducer's into a rootReducer
const RootReducer = combineReducers({
  auth: userReducer,
  response: forgetPassReducer
});

export default RootReducer;
