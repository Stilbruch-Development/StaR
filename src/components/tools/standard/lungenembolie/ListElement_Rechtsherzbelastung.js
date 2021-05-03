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
    justify-content: space-between;
  }
`;

export default function ListElementRechtsherzbelastung() {
  const { PulmonaryEmbolismState, setPulmonaryEmbolismState } = useContext(
    StandardContext
  );

  const { Rechtsherzbelastungszeichen } = PulmonaryEmbolismState;

  const handleToggleRechtsherzbelastung = (value) => () => {
    const currentIndex = Rechtsherzbelastungszeichen.indexOf(value);
    const newRechtsherzbelastungszeichen = [...Rechtsherzbelastungszeichen];

    if (currentIndex === -1) {
      newRechtsherzbelastungszeichen.push(value);
    } else {
      newRechtsherzbelastungszeichen.splice(currentIndex, 1);
    }
    setPulmonaryEmbolismState({
      ...PulmonaryEmbolismState,
      Rechtsherzbelastungszeichen: newRechtsherzbelastungszeichen
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    if (event.target.value === 'ja') {
      setOpen(true);
    }
    if (event.target.value === 'nein') {
      setOpen(false);
    }
    setPulmonaryEmbolismState({
      ...PulmonaryEmbolismState,
      Rechtsherzbelastung: event.target.value
    });
  };

  return (
    <MainWrapper>
      <ListItem button>
        <ListItemText primary="Rechtsherzbelastung?" />

        <RadioGroup
          aria-label="Rechtsherzbelastung"
          name="Rechtsherzbelastung?"
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="ja"
            control={<Radio color="primary" />}
            label="Ja"
            labelPlacement="start"
          />
          <FormControlLabel
            value="nein"
            control={<Radio color="primary" />}
            label="Nein"
            labelPlacement="end"
          />
        </RadioGroup>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <List>
              {[
                'erweiterter rechter Vorhof',
                'erweiterter rechter Ventrikel',
                'Kontrastmittel Rückstrom in die Lebervenen',
                'erweiterter Tr. pulmonalis/ Pulmonalarterien'
              ].map((value) => {
                const labelId = `${value}`;

                return (
                  <ListItem
                    key={value}
                    dense
                    button
                    onClick={handleToggleRechtsherzbelastung(value)}
                  >
                    <ListItemText id={labelId} primary={`${value}`} />
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={
                          Rechtsherzbelastungszeichen?.indexOf(value) !== -1
                        }
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
        </List>
      </Collapse>
    </MainWrapper>
  );
}
