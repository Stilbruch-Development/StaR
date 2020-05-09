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
import Covid19Context from "../../../context/lists/covid19/covid19Context";

const MainWrapper = styled.div`
  .MuiListItem-root {
    justify-content: flex-start;
  }

  .MuiListItemText-root.MuiListItemText-dense  {
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
  const { Covid19State, setCovid19State } = useContext(Covid19Context);
  const { Kategorie, CTVeränderungen, Lokalisation } = Covid19State;

  const handleToggleFindings = (value) => () => {
    if (Kategorie === "1") {
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
          Kategorie4: [],
        },
      });
    }

    if (Kategorie === "2") {
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
          Kategorie1: [],
          Kategorie2: newLokalisation,
          Kategorie3: [],
          Kategorie4: [],
        },
      });
    }
    if (Kategorie === "3") {
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
          Kategorie1: [],
          Kategorie2: [],
          Kategorie3: newLokalisation,
          Kategorie4: [],
        },
      });
    }
    if (Kategorie === "4") {
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
          Kategorie1: [],
          Kategorie2: [],
          Kategorie3: [],
          Kategorie4: newLokalisation,
        },
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
      Lokalisation: newLokalisation,
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleChangeCovid19 = (event) => {
    if (
      event.target.value === "1" ||
      event.target.value === "2" ||
      event.target.value === "3"
    ) {
      setOpen(true);
    }
    if (event.target.value === "4") {
      setOpen(false);
    }
    setCovid19State({
      ...Covid19State,
      Kategorie: event.target.value,
    });
  };

  const handleChangeAusdehnung = (event) => {
    console.log(event.target.value);
    setCovid19State({
      ...Covid19State,
      Ausdehnung: event.target.value,
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
            label="Covid19 suspekt (Kategorie 1)"
            labelPlacement="end"
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="Unklarer Befund (Kategorie 2)"
            labelPlacement="end"
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="Alternative Diagnose (Kategorie 3)"
            labelPlacement="end"
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="Keine Infiltrate (Kategorie 4)"
            labelPlacement="end"
          />
        </RadioGroup>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemText primary={`CT-Veränderungen: `} />
          {Kategorie === "1" && (
            <ListItem>
              <List>
                {[
                  `früh dominante Milchglasverdichtungen ("ground glas")`,
                  `später dominant "Crazy Paving"/Konsolidierungen`,
                  `Zeichen der organisierten Pneumonie (z.B. arkadenförmige Konsolidierungen/Milchglastrübung, umgekehrtes Halo-Zeichen)`,
                  `periphere sowie posteriore Betonung, ohne subpleurale Aussparung`,
                  `Veränderungen rund oder geographisch konfiguriert`,
                  `Veränderungen zeigen sich bilateral sowie multifokal`,
                  `intraläsional zeigen sich erweiternde Gefäße`,
                  `fehlende mediastinale Lymphadenopathie`,
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
                          edge="start"
                          checked={
                            CTVeränderungen.Kategorie1.indexOf(value) !== -1
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItem>
                  );
                })}
              </List>
            </ListItem>
          )}
          {Kategorie === "2" && (
            <ListItem>
              <List>
                {[
                  `Milchglas/"crazy paving"/Konsolidierung anders verteilt als unter Kategorie 1`,
                  `zentrale Betonung der Veränderungen`,
                  `nicht rund oder geographisch konfigurierte Veränderungen`,
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
                          edge="start"
                          checked={
                            CTVeränderungen.Kategorie2.indexOf(value) !== -1
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItem>
                  );
                })}
              </List>
            </ListItem>
          )}
          {Kategorie === "3" && (
            <ListItem>
              <List>
                {[
                  `Noduli`,
                  `"Tree in bud"`,
                  `peribronchiales Infiltrat`,
                  `lobäre/segmentale Konsolidierung`,
                  `Kaverne`,
                  `Bronchialwandverdickungen`,
                  `Mucus-Plugging`,
                  `Pleuraerguss`,
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
                          edge="start"
                          checked={
                            CTVeränderungen.Kategorie3.indexOf(value) !== -1
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
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
                    onClick={handleToggleLokalisation(value)}
                  >
                    <ListItemText id={labelId} primary={`${value}`} />
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={Lokalisation.indexOf(value) !== -1}
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
                  label="Leicht"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="mittelgradig"
                  control={<Radio color="primary" />}
                  label="Mittelgradig"
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
