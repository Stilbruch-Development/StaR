import React, { useContext } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Expander from "../tools/expander/Expander";
import Cards from "../tools/cards/Cards";
import NavContext from "../context/navigation/navContext";

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 100%;
  width: 15vw;
  border-right: 2px solid white;

  .MuiButton-root,
  .MuiFormControl-root {
    min-width: 70%;
    height: auto;
    margin: 2rem 1rem 0 1rem;
  }

  .MuiOutlinedInput-notchedOutline {
    border: var(--button-border);
  }

  .MuiFormLabel-root {
    font-family: unset;
    color: var(--button-color-primary);
  }

  .MuiMenu-list {
    color: var(--button-color-primary);
    background: var(--main-bg-color);
  }

  .MuiInputLabel-root.Mui-focused {
    font-size: 1.2rem;
    z-index: 1;
    background: var(--main-bg-color);
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    border-radius: 25px;
  }
`;

const LeftSidebar = props => {
  const [lists, setLists] = React.useState("");

  const { setNavState } = useContext(NavContext);

  const handleChange = event => {
    setLists(event.target.value);
    setNavState("reportList", event.target.value);
    event.target.value !== "" && setNavState("rightSidebareOpen", true);
  };

  return (
    <SidebarDiv>
      <Button variant="outlined" color="primary" onClick={props.setToggleState}>
        <ArrowBackIosIcon viewBox="-5 0 24 24" />
      </Button>
      <Expander setExpanderItem={props.setExpanderItem} />
      <FormControl variant="outlined">
        <InputLabel id="lists">Listen</InputLabel>
        <Select
          labelId="lists"
          id="lists"
          value={lists}
          onChange={handleChange}
          label="Liste"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"CT-Pulmonalis"}>CT-Pulmonalis</MenuItem>
          <MenuItem value={"CT-COVID-19"}>CT-COVID-19</MenuItem>
          <MenuItem value={"MRT-Prostata"}>MRT-Prostata</MenuItem>
        </Select>
      </FormControl>
      <Cards />
      <Button variant="outlined" color="primary">
        Tools
      </Button>
    </SidebarDiv>
  );
};

export default LeftSidebar;
