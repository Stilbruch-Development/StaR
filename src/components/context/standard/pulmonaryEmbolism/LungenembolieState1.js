import React, { useReducer } from "react";
import LungenembolieContext from "./lungenembolieContext";
import lungenembolieReducer from "./lungenembolieReducer";

import { SET_LUNGENEMBOLIE } from "../../types";

const PulmonaryEmbolismState = (props) => {
  const initialState = {
    PulmonaryEmbolismState: {
      Voruntersuchung: "",
      PulmonaryEmbolism: "",
      Lokalisation: [],
      Abschnitte: [],
      Rechtsherzbelastung: "",
      Rechtsherzbelastungszeichen: [],
      Lungenparenchym: "Unauffällige Darstellung des Lungenparenchyms.",
      Pleura: "Regelrecht anliegende Pleura.",
      Herz_Mediastinum: "Herz und Mediastinum regelrecht.",
      Lymphknoten: "Keine Lymphadenopathie.",
      Oberbauch: "Mit erfasster Oberbauch unauffällig.",
      Skelett: "Altersentsprechende Darstellung des Skeletts.",
      send: false,
      Gesamt: "",
    },
  };

  const [state, dispatch] = useReducer(lungenembolieReducer, initialState);

  // SET_LUNGENEMBOLIE
  const setPulmonaryEmbolismState = (state) => {
    dispatch({
      type: SET_LUNGENEMBOLIE,
      payload: state,
    });
  };

  return (
    <LungenembolieContext.Provider
      value={{
        PulmonaryEmbolismState: state.PulmonaryEmbolismState,
        setPulmonaryEmbolismState,
      }}
    >
      {props.children}
    </LungenembolieContext.Provider>
  );
};

export default PulmonaryEmbolismState;
