import {
  SET_ALERT_MESSAGE,
  SET_ALERT_BUTTON,
  SET_ALERT_ONCLICK,
  REMOVE_ALERT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT_MESSAGE:
      return { ...state, message: action.payload };
    case SET_ALERT_BUTTON:
      return { ...state, button: action.payload };
    case SET_ALERT_ONCLICK:
      return { ...state, onClickButton: action.payload };
    case REMOVE_ALERT:
      return {
        message: "",
        button: "",
        onClickButton: null
      };
    default:
      return state;
  }
};
