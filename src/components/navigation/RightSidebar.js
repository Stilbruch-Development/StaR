import React, { useContext } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Lungenembolie from "../tools/lists/lungenembolie/Lungenembolie";
import NavContext from "../../components/context/navigation/navContext";

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  height: 100%;
  width: 100%;
  border-left: 2px solid white;

  .MuiButton-root {
    height: 2.5rem;
    margin: 1rem 1rem 0 1rem;
  }
`;

const RightSidebar = () => {
  const { reportList, rightSidebareOpen, setNavState } = useContext(NavContext);

  const onButtonClick = () => {
    setNavState("rightSidebareOpen", !rightSidebareOpen);
  };

  const getList = () => {
    switch (reportList) {
      case "":
        return <></>;
      case "CT-Pulmonalis":
        return <Lungenembolie />;
      case "CT-COVID-19":
        return <></>;
      case "MRT-Prostata":
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <SidebarDiv>
      <Button variant="outlined" color="primary" onClick={onButtonClick}>
        <ArrowForwardIosIcon viewBox="-5 0 24 24" />
      </Button>
      {getList()}
    </SidebarDiv>
  );
};

export default RightSidebar;
