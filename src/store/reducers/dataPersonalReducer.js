import { SUBMIT_PERSONAL_INFORMATION } from "../constants/actionTypes";

// Редьюсер для обработки формы Personal
const initialState = {
  first_name: "",
  last_name: "",
  sex: "",
  birthday: {},
  ocean: "",
  hobby: [],
};

const dataPersonalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_PERSONAL_INFORMATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default dataPersonalReducer;
