import { useContext } from "react";
import StandardContext from "../../../context/standard/standardContext";
import getSentence from "../shared_modules/getSentence";

export default function useCOVID19() {
  const { Covid19State, setCovid19State } = useContext(StandardContext);

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
    Satz_1,
    Satz_2,
    Satz_3,
    Satz_4,
  } = Covid19State;

  const getKategorie = () => {
    Kategorie === "1"
      ? setCovid19State({
          ...Covid19State,
          Satz_2: `CT-Veränderungen passend zu einer viralen Pneumonie mit ${Ausdehnung}er Ausdehnung, COVID-19-Pneumonie möglich [Cov19Typ].`,
          Satz_3: `${getSentence(
            CTVeränderungen.Kategorie1,
            true
          )}, mit Betonung im ${getSentence(
            Lokalisation,
            true
          )}. Die Ausdehnung der Veränderung(en) wird als ${Ausdehnung} gewertet.`,
        })
      : Kategorie === "2"
      ? setCovid19State({
          ...Covid19State,
          Satz_2: `Infiltrate, wie oben beschrieben, mit ${Ausdehnung}er Ausdehnung, passend zu einer Pneumonie unklarer Genese. Keine sicheren Charakteristika einer viralen/ COVID19- Pneumonie, diese lässt sich allerdings auch nicht sicher ausschließen [Cov19Ind].`,
          Satz_3: `${getSentence(
            CTVeränderungen.Kategorie2,
            false
          )}, betont im ${getSentence(
            Lokalisation,
            true
          )}. Die Ausdehnung der Veränderung(en) wird als ${Ausdehnung} gewertet.`,
        })
      : Kategorie === "3"
      ? setCovid19State({
          ...Covid19State,
          Satz_2: `CT-Veränderungen des Lungenparenchyms, wie oben beschrieben, eher vereinbar mit einer zur COVID19- Pneumonie alternativen Diagnose, dd. XXX. Bild untypisch für eine COVID-19-Pneumonie [Cov19Aty].`,
          Satz_3: `${getSentence(
            CTVeränderungen.Kategorie3,
            true
          )}, betont im ${getSentence(
            Lokalisation,
            true
          )}. Die Ausdehnung der Veränderung(en) wird als ${Ausdehnung} gewertet.`,
        })
      : setCovid19State({
          ...Covid19State,
          Satz_2: `Kein Nachweis pneumonischer Infiltrate. Kein Hinweis auf eine COVID19-Infektion [Cov19Neg].`,
          Satz_3: `Kein Nachweis pneumonischer Infiltrate.`,
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
      Satz_4: sonstigeGesamt,
    });
  };

  const getVoruntersuchung = () => {
    setCovid19State({
      ...Covid19State,
      Satz_1: Voruntersuchung,
    });
  };

  const setGesamt = () => {
    setCovid19State({
      ...Covid19State,
      Gesamt:
        "Befund:" +
        "\n" +
        Satz_1 +
        "\n\n" +
        Satz_3 +
        "\n\n" +
        Satz_4 +
        "\n\n" +
        "Beurteilung:" +
        "\n" +
        Satz_2,
      send: true,
    });
  };

  return {
    getVoruntersuchung,
    getKategorie,
    getSonstige,
    setGesamt,
  };
}
