import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListElementVoruntersuchung from "./ListElement_Voruntersuchung";
import ListElementCovid19 from "./ListElement_Covid19";
import ListElementSonstiges from "./ListElement_Sonstiges";
import useCovid19 from "./useCOVID19";
import StandardContext from "../../../context/standard/standardContext";
import Button from "@material-ui/core/Button";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  margin: 1rem;
  background-color: var(--editor-bg-color);
  overflow: hidden;
  position: relativ;
  font-family: inherit;

  .MuiListItemText-root {
    flex: 0 0 auto;
    margin: 1rem;
  }

  .MuiListItem-root {
    border-radius: 10px;
  }

  .MuiListItemText-root {
    border-radius: 10px;
    margin: 0;
    margin-right: 2rem;
  }

  .MuiFormControlLabel-root {
    margin: 0;
  }

  .MuiListSubheader-root {
    font-size: 1.3rem;
    color: inherit;
    font-family: inherit;
    background: var(--main-bg-color);
    border: 2px solid black;
  }

  .MuiTypography-body1 {
    font-size: 1.1rem;
    font-family: inherit;
  }

  .MuiTypography-body2 {
    font-size: 1rem;
    font-family: inherit;
  }

  .MuiButton-root {
    width: 85%;
    height: 2.5rem;
    margin: 2rem 1rem 0 1rem;
  }

  .MuiListSubheader-sticky {
    z-index: unset;
  }

  .MuiListItem-gutters {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .MuiButton-root {
    width: 85%;
    height: 2.5rem;
    margin: 1rem 1rem 0 1rem;
  }
`;

export default function Covid19() {
  const { Covid19State } = useContext(StandardContext);

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
  } = Covid19State;

  const {
    getVoruntersuchung,
    getKategorie,
    getSonstige,
    setGesamt,
  } = useCovid19();

  const handleSubmit = () => () => {
    setGesamt();
  };

  useEffect(() => {
    getVoruntersuchung();
    // eslint-disable-next-line
  }, [Voruntersuchung]);

  useEffect(() => {
    getKategorie();
    // eslint-disable-next-line
  }, [Kategorie, Lokalisation, CTVeränderungen, Ausdehnung]);

  useEffect(() => {
    getSonstige();
    // eslint-disable-next-line
  }, [Lungenparenchym,
    Pleura,
    Herz_Mediastinum,
    Lymphknoten,
    Oberbauch,
    Skelett,
  ]);

  return (
    <MainWrapper>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            CT-Thorax COVID19
          </ListSubheader>
        }
      >
        <ListElementVoruntersuchung />
        <ListElementCovid19 />
        <ListElementSonstiges />
        <ButtonWrapper>
          <Button variant="outlined" color="primary" onClick={handleSubmit()}>
            Abschicken
          </Button>
        </ButtonWrapper>
      </List>
    </MainWrapper>
  );
}
