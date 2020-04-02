import { OPEN_LIST, CLOSE_LIST, SET_NAVSTATE } from "../types";

export default function(state, action) {
  switch (action.type) {
    case OPEN_LIST:
      return {
        ...state,
        reportList: action.payload,
        rightSidebareOpen: true
      };
    case CLOSE_LIST:
      return {
        ...state,
        reportList: "",
        rightSidebareOpen: false
      };
    case SET_NAVSTATE:
      const { item, value } = action.payload;
      return {
        ...state,
        [item]: value
      };
    default:
      return state;
  }
}
