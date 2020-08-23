import { useContext } from "react";
import StandardContext from "../../../context/standard/standardContext";

export default function useCOVID19() {
  const { Covid19State, setCovid19State } = useContext(StandardContext);
  const { covid19State, covid19Report } = Covid19State;
  const {
    Voruntersuchung,
    Kategorie,
    Lokalisation,
    Ausdehnung,
    CTVeränderungen,
    Lungenparenchym,
    Pleura,
    Herz_Mediastinum,
    Lymphknoten,
    Oberbauch,
    Skelett,
  } = covid19State;

  const { Satz_1, Satz_2, Satz_3, Satz_4, Gesamt, send } = covid19Report;

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

  const getKategorie = () => {
    Kategorie === "1"
      ? setCovid19State({
          ...Covid19State,
          covid19Report: {
            ...covid19Report,
            Satz_2: `CT-Veränderungen passend zu einer viralen Pneumonie mit ${Ausdehnung}er Ausdehnung. Bei hoher individueller Prätestwahscheinlichkeit suggestiv für eine COVID-19-Pneumonie [Cov19Typ].`,
            Satz_3: `${getSentence(
              CTVeränderungen.Kategorie1,
              true
            )}, betont im ${getSentence(
              Lokalisation,
              true
            )}. Dies ist suggestiv für eine COVID19 Infektion. Die Ausdehnung der Veränderung(en) wird als ${Ausdehnung} gewertet.`,
          },
        })
      : Kategorie === "2"
      ? setCovid19State({
          ...Covid19State,
          covid19Report: {
            ...covid19Report,
            Satz_2: `CT-Veränderungen passend zu einer viral-entzündlichen Pneumonie mit ${Ausdehnung}er Ausdehnung. Bei hoher individueller Prätestwahrscheinlichkeit suggestiv COVID-19-Pneumonie möglich, CT-Veränderungen aber nicht charakteristisch [Cov19Ind].`,
            Satz_3: `${getSentence(
              CTVeränderungen.Kategorie2,
              false
            )}, betont im ${getSentence(
              Lokalisation,
              true
            )}. Kein typisches COVID19-Bild aber eine COVID-19 Infektion ist nicht sicher auszuschließen. Die Ausdehnung der Veränderung(en) wird als ${Ausdehnung} gewertet.`,
          },
        })
      : Kategorie === "3"
      ? setCovid19State({
          ...Covid19State,
          covid19Report: {
            ...covid19Report,
            Satz_2: `CT-Veränderungen des Lungenparenchyms vereinbar mit einer alternativen Diagnose, a.e. XXX. CT-Veränderungen ohne Hinweis auf COVID-19-Pneumonie [Cov19Aty].`,
            Satz_3: `${getSentence(
              CTVeränderungen.Kategorie3,
              true
            )}, betont im ${getSentence(
              Lokalisation,
              true
            )}. Bild untypisch für eine COVID-19 Infektion, eine andere Diagnose erscheint wahrscheinlicher. Die Ausdehnung der Veränderung(en) wird als ${Ausdehnung} gewertet.`,
          },
        })
      : setCovid19State({
          ...Covid19State,
          covid19Report: {
            ...covid19Report,
            Satz_2: `Kein nachweis pneumonischer Infiltrate. Kein Hinweis auf eine COVID19-Infektion [Cov19Neg].`,
            Satz_3: `Kein Nachweis pneumonischer Veränderungen, insbesondere kein COVID19-Bild.`,
          },
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
    setCovid19State({
      ...Covid19State,
      covid19Report: {
        Satz_4: sonstigeGesamt,
      },
    });
  };

  const getVoruntersuchung = () => {
    setCovid19State({
      ...Covid19State,
      covid19Report: {
        Satz_1: Voruntersuchung,
      },
    });
  };

  const setGesamt = () => {
    setCovid19State({
      ...Covid19State,
      covid19Report: {
        Gesamt:
          "Befund:" +
          "\n" +
          covid19Report.Satz_1 +
          "\n\n" +
          covid19Report.Satz_3 +
          "\n\n" +
          covid19Report.Satz_4 +
          "\n\n" +
          "Beurteilung:" +
          "\n" +
          covid19Report.Satz_2,
        send: true,
      },
    });
  };

  return {
    getVoruntersuchung,
    getKategorie,
    getSonstige,
    setGesamt,
  };
}
