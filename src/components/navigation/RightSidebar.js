import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  border-left: 2px solid white;

  .MuiButton-root {
    width: 85%;
    height: 2.5rem;
    margin: 2rem 1rem 0 1rem;
  }
`;

const RightSidebar = props => {
  return (
    <SidebarDiv>
      <Button variant="outlined" color="primary" onClick={props.setToggleState}>
        <ArrowForwardIosIcon viewBox="-5 0 24 24" />
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={props.onRegisterClick}
      >
        Benutzer
      </Button>
      <Button variant="outlined" color="primary" onClick={props.onToolsClick}>
        Tools
      </Button>
    </SidebarDiv>
  );
};

export default RightSidebar;