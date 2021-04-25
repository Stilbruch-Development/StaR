import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Draft from './Draft';
import CardsContext from '../../context/cards/cardsContext';

const MainStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 1rem;

  .MuiTextField-root {
    width: 100%;
    margin: 1rem 0;
  }
`;

export default function CardsForm(props) {
  const { formPreset } = props;
  let keywords = [];
  let url = '';
  let rawEditorState = null;

  if (formPreset) {
    keywords = formPreset.keywords;
    url = formPreset.url;
    rawEditorState = formPreset.rawEditorState;
  }

  const [value, setValue] = React.useState({
    keywords: keywords,
    url: url,
    rawEditorState: rawEditorState
  });

  const { setCardsState } = useContext(CardsContext);

  const setCardsFormEditorState = (i) => {
    setValue({ ...value, rawEditorState: i });
  };

  const handleChange = (event) => {
    const event_name = event.target.name;
    const event_value = event.target.value;
    if (event_value.replace(/ /g, '').length !== 0) {
      setValue({ ...value, [event_name]: event_value });
    }
    if (event_value.length === 0) {
      setValue({ ...value, [event_name]: event_value });
    }
  };

  useEffect(() => {
    setCardsState('cardsFormState', value);
  }, [value]);

  return (
    <MainStyleWrapper>
      <Draft setCardsFormEditorState={setCardsFormEditorState} />
      <form noValidate autoComplete="off">
        <TextField
          name="keywords"
          label="Schlagworte - durch ein Leerzeichen getrennt!"
          variant="outlined"
          value={value.keywords}
          onChange={handleChange}
        />
        <TextField
          name="url"
          label="URL - inkl. https://"
          variant="outlined"
          value={value.url}
          onChange={handleChange}
        />
      </form>
    </MainStyleWrapper>
  );
}
