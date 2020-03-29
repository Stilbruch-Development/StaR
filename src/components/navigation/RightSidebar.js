import React, { useContext } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Lungenembolie from "../radtools/lists/lungenembolie/Lungenembolie";
import LungenembolieContext from "../context/lists/lungenembolie/lungenembolieContext";

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
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
  const { LungenembolieState, setLungenembolieState } = useContext(
    LungenembolieContext
  );

  const handleSubmit = () => () => {
    setLungenembolieState({
      ...LungenembolieState,
      send: true
    });
  };

  return (
    <SidebarDiv>
      <Button variant="outlined" color="primary" onClick={props.setToggleState}>
        <ArrowForwardIosIcon viewBox="-5 0 24 24" />
      </Button>

      <Lungenembolie />
      <Button variant="outlined" color="primary" onClick={handleSubmit()}>
        Abschicken
      </Button>
    </SidebarDiv>
  );
};

export default RightSidebar;
