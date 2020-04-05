import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const MainStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1 rem;
  height: 100%;

  .MuiTextField-root {
    min-width: 40rem;
  }
`;

export default function CardsForm() {
  const [value, setValue] = React.useState({
    Überschrift: "",
    Schlagworte: [],
    URL: "",
    Kartentext: ""
  });
  console.log(value);

  const handleChange = event => {
    const event_name = event.target.name;
    const event_value = event.target.value;
    setValue({ ...value, [event_name]: event_value });
  };

  return (
    <MainStyleWrapper>
      <form noValidate autoComplete="off">
        <TextField
          name="Überschrift"
          label="Überschrift"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="Schlagworte"
          label="Schlagworte - Komma getrennt"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="URL"
          label="URL"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="Kartentext"
          label="Karten Text"
          multiline
          rows="20"
          variant="outlined"
          onChange={handleChange}
        />
      </form>
    </MainStyleWrapper>
  );
}
