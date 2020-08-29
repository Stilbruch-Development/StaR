import React, { useContext } from "react";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import StandardContext from "../../../context/standard/standardContext";

const MainWrapper = styled.div`
  .MuiListItem-root {
    justify-content: space-between;
  }
`;

export default function ListElementEmbolie() {
  const { PulmonaryEmbolismState, setPulmonaryEmbolismState } = useContext(
    StandardContext
  );
  const { Lokalisation, Abschnitte } = PulmonaryEmbolismState;

  const handleToggleLokalisation = (value) => () => {
    const currentIndex = Lokalisation.indexOf(value);
    const newLokalisation = [...Lokalisation];

    if (currentIndex === -1) {
      newLokalisation.push(value);
    } else {
      newLokalisation.splice(currentIndex, 1);
    }
    setPulmonaryEmbolismState({
      ...PulmonaryEmbolismState,
      Lokalisation: newLokalisation,
    });
  };

  const handleToggleAbschnitte = (value) => () => {
    const currentIndex = Abschnitte.indexOf(value);
    const newAbschnitte = [...Abschnitte];

    if (currentIndex === -1) {
      newAbschnitte.push(value);
    } else {
      newAbschnitte.splice(currentIndex, 1);
    }
    setPulmonaryEmbolismState({
      ...PulmonaryEmbolismState,
      Abschnitte: newAbschnitte,
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    if (event.target.value === "ja") {
      setOpen(true);
    }
    if (event.target.value === "nein") {
      setOpen(false);
    }
    setPulmonaryEmbolismState({
      ...PulmonaryEmbolismState,
      PulmonaryEmbolism: event.target.value,
    });
  };

  return (
    <MainWrapper>
      <ListItem button>
        <ListItemText primary="PulmonaryEmbolism?" />

        <RadioGroup
          aria-label="PulmonaryEmbolism"
          name="PulmonaryEmbolism?"
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
            <ListItemText primary={`Lokalisation: `} />
            <List>
              {["zentral", "lobär", "segmental", "subsegmental"].map(
                (value) => {
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
                          checked={Lokalisation?.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                    </ListItem>
                  );
                }
              )}
            </List>
          </ListItem>
          <ListItem>
            <ListItemText primary={`Abschnitte: `} />

            <List>
              {[
                "Tr. pulmonalis rechts",
                "Tr. pulmonalis links",
                "Oberlappen rechts",
                "Oberlappen links",
                "Unterlappen rechts",
                "Unterlappen links",
                "Mittellappen",
              ].map((value) => {
                const labelId = `${value}`;

                return (
                  <ListItem
                    key={value}
                    dense
                    button
                    onClick={handleToggleAbschnitte(value)}
                  >
                    <ListItemText id={labelId} primary={`${value}`} />
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={Abschnitte?.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
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
