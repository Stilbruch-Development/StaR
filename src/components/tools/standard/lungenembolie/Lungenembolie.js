import React, { useEffect, useContext } from 'react';
import styled from 'styled-components/macro';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListElementVoruntersuchung from '../shared_modules/ListElement_Voruntersuchung';
import ListElementEmbolie from './ListElement_Embolie';
import ListElementRechtsherzbelastung from './ListElement_Rechtsherzbelastung';
import ListElementSonstiges from '../shared_modules/ListElement_Sonstiges_Thorax_CT';
import useLungenembolie from './useLungenembolie';
import StandardContext from '../../../context/standard/standardContext';
import SubmitButton from '../shared_modules/Submit_Button';

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

  .MuiListSubheader-sticky {
    z-index: unset;
  }
`;

export default function PulmonaryEmbolismComponent() {
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

  const [
    getVoruntersuchung,
    getLungenembolie,
    getRechtsherzbelastung,
    getSonstige
  ] = useLungenembolie();

  const handleSubmit = () => {
    setPulmonaryEmbolismState({
      ...PulmonaryEmbolismState,
      send: true
    });
  };

  useEffect(() => {
    getVoruntersuchung();
    // eslint-disable-next-line
  }, [Voruntersuchung]);

  useEffect(() => {
    getLungenembolie();
    // eslint-disable-next-line
  }, [PulmonaryEmbolism, Lokalisation, Abschnitte]);

  useEffect(() => {
    getRechtsherzbelastung();
    // eslint-disable-next-line
  }, [Rechtsherzbelastung, Rechtsherzbelastungszeichen]);

  useEffect(() => {
    getSonstige();
    // eslint-disable-next-line
  }, [
    Lungenparenchym,
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
        <ListElementVoruntersuchung
          state={PulmonaryEmbolismState}
          setState={setPulmonaryEmbolismState}
        />
        <ListElementEmbolie />
        <ListElementRechtsherzbelastung />
        <ListElementSonstiges
          state={PulmonaryEmbolismState}
          setState={setPulmonaryEmbolismState}
        />
        <SubmitButton handleSubmit={handleSubmit} />
      </List>
    </MainWrapper>
  );
}
