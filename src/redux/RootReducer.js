import { combineReducers } from "redux";
import { userReducer } from "./reducers/auth";

const RootReducer = combineReducers({
  auth: userReducer,
});

export default RootReducer;
