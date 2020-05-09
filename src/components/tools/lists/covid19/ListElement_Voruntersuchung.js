import React, { useContext, useState } from "react";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Covid19Context from "../../../context/lists/covid19/covid19Context";
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
`;

export default function ListElementVoruntersuchung() {
  const { Covid19State, setCovid19State } = useContext(Covid19Context);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    if (event.target.value === "ja") {
      setOpen(true);
      const result =
        selectedDate.getDate() +
        "." +
        (selectedDate.getMonth() + 1) +
        "." +
        selectedDate.getFullYear();
      setCovid19State({
        ...Covid19State,
        Voruntersuchung: `Voruntersuchung vom ${result} zum Vergleich vorliegend.`,
      });
    }
    if (event.target.value === "nein") {
      setOpen(false);
      setCovid19State({
        ...Covid19State,
        Voruntersuchung: "Keine Voruntersuchung zum Vergleich vorliegend.",
      });
    }
  };

  const handleDateChange = (date) => {
    const result =
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    setSelectedDate(date);
    setCovid19State({
      ...Covid19State,
      Voruntersuchung: `Voruntersuchung vom ${result} zum Vergleich vorliegend.`,
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
