import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StandardContext from '../../../context/standard/standardContext';

const MainWrapper = styled.div`
  .MuiListItem-root {
    justify-content: flex-start;
  }

  .MuiListItemText-root.MuiListItemText-dense {
    border-radius: 10px;
    margin: 0;
    width: 90%;
  }
`;

const AusdehnungWrapper = styled.div`
  .MuiFormGroup-row {
    flex-direction: column;
  }
`;

export default function ListElementCovid19() {
  const { Covid19State, setCovid19State } = useContext(StandardContext);
  const { Kategorie, CTVeränderungen, Lokalisation } = Covid19State;

  const handleToggleFindings = (value) => () => {
    if (Kategorie === '1') {
      const currentIndex = CTVeränderungen.Kategorie1.indexOf(value);
      const newLokalisation = [...CTVeränderungen.Kategorie1];

      if (currentIndex === -1) {
        newLokalisation.push(value);
      } else {
        newLokalisation.splice(currentIndex, 1);
      }
      setCovid19State({
        ...Covid19State,
        CTVeränderungen: {
          Kategorie1: newLokalisation,
          Kategorie2: [],
          Kategorie3: [],
          Kategorie4: []
        }
      });
    }

    if (Kategorie === '2') {
      const currentIndex = CTVeränderungen.Kategorie2.indexOf(value);
      const newLokalisation = [...CTVeränderungen.Kategorie2];

      if (currentIndex === -1) {
        newLokalisation.push(value);
      } else {
        newLokalisation.splice(currentIndex, 1);
      }
      setCovid19State({
        ...Covid19State,
        CTVeränderungen: {
          Kategorie1: [],
          Kategorie2: newLokalisation,
          Kategorie3: [],
          Kategorie4: []
        }
      });
    }
    if (Kategorie === '3') {
      const currentIndex = CTVeränderungen.Kategorie3.indexOf(value);
      const newLokalisation = [...CTVeränderungen.Kategorie3];

      if (currentIndex === -1) {
        newLokalisation.push(value);
      } else {
        newLokalisation.splice(currentIndex, 1);
      }
      setCovid19State({
        ...Covid19State,
        CTVeränderungen: {
          Kategorie1: [],
          Kategorie2: [],
          Kategorie3: newLokalisation,
          Kategorie4: []
        }
      });
    }
    if (Kategorie === '4') {
      const currentIndex = CTVeränderungen.Kategorie4.indexOf(value);
      const newLokalisation = [...CTVeränderungen.Kategorie4];

      if (currentIndex === -1) {
        newLokalisation.push(value);
      } else {
        newLokalisation.splice(currentIndex, 1);
      }
      setCovid19State({
        ...Covid19State,
        CTVeränderungen: {
          Kategorie1: [],
          Kategorie2: [],
          Kategorie3: [],
          Kategorie4: newLokalisation
        }
      });
    }
  };

  const handleToggleLokalisation = (value) => () => {
    const currentIndex = Lokalisation.indexOf(value);
    const newLokalisation = [...Lokalisation];

    if (currentIndex === -1) {
      newLokalisation.push(value);
    } else {
      newLokalisation.splice(currentIndex, 1);
    }
    setCovid19State({
      ...Covid19State,
      Lokalisation: newLokalisation
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleChangeCovid19 = (event) => {
    if (
      event.target.value === '1' ||
      event.target.value === '2' ||
      event.target.value === '3'
    ) {
      setOpen(true);
    }
    if (event.target.value === '4') {
      setOpen(false);
    }
    setCovid19State({
      ...Covid19State,
      Kategorie: event.target.value
    });
  };

  const handleChangeAusdehnung = (event) => {
    setCovid19State({
      ...Covid19State,
      Ausdehnung: event.target.value
    });
  };

  return (
    <MainWrapper>
      <ListItem button>
        <ListItemText primary="COVID19?" />

        <RadioGroup
          aria-label="Covid19"
          name="Covid19"
          onChange={handleChangeCovid19}
          row
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="Covid19 suspekt [Cov19Typ]"
            labelPlacement="end"
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="Unklarer Befund [Cov19Ind]"
            labelPlacement="end"
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="Alternative Diagnose [Cov19Aty]"
            labelPlacement="end"
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="Keine Infiltrate [Cov19Neg]"
            labelPlacement="end"
          />
        </RadioGroup>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemText
            primary={`CT-Veränderungen: `}
            style={{ paddingLeft: '0.5rem', paddingTop: '0.5rem' }}
          />
          {Kategorie === '1' && (
            <ListItem>
              <List>
                {[
                  `fleckige Milchglasverdichtungen`,
                  `geographische Konsolidierungen wie bei organisierter Pneumonie`,
                  `"Crazy Paving" -Muster`,
                  `betont periphere sowie posteriore Verdichtungen ohne subpleurale Aussparung`,
                  `rund oder geographisch konfiguriert Verdichtungen`,
                  `bilaterales sowie multifokales Verteilungsmuster`,
                  `erweiternde Gefäße intraläsional`
                ].map((value) => {
                  const labelId = `${value}`;

                  return (
                    <ListItem
                      key={value}
                      dense
                      button
                      onClick={handleToggleFindings(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="end"
                          checked={
                            CTVeränderungen.Kategorie1.indexOf(value) !== -1
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItem>
                  );
                })}
              </List>
            </ListItem>
          )}
          {Kategorie === '2' && (
            <ListItem>
              <List>
                {[
                  `Milchglasverdichtungen oder Konsolidierungen anders verteilt als bei [Cov19Typ]-Kategorie`,
                  `zentrale Betonung der Veränderungen`,
                  `nicht rund oder geographisch konfigurierte Veränderungen`
                ].map((value) => {
                  const labelId = `${value}`;

                  return (
                    <ListItem
                      key={value}
                      dense
                      button
                      onClick={handleToggleFindings(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="end"
                          checked={
                            CTVeränderungen.Kategorie2.indexOf(value) !== -1
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItem>
                  );
                })}
              </List>
            </ListItem>
          )}
          {Kategorie === '3' && (
            <ListItem>
              <List>
                {[
                  `noduläre Verdichtungen`,
                  `"Tree in bud"- Muster`,
                  `peribronchial betonte Infiltrate`,
                  `lobäre oder segmentale Konsolidierungen`,
                  `Kavernenbildung`,
                  `Bronchialwandverdickungen`,
                  `Mucus-Plugging`
                ].map((value) => {
                  const labelId = `${value}`;

                  return (
                    <ListItem
                      key={value}
                      dense
                      button
                      onClick={handleToggleFindings(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="end"
                          checked={
                            CTVeränderungen.Kategorie3.indexOf(value) !== -1
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItem>
                  );
                })}
              </List>
            </ListItem>
          )}

          <ListItem>
            <ListItemText primary={`Lokalisation: `} />
            <List>
              {[
                'Oberlappen rechts',
                'Oberlappen links',
                'Unterlappen rechts',
                'Unterlappen links',
                'Mittellappen',
                'bipulmonal',
                'Ober- und Unterlappen links',
                'Ober- und Unterlappen rechts'
              ].map((value) => {
                const labelId = `${value}`;

                return (
                  <ListItem
                    key={value}
                    dense
                    button
                    onClick={handleToggleLokalisation(value)}
                  >
                    <ListItemText id={labelId} primary={`${value}`} />
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={Lokalisation.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          </ListItem>

          <AusdehnungWrapper>
            <ListItem button>
              <ListItemText primary="Ausdehnung:" />
              <RadioGroup
                aria-label="Ausdehnung"
                name="Ausdehnung"
                onChange={handleChangeAusdehnung}
                row
              >
                <FormControlLabel
                  value="leicht"
                  control={<Radio color="primary" />}
                  label="leicht"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="mittelgradig"
                  control={<Radio color="primary" />}
                  label="mittelgradig"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="ausgeprägt"
                  control={<Radio color="primary" />}
                  label="ausgeprägt"
                  labelPlacement="end"
                />
              </RadioGroup>
            </ListItem>
          </AusdehnungWrapper>
        </List>
      </Collapse>
    </MainWrapper>
  );
}
