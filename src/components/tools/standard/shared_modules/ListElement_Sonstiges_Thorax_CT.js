import React from 'react';
import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

const MainWrapper = styled.div`
  .MuiListItem-root {
    justify-content: space-between;
    font-family: inherit;
  }

  .MuiFormLabel-root,
  .MuiInputBase-root {
    font-family: inherit;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 1rem;
`;

export default function ListElementSonstiges(props) {
  const { state } = props;
  const {
    Pleura,
    Lungenparenchym,
    Lymphknoten,
    Herz_Mediastinum,
    Oberbauch,
    Skelett
  } = state;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    const listItem = event.target.name;
    const listValue = event.target.value;
    window.setTimeout(() => {
      props.setState({
        ...props.state,
        [listItem]: listValue
      });
    }, 50);
  };

  return (
    <MainWrapper>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Sonstiges" />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <form noValidate autoComplete="off">
          <FormWrapper>
            <TextField
              id="standard-basic"
              name="Lungenparenchym"
              placeholder={Lungenparenchym}
              label="Lungenparenchym"
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              name="Pleura"
              placeholder={Pleura}
              label="Pleura"
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              name="Herz_Mediastinum"
              placeholder={Herz_Mediastinum}
              label="Herz u. Mediastinum"
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              name="Lymphknoten"
              placeholder={Lymphknoten}
              label="Lymphknoten"
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              name="Oberbauch"
              placeholder={Oberbauch}
              label="Oberbauch"
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              name="Skelett"
              placeholder={Skelett}
              label="Skelett"
              onChange={handleChange}
            />
          </FormWrapper>
        </form>
      </Collapse>
    </MainWrapper>
  );
}
