import { combineReducers } from "redux";
import userReducer from './reducers/authReducer'


//Combining the reducer's into a rootReducer
const RootReducer = combineReducers({
  auth: userReducer,
});

export default RootReducer;
