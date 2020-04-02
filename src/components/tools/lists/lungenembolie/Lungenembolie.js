import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListElementVoruntersuchung from "./ListElement_Voruntersuchung";
import ListElementEmbolie from "./ListElement_Embolie";
import ListElementRechtsherzbelastung from "./ListElement_Rechtsherzbelastung";
import ListElementSonstiges from "./ListElement_Sonstiges";
import useLungenembolie from "./useLungenembolie";
import LungenembolieContext from "../../../context/lists/lungenembolie/lungenembolieContext";
import Button from "@material-ui/core/Button";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  margin: 1rem;
  background-color: var(--editor-bg-color);
  overflow: auto;
  position: relativ;
  font-family: inherit;

  .MuiList-root {
    width: 100%;
  }

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

export default function Lungenembolie() {
  const { LungenembolieState, setLungenembolieState } = useContext(
    LungenembolieContext
  );

  const handleSubmit = () => () => {
    setLungenembolieState({
      ...LungenembolieState,
      send: true
    });
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
    Skelett
  } = LungenembolieState;

  const [
    getVoruntersuchung,
    getLungenembolie,
    getRechtsherzbelastung,
    getSonstige
  ] = useLungenembolie();

  useEffect(() => {
    getVoruntersuchung();
    // eslint-disable-next-line
  }, [Voruntersuchung]);

  useEffect(() => {
    getLungenembolie();
    // eslint-disable-next-line
  }, [Lungenembolie, Lokalisation, Abschnitte]);

  useEffect(() => {
    getRechtsherzbelastung();
    // eslint-disable-next-line
  }, [Rechtsherzbelastung, Rechtsherzbelastungszeichen]);

  useEffect(() => {
    getSonstige();
    // eslint-disable-next-line
  }, [Lungenparenchym,
    Pleura,
    Herz_Mediastinum,
    Lymphknoten,
    Oberbauch,
    Skelett
  ]);

  return (
    <MainWrapper>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            CT-Thorax Lungenarterienembolie
          </ListSubheader>
        }
      >
        <ListElementVoruntersuchung />
        <ListElementEmbolie />
        <ListElementRechtsherzbelastung />
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