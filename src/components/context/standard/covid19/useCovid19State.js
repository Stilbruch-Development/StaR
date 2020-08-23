import { useState } from "react";

const initialVal = {
  covid19State: {
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
  covid19Report: {
    Satz_1: "",
    Satz_2: "",
    Satz_3: "",
    Satz_4: "",
    Gesamt: "",
    send: false,
  },
};

function useCovid19State() {
  const [Covid19State, setCovid19State] = useState(initialVal);

  return [Covid19State, setCovid19State];
}
export default useCovid19State;
