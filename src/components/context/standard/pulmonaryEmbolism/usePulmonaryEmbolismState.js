import { useState } from "react";

const initialVal = {
  Voruntersuchung: "",
  Lungenembolie: "",
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
};

function usePulmonaryEmbolismState() {
  const [PulmonaryEmbolismState, setPulmonaryEmbolismState] = useState(
    initialVal
  );

  return [PulmonaryEmbolismState, setPulmonaryEmbolismState];
}
export default usePulmonaryEmbolismState;
