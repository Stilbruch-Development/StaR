import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Draft from "./Draft";
import CardsContext from "../../context/cards/cardsContext";

const MainStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 1rem;
  height: 100%;

  .MuiTextField-root {
    width: 100%;
    margin: 1rem 0;
  }
`;

export default function CardsForm(props) {
  const [value, setValue] = React.useState({
    keywords: props.formPreset.keywords || [],
    url: props.formPreset.url || "",
    rawEditorState: props.formPreset.rawEditorState || null
  });

  const { setCardsState } = useContext(CardsContext);

  const setCardsFormEditorState = rawEditorState => {
    setValue({ ...value, rawEditorState: rawEditorState });
  };

  const handleChange = event => {
    const event_name = event.target.name;
    const event_value = event.target.value;
    setValue({ ...value, [event_name]: event_value });
  };

  useEffect(() => {
    setCardsState("cardsFormState", value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <MainStyleWrapper>
      <Draft setCardsFormEditorState={setCardsFormEditorState} />
      <form noValidate autoComplete="off">
        <TextField
          name="keywords"
          label="Schlagworte - Komma getrennt"
          variant="outlined"
          value={value.keywords}
          onChange={handleChange}
        />
        <TextField
          name="url"
          label="URL"
          variant="outlined"
          value={value.url}
          onChange={handleChange}
        />
      </form>
    </MainStyleWrapper>
  );
}
