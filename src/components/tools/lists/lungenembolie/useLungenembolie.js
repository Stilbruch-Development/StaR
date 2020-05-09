import { useState, useContext, useEffect } from "react";
import LungenembolieContext from "../../../context/lists/lungenembolie/lungenembolieContext";

export default function useLungenembolie() {
  const [useLungenembolieState, setUseLungenembolieState] = useState({
    Satz_1: "",
    Satz_2: "",
    Satz_3: "",
    Satz_4: "",
  });

  const { LungenembolieState, setLungenembolieState } = useContext(
    LungenembolieContext
  );

  const getSentence = (array, upperCase) => {
    const array_start = [];
    for (let i = 0; i < array.length - 1; i++) {
      array_start.push(array[i]);
    }
    let array_end;

    array.length > 1
      ? (array_end = [` und ${array[array.length - 1]}`])
      : (array_end = array);

    const arrays_join = array_start + array_end;

    let matchUpperCase;

    upperCase === true
      ? (matchUpperCase = [
          /^./,
          function (match) {
            return match.toUpperCase();
          },
        ])
      : (matchUpperCase = []);

    var replacements = new Map([[/,(?=[^\s])/g, ", "], matchUpperCase]),
      result = arrays_join;
    replacements.forEach(function (value, key) {
      result = result.replace(key, value);
    });

    return result;
  };

  const {
    Voruntersuchung,
    Lungenembolie,
    Lokalisation,
    Abschnitte,
    Rechtsherzbelastung,
    Rechtsherzbelastungszeichen,
    Lungenparenchym,
    Pleura,
    Herz_Mediastinum,
    Lymphknoten,
    Oberbauch,
    Skelett,
  } = LungenembolieState;

  const getLungenembolie = () => {
    Lungenembolie === "ja"
      ? setUseLungenembolieState({
          ...useLungenembolieState,
          Satz_2: `Nachweis einer Lungenarterienembolie, ${getSentence(
            Lokalisation,
            false
          )} im ${getSentence(Abschnitte, true)}.`,
        })
      : Lungenembolie === "nein" &&
        setUseLungenembolieState({
          ...useLungenembolieState,
          Satz_2: "Kein Nachweis einer Lungenarterienembolie.",
        });
  };

  const getRechtsherzbelastung = () => {
    const rhbz = Rechtsherzbelastungszeichen.length;
    let rhb_grad;

    if (rhbz <= 2) {
      rhb_grad = "geringen";
    } else if (rhbz > 2 && rhbz <= 3) {
      rhb_grad = "mäßigen";
    } else {
      rhb_grad = "hochgradigen";
    }

    Rechtsherzbelastung === "ja"
      ? setUseLungenembolieState({
          ...useLungenembolieState,
          Satz_3: `${getSentence(
            Rechtsherzbelastungszeichen,
            true
          )} als Zeichen der ${rhb_grad} Rechtsherzbelastung.`,
        })
      : Rechtsherzbelastung === "nein" &&
        setUseLungenembolieState({
          ...useLungenembolieState,
          Satz_3: `Keine Rechtsherzbelastungszeichen.`,
        });
  };

  const getSonstige = () => {
    const sonstigeGesamt =
      Lungenparenchym +
      " " +
      Pleura +
      " " +
      Herz_Mediastinum +
      " " +
      Lymphknoten +
      " " +
      Oberbauch +
      " " +
      Skelett;
    setUseLungenembolieState({
      ...useLungenembolieState,
      Satz_4: sonstigeGesamt,
    });
  };

  const getVoruntersuchung = () => {
    setUseLungenembolieState({
      ...useLungenembolieState,
      Satz_1: Voruntersuchung,
    });
  };

  const { Satz_1, Satz_2, Satz_3, Satz_4 } = useLungenembolieState;

  useEffect(() => {
    setLungenembolieState({
      ...LungenembolieState,
      Gesamt:
        "Befund und Beurteilung:" +
        "\n" +
        Satz_1 +
        "\n\n" +
        Satz_2 +
        "\n" +
        Satz_3 +
        "\n\n" +
        Satz_4,
    });
    // eslint-disable-next-line
  }, [Satz_1, Satz_2, Satz_3, Satz_4]);

  return [
    getVoruntersuchung,
    getLungenembolie,
    getRechtsherzbelastung,
    getSonstige,
    useLungenembolieState,
  ];
}
