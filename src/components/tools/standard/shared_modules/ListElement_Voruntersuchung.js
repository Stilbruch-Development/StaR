import React, { useState } from 'react';
import styled from 'styled-components/macro';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import useAsyncReference from '../../../../hooks/useAsyncReference';

const MainWrapper = styled.div`
  .MuiListItem-root {
    justify-content: space-between;
  }
  .modality {
    justify-content: center;
  }
`;

export default function ListElementVoruntersuchung(props) {
  const getDateFormat = (unformatedDate) => {
    const dateString = `${unformatedDate?.getDate()}.${
      unformatedDate?.getMonth() + 1
    }.${unformatedDate?.getFullYear()}`;
    return dateString;
  };

  const [selectedState, setSelectedState] = useAsyncReference({
    date: new Date(),
    modality: ''
  });

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    if (event.target.value === 'ja') {
      setOpen(true);
      const date = getDateFormat(selectedState.current.date);
      const { modality } = selectedState.current;
      props.setState({
        ...props.state,
        Voruntersuchung: `${modality || ''}Voruntersuchung vom ${
          date || ''
        } zum Vergleich vorliegend.`
      });
    }
    if (event.target.value === 'nein') {
      setOpen(false);
      props.setState({
        ...props.state,
        Voruntersuchung: 'Keine Voruntersuchung zum Vergleich vorliegend.'
      });
    }
  };

  const handleDateChange = (unformatedDate) => {
    const date = getDateFormat(unformatedDate);
    setSelectedState({
      ...selectedState.current,
      date: unformatedDate
    });
    const { modality } = selectedState.current;
    props.setState({
      ...props.state,
      Voruntersuchung: `${modality || ''}Voruntersuchung vom ${
        date || ''
      } zum Vergleich vorliegend.`
    });
  };

  const handleModalityChange = (event) => {
    setSelectedState({
      ...selectedState.current,
      modality: event.target.value
    });
    const modality = event.target.value;
    const date = getDateFormat(selectedState.current.date);
    props.setState({
      ...props.state,
      Voruntersuchung: `${modality || ''}Voruntersuchung vom ${
        date || ''
      } zum Vergleich vorliegend.`
    });
  };

  return (
    <MainWrapper>
      <ListItem button>
        <ListItemText primary="Voruntersuchung?" />
        <RadioGroup
          aria-label="Voruntersuchung"
          name="Voruntersuchung?"
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
        <RadioGroup
          aria-label="Voruntersuchungsart"
          name="Art?"
          onChange={handleModalityChange}
          row
          className="modality"
        >
          <FormControlLabel
            value="Konventionelle "
            control={<Radio color="primary" />}
            label="Konventionell"
            labelPlacement="start"
          />
          <FormControlLabel
            value="CT- "
            control={<Radio color="primary" />}
            label="CT"
            labelPlacement="start"
          />
          <FormControlLabel
            value="MRT- "
            control={<Radio color="primary" />}
            label="MRT"
            labelPlacement="start"
          />
          <FormControlLabel
            value=""
            control={<Radio color="primary" />}
            label="Andere"
            labelPlacement="start"
          />
        </RadioGroup>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd.MM.yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Voruntersuchung vom:"
              autoOk
              value={selectedState.current.date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Collapse>
    </MainWrapper>
  );
}
