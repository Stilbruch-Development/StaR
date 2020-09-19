import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Expander from '../tools/expander/Expander';
import Cards from '../tools/cards/Cards';
import NavContext from '../context/navigation/navContext';

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 15vw;
  border-right: 2px solid white;

  .MuiButton-root,
  .MuiFormControl-root {
    min-width: 70%;
    height: auto;
    margin: 1vw 1vw 1vw 1vw;
  }

  .MuiFormLabel-root {
    color: var(--button-color-primary);
    width: 50%;
  }

  .MuiInputLabel-outlined {
    z-index: 1;
    transform: translate(14px, 14px) scale(1);
    pointer-events: none;
  }

  .MuiMenu-list {
    color: var(--button-color-primary);
    background: var(--main-bg-color);
  }

  .MuiInputLabel-root.Mui-focused,
  .MuiFormLabel-filled {
    font-size: 1.2rem;
    z-index: 1;
    background: var(--main-bg-color);
    padding-left: 0.2rem;
    padding-right: 1.2rem;
    border-radius: 5px;
    color: var(--button-color-primary);
    font-family: inherit;
  }
  .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused.Mui-focused.MuiInputBase-formControl {
    background: none;
    font-family: inherit;
  }

  .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input {
    background: var(--main-bg-color);
  }
`;

const LeftSidebar = (props) => {
  const [standard, setLists] = React.useState('');

  const { setNavState } = useContext(NavContext);

  const handleChange = (event) => {
    setLists(event.target.value);
    setNavState('display', event.target.value);
    event.target.value !== '' && setNavState('rightSidebareOpen', true);
  };

  return (
    <SidebarDiv>
      <Button variant="outlined" color="primary" onClick={props.setToggleState}>
        <ArrowBackIosIcon viewBox="-5 0 24 24" />
      </Button>

      <FormControl variant="outlined">
        <InputLabel id="standard">STANDARD BEFUNDE</InputLabel>
        <Select
          labelId="standard"
          id="standard"
          value={standard}
          onChange={handleChange}
          label="Liste"
        >
          <MenuItem value="">
            <em>Keine</em>
          </MenuItem>
          <MenuItem value={'CT-Pulmonalis'}>CT-Pulmonalis</MenuItem>
          <MenuItem value={'CT-COVID-19'}>CT-COVID-19</MenuItem>
          <MenuItem value={'MRT-Prostata'}>MRT-Prostata</MenuItem>
        </Select>
      </FormControl>
      <Expander setExpanderItem={props.setExpanderItem} />
      <Cards />
      <Button variant="outlined" color="primary">
        Werkzeuge
      </Button>
    </SidebarDiv>
  );
};

export default LeftSidebar;
