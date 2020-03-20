import { useState } from "react";

export default function useLungenembolie() {
  const [state, setState] = useState({});

  const getSentence = array => {
    const array_start = [];
    for (let i = 0; i < array.length - 1; i++) {
      array_start.push(array[i]);
    }
    let array_end;

    array.length > 1
      ? (array_end = [` und ${array[array.length - 1]}`])
      : (array_end = array);

    const arrays_join = array_start + array_end;

    var replacements = new Map([
        [/,(?=[^\s])/g, ", "],
        [
          /^./,
          function(match) {
            return match.toUpperCase();
          }
        ]
      ]),
      result = arrays_join;
    replacements.forEach(function(value, key) {
      result = result.replace(key, value);
    });

    return result;
  };

  // const getSonstige = listObject => {
  //   const {
  //     Lungenparenchym,
  //     Pleura,
  //     Herz_Mediastinum,
  //     Lymphknoten,
  //     Oberbauch,
  //     Skelett
  //   } = listObject;

  //   setState({
  //     ...state,
  //     sentence_3: Lungenparenchym,
  //     sentence_4: Pleura,
  //     sentence_5: Herz_Mediastinum,
  //     sentence_6: Lymphknoten,
  //     sentence_7: Oberbauch,
  //     sentence_8: Skelett
  //   });
  // };

  const getReport = (listObject, setListObject) => {
    listObject.Lungenembolie === "ja" &&
      setListObject({
        ...listObject,
        Satz_1: `Nachweis einer Lungenarterienembolie ${getSentence(
          listObject.Lokalisation
        )} im ${getSentence(listObject.Abschnitte)}.`
      });

    listObject.Lungenembolie === "nein" &&
      setListObject({
        ...listObject,
        Satz_1: `Kein Nachweis einer Lungenarterienembolie.`
      });

    const rhbz = listObject.Rechtsherzbelastungszeichen.length;
    let rhb_grad;

    if (rhbz <= 2) {
      rhb_grad = "geringen";
    } else if (rhbz > 2 && rhbz <= 3) {
      rhb_grad = "mäßigen";
    } else {
      rhb_grad = "hochgradigen";
    }

    listObject.Rechtsherzbelastung === "ja" &&
      setListObject({
        ...listObject,
        Satz_2: `${getSentence(
          listObject.Rechtsherzbelastungszeichen
        )} als Zeichen der ${rhb_grad} Rechtsherzbelastung.`
      });

    listObject.Rechtsherzbelastung === "nein" &&
      setListObject({
        ...listObject,
        Satz_2: `Keine Rechtsherzbelastungszeichen.`
      });
  };

  console.log(state);

  return [getReport, state];
}
