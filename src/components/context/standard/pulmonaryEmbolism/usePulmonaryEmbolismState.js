import { useState } from 'react';

const initialVal = {
  Voruntersuchung: '',
  Lungenembolie: '',
  Lokalisation: [],
  Abschnitte: [],
  Rechtsherzbelastung: '',
  Rechtsherzbelastungszeichen: [],
  Lungenparenchym: 'Keine suspekte pulmonale Verdichtung.',
  Pleura: 'Kein Pleuraerguss.',
  Herz_Mediastinum: '',
  Lymphknoten: 'Keine Lymphadenopathie.',
  Oberbauch: 'Oberbauch, soweit erfasst, unauffällig.',
  Skelett: 'Skelett mit degenerativen Veränderungen.',
  send: false,
  Gesamt: ''
};

function usePulmonaryEmbolismState() {
  const [PulmonaryEmbolismState, setPulmonaryEmbolismState] =
    useState(initialVal);

  return [PulmonaryEmbolismState, setPulmonaryEmbolismState];
}
export default usePulmonaryEmbolismState;
