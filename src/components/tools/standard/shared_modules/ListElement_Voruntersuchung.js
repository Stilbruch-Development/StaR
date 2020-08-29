import React, { useState } from "react";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const MainWrapper = styled.div`
  .MuiListItem-root {
    justify-content: space-between;
  }
  .modality {
    justify-content: center;
  }
`;

export default function ListElementVoruntersuchung(props) {
  const [selectedState, setSelectedState] = useState({
    Date: new Date(),
    modality: "",
  });

  let selectedDate = selectedState.newDate;
  let selectedModlity = selectedState.modality;

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    if (event.target.value === "ja") {
      setOpen(true);
      const result =
        selectedDate?.getDate() +
        "." +
        (selectedDate?.getMonth() + 1) +
        "." +
        selectedDate?.getFullYear();
      props.setState({
        ...props.state,
        Voruntersuchung: `${selectedModlity} Voruntersuchung vom ${
          result ? result : ""
        } zum Vergleich vorliegend.`,
      });
    }
    if (event.target.value === "nein") {
      setOpen(false);
      props.setState({
        ...props.state,
        Voruntersuchung: "Keine Voruntersuchung zum Vergleich vorliegend.",
      });
    }
  };

  const handleDateChange = (date) => {
    const result =
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    setSelectedState({
      ...selectedState,
      Date: date,
    });
    props.setState({
      ...props.state,
      Voruntersuchung: `${selectedModlity} Voruntersuchung vom ${
        result ? result : ""
      } zum Vergleich vorliegend.`,
    });
  };

  const handleModalityChange = (event) => {
    props.setState({
      setSelectedState,
      modality: event.target.value,
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
          aria-label="Konventionelle"
          name="Art?"
          onChange={handleModalityChange}
          row
          className="modality"
        >
          <FormControlLabel
            value="Konventionelle"
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
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Collapse>
    </MainWrapper>
  );
}
