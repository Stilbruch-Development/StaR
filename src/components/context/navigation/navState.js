import React, { useReducer } from "react";
import NavContext from "./navContext";
import navReducer from "./navReducer";

import { SET_NAVSTATE } from "../types";

const NavState = props => {
  const initialState = { rightSidebareOpen: false, reportList: "" };

  const [state, dispatch] = useReducer(navReducer, initialState);

  // SET_NAVSTATE
  const setNavState = (item, value) => {
    dispatch({
      type: SET_NAVSTATE,
      payload: { item, value }
    });
  };

  return (
    <NavContext.Provider
      value={{
        rightSidebareOpen: state.rightSidebareOpen,
        reportList: state.reportList,
        setNavState
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavState;
