import { useState, useContext, useEffect } from 'react';
import StandardContext from '../../../context/standard/standardContext';
import getSentence from '../shared_modules/getSentence';

export default function useLungenembolie() {
  const [useLungenembolieState, setUseLungenembolieState] = useState({
    Satz_1: '',
    Satz_2: '',
    Satz_3: '',
    Satz_4: ''
  });

  const { PulmonaryEmbolismState, setPulmonaryEmbolismState } = useContext(
    StandardContext
  );

  const {
    Voruntersuchung,
    PulmonaryEmbolism,
    Lokalisation,
    Abschnitte,
    Rechtsherzbelastung,
    Rechtsherzbelastungszeichen,
    Lungenparenchym,
    Pleura,
    Herz_Mediastinum,
    Lymphknoten,
    Oberbauch,
    Skelett
  } = PulmonaryEmbolismState;

  const getLungenembolie = () => {
    PulmonaryEmbolism === 'ja'
      ? setUseLungenembolieState({
          ...useLungenembolieState,
          Satz_2: `Nachweis ${
            getSentence(Lokalisation) ? getSentence(Lokalisation) : 'einer'
          } Lungenarterienembolie${getSentence(Lokalisation) && 'n'}${
            getSentence(Abschnitte)
              ? ', lokalisiert ' + getSentence(Abschnitte) + '.'
              : '.'
          }`
        })
      : PulmonaryEmbolism === 'nein' &&
        setUseLungenembolieState({
          ...useLungenembolieState,
          Satz_2: 'Kein Nachweis einer Lungenarterienembolie.'
        });
  };

  const getRechtsherzbelastung = () => {
    const rhbz = Rechtsherzbelastungszeichen?.length;
    let rhb_grad;

    if (rhbz <= 2) {
      rhb_grad = 'geringen';
    } else if (rhbz > 2 && rhbz <= 3) {
      rhb_grad = 'mäßigen';
    } else {
      rhb_grad = 'hochgradigen';
    }

    Rechtsherzbelastung === 'ja'
      ? setUseLungenembolieState({
          ...useLungenembolieState,
          Satz_3: `${
            getSentence(Rechtsherzbelastungszeichen, true)
              ? getSentence(Rechtsherzbelastungszeichen, true) + ' als '
              : ''
          }Zeichen der ${
            getSentence(Rechtsherzbelastungszeichen, true) ? rhb_grad : ''
          } Rechtsherzbelastung.`
        })
      : Rechtsherzbelastung === 'nein' &&
        setUseLungenembolieState({
          ...useLungenembolieState,
          Satz_3: `Keine Rechtsherzbelastungszeichen.`
        });
  };

  const getSonstige = () => {
    const sonstigeGesamt =
      Lungenparenchym +
      ' ' +
      Pleura +
      ' ' +
      Herz_Mediastinum +
      ' ' +
      Lymphknoten +
      ' ' +
      Oberbauch +
      ' ' +
      Skelett;
    setUseLungenembolieState({
      ...useLungenembolieState,
      Satz_4: sonstigeGesamt
    });
  };

  const getVoruntersuchung = () => {
    setUseLungenembolieState({
      ...useLungenembolieState,
      Satz_1: Voruntersuchung
    });
  };

  const { Satz_1, Satz_2, Satz_3, Satz_4 } = useLungenembolieState;

  useEffect(() => {
    setPulmonaryEmbolismState({
      ...PulmonaryEmbolismState,
      Gesamt:
        'Befund und Beurteilung:' +
        '\n' +
        Satz_1 +
        '\n\n' +
        Satz_2 +
        '\n' +
        Satz_3 +
        '\n\n' +
        Satz_4
    });
    // eslint-disable-next-line
  }, [Satz_1, Satz_2, Satz_3, Satz_4]);

  return [
    getVoruntersuchung,
    getLungenembolie,
    getRechtsherzbelastung,
    getSonstige,
    useLungenembolieState
  ];
}
