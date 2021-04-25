import { useState } from 'react';

const initialVal = {
  Voruntersuchung: '',
  Kategorie: '',
  CTVeränderungen: {
    Kategorie1: [],
    Kategorie2: [],
    Kategorie3: [],
    Kategorie4: []
  },
  Lokalisation: [],
  Ausdehnung: 'unbenannter',
  Lungenparenchym: 'Keine suspekte pulmonale Verdichtung.',
  Pleura: 'Kein Pleuraerguss.',
  Herz_Mediastinum: '',
  Lymphknoten: 'Keine Lymphadenopathie.',
  Oberbauch: 'Oberbauch, soweit erfasst, unauffällig.',
  Skelett: 'Skelett mit degenerativen Veränderungen.',
  Satz_1: '',
  Satz_2: '',
  Satz_3: '',
  Satz_4: '',
  Gesamt: '',
  send: false
};

function useCovid19State() {
  const [Covid19State, setCovid19State] = useState(initialVal);

  return [Covid19State, setCovid19State];
}
export default useCovid19State;
