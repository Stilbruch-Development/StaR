import React, { useReducer } from "react";
import Covid19Context from "./covid19Context1";
import covid19ieReducer from "./covid19Reducer1";

import { SET_COVID19_STATE, SET_COVID19_REPORT } from "../../types";

const Covid19State = (props) => {
  const initialState = {
    Covid19State: {
      Voruntersuchung: "",
      Kategorie: "",
      CTVeränderungen: {
        Kategorie1: [],
        Kategorie2: [],
        Kategorie3: [],
        Kategorie4: [],
      },
      Lokalisation: [],
      Ausdehnung: "unklar",
      Lungenparenchym:
        "Darüber hinaus unauffällige Darstellung des Lungenparenchyms.",
      Pleura: "Im Übrigen regelrecht anliegende Pleura.",
      Herz_Mediastinum: "Herz und Mediastinum regelrecht.",
      Lymphknoten: "Keine Lymphadenopathie.",
      Oberbauch: "Mit erfasster Oberbauch unauffällig.",
      Skelett: "Altersentsprechende Darstellung des Skeletts.",
    },
    Covid19Report: {
      Satz_1: "",
      Satz_2: "",
      Satz_3: "",
      Satz_4: "",
      Gesamt: "",
      send: false,
    },
  };

  const [state, dispatch] = useReducer(covid19ieReducer, initialState);

  // SET_COVID19STATE
  const setCovid19State = (state) => {
    dispatch({
      type: SET_COVID19_STATE,
      payload: state,
    });
  };

  // SET_COVID19REPORT
  const setCovid19Report = (state) => {
    dispatch({
      type: SET_COVID19_REPORT,
      payload: state,
    });
  };

  return (
    <Covid19Context.Provider
      value={{
        Covid19State: state.Covid19State,
        Covid19Report: state.Covid19Report,
        setCovid19State,
        setCovid19Report,
      }}
    >
      {props.children}
    </Covid19Context.Provider>
  );
};

export default Covid19State;
