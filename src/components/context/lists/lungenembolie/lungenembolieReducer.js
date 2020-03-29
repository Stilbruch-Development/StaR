import { SET_LUNGENEMBOLIE } from "../../types";

export default function(state, action) {
  switch (action.type) {
    case SET_LUNGENEMBOLIE:
      return {
        ...state,
        LungenembolieState: action.payload
      };
    default:
      return state;
  }
}
