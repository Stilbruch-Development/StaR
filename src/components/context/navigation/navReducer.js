import { CLOSE_NAV, OPEN_NAV, SWITCH_NAV, TOGGLE_SIDEBAR } from "../types";

export default function(state, action) {
  switch (action.type) {
    case CLOSE_NAV:
      return {
        ...state,
        navbarOpen: false
      };
    case OPEN_NAV:
      return {
        ...state,
        navbarOpen: true
      };
    case SWITCH_NAV:
      return {
        ...state,
        navbarOpen: !state.navbarOpen
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };
    default:
      return state;
  }
}
