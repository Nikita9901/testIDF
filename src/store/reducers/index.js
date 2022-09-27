import { combineReducers } from "redux";
import dataSignUpReducer from "./dataSignUpReducer";
import dataPersonalReducer from "./dataPersonalReducer";

export default combineReducers({
  dataSignUpReducer: dataSignUpReducer,
  dataPersonalReducer: dataPersonalReducer,
});
