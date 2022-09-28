import {
  SUBMIT_SIGNUP_INFORMATION,
  SUBMIT_PERSONAL_INFORMATION,
} from "../constants/actionTypes";

// Два action для форм
export const setPersonSignUpInfo = (personSignUpInfo) => ({
  type: SUBMIT_SIGNUP_INFORMATION,
  payload: personSignUpInfo,
});
export const setPersonPersonalInfo = (personPersonalInfo) => ({
  type: SUBMIT_PERSONAL_INFORMATION,
  payload: personPersonalInfo,
});
