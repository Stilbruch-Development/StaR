import { OPEN_DISPLAY, CLOSE_DISPLAY, SET_NAVSTATE } from "../types";

export default function (state, action) {
  switch (action.type) {
    case OPEN_DISPLAY:
      return {
        ...state,
        display: action.payload,
        rightSidebareOpen: true,
      };
    case CLOSE_DISPLAY:
      return {
        ...state,
        display: "",
        rightSidebareOpen: false,
      };
    case SET_NAVSTATE:
      const { item, value } = action.payload;
      return {
        ...state,
        [item]: value,
      };
    default:
      return state;
  }
}
