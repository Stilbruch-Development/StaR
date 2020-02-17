import React from "react";
import styled from "styled-components";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin: 10%;

  .MuiSwitch-root {
  }
`;

const Tools = props => {
  const [state, setState] = React.useState({
    checkedDevTools: true
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <MainDiv>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={state.checkedB}
              onChange={handleChange("checkedDevTools")}
              value="checkedDevTools"
              color="primary"
            />
          }
          label="Toggle DevTools"
        />
      </FormGroup>
    </MainDiv>
  );
};

export default Tools;
