import React, { useReducer } from "react";
import NavigationContext from "./navContext";
import navReducer from "./navReducer";

import { CLOSE_NAV, OPEN_NAV, SWITCH_NAV, TOGGLE_SIDEBAR } from "../types";

const NavState = props => {
  const initialState = {
    navbarOpen: false,
    sidebarOpen: false
  };

  const [state, dispatch] = useReducer(navReducer, initialState);

  // CLOSE_NAV
  const closeNav = () => {
    dispatch({ type: CLOSE_NAV });
  };

  // OPEN_NAV
  const openNav = () => {
    dispatch({ type: OPEN_NAV });
  };

  // SWITCH_NAV
  const switchNav = () => {
    dispatch({ type: SWITCH_NAV });
  };

  // TOGGLE_SIDEBAR
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  return (
    <NavigationContext.Provider
      value={{
        navbarOpen: state.navbarOpen,
        sidebarOpen: state.sidebarOpen,
        closeNav,
        openNav,
        switchNav,
        toggleSidebar
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};

export default NavState;
