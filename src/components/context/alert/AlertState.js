import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

import { REMOVE_ALERT, SET_ALERT_STATE } from "../types";

const AlertState = (props) => {
  const initialState = {
    message: "",
    button: "",
    onClickButton: null,
    color: "rgba(255,184,191, 0.8)",
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Remove Alert
  const removeAlert = () => {
    dispatch({
      type: REMOVE_ALERT,
    });
  };

  // Set Alert args = { item, value }, item as string!
  const setAlert = (...args) => {
    for (var i = 0; i < args.length; i++) {
      dispatch({
        type: SET_ALERT_STATE,
        payload: args[i],
      });
    }
    setTimeout(() => {
      removeAlert();
    }, 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alertState: state,
        message: state.message,
        button: state.button,
        onClickButton: state.onClickButton,
        removeAlert,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
