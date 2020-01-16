import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Expander from "../radtools/expander/Expander";

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 100%;
  width: 12vw;
  border-right: 2px solid white;

  .MuiButton-root {
    min-width: 70%;
    height: 2.5rem;
    margin: 2rem 1rem 0 1rem;
  }
`;

const Sidebar = props => {
  return (
    <SidebarDiv>
      <Button variant="outlined" color="primary" onClick={props.setToggleState}>
        <ArrowBackIosIcon viewBox="-5 0 24 24" />
      </Button>
      <Expander setExpanderItem={props.setExpanderItem} />
      <Button variant="outlined" color="primary">
        Tools
      </Button>
      <Button variant="outlined" color="primary">
        Tools
      </Button>
      <Button variant="outlined" color="primary">
        Tools
      </Button>
    </SidebarDiv>
  );
};

export default Sidebar;
