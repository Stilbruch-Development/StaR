import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListElementEmbolie from "./ListElement_Embolie";
import ListElementRechtsherzbelastung from "./ListElement_Rechtsherzbelastung";
import ListElementSonstiges from "./ListElement_Sonstiges";
import useLungenembolie from "./useLungenembolie";
import LungenembolieContext from "../../../context/lists/lungenembolie/lungenembolieContext";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  margin: 1rem;
  background-color: var(--editor-bg-color);
  overflow: auto;
  position: relativ;

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
    font-size: 1.5rem;
    color: inherit;
  }

  .MuiTypography-body1 {
    font-size: 1.3rem;
  }

  .MuiTypography-body2 {
    font-size: 1.2rem;
  }
`;

export default function Lungenembolie() {
  const { LungenembolieState } = useContext(LungenembolieContext);

  const {
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
    getLungenembolie,
    getRechtsherzbelastung,
    getSonstige
  ] = useLungenembolie();

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
        <ListElementEmbolie />
        <ListElementRechtsherzbelastung />
        <ListElementSonstiges />
      </List>
    </MainWrapper>
  );
}
