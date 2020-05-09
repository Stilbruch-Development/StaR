import { SET_COVID19_STATE, SET_COVID19_REPORT } from "../../types";

export default function (state, action) {
  switch (action.type) {
    case SET_COVID19_STATE:
      return {
        ...state,
        Covid19State: action.payload,
      };
    case SET_COVID19_REPORT:
      return {
        ...state,
        Covid19Report: action.payload,
      };

    default:
      return state;
  }
}
