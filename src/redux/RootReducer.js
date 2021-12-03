import { combineReducers } from "redux";
import { userReducer } from "./reducers/authReducer";

const RootReducer = combineReducers({
  auth: userReducer,
});

export default RootReducer;
