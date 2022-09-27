import { SUBMIT_SIGNUP_INFORMATION } from "../constants/actionTypes";

const initialState = {
  phone: "",
  email: "",
  password: "",
};

const dataSignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_SIGNUP_INFORMATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default dataSignUpReducer;
