import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AuthContext from '../context/auth/authContext';

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

const Tools = () => {
  const authContext = useContext(AuthContext);

  const { devTools, setDevTools } = authContext;

  const handleSwitch = () => {
    setDevTools(!devTools);
  };

  useEffect(() => {
    window.ipcRenderer && window.ipcRenderer.send('toggle-dev-tools', devTools);
  }, [devTools]);

  return (
    <MainDiv>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={devTools}
              onChange={handleSwitch}
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
