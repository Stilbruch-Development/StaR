import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import NavContext from "../../components/context/navigation/navContext";

const ButtonWrapper = styled.div`
  height: 100%;
  width: 2vw;

  .MuiButton-root {
    min-width: unset;
    height: 100%;
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;

const RightSidebarButton = () => {
  const { setNavState, rightSidebareOpen } = useContext(NavContext);

  const onButtonClick = () => {
    setNavState("rightSidebareOpen", !rightSidebareOpen);
  };

  return (
    <ButtonWrapper>
      <Button variant="outlined" color="primary" onClick={onButtonClick}>
        <ArrowBackIosIcon style={{ fontSize: "1rem", marginLeft: "10px" }} />
      </Button>
    </ButtonWrapper>
  );
};

export default RightSidebarButton;
