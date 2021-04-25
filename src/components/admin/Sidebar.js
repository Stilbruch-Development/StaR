import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 100%;
  width: 12vw;
  border-right: 2px solid white;

  .MuiButton-root {
    width: 85%;
    margin: 2rem 1rem 0 1rem;
  }
`;

const Sidebar = (props) => {
  const {
    setToggleState,
    onRegisterClick,
    onChangeUserClick,
    onToolsClick
  } = props;
  return (
    <SidebarDiv>
      <Button variant="outlined" color="primary" onClick={setToggleState}>
        <ArrowBackIosIcon viewBox="-5 0 24 24" />
      </Button>
      <Button variant="outlined" color="primary" onClick={onRegisterClick}>
        Benutzer Anlegen
      </Button>
      <Button variant="outlined" color="primary" onClick={onChangeUserClick}>
        Benutzerdaten Ändern
      </Button>
      <Button variant="outlined" color="primary" onClick={onToolsClick}>
        Tools
      </Button>
    </SidebarDiv>
  );
};

export default Sidebar;
