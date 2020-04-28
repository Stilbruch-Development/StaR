import React, { useContext } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Lungenembolie from "../tools/lists/lungenembolie/Lungenembolie";
import NavContext from "../../components/context/navigation/navContext";
import CardsDisplay from "../../components/tools/cards/DraftDisplay";
import CardsContext from "../../components/context/cards/cardsContext";

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  border-left: 2px solid white;

  .MuiButton-root {
    height: 2.5rem;
    margin: 1vw 1vw 1vw 1vw;
  }
`;

const RightSidebar = () => {
  const { display, rightSidebareOpen, setNavState } = useContext(NavContext);
  const { setCardsState } = useContext(CardsContext);

  const onButtonClick = () => {
    setNavState("rightSidebareOpen", !rightSidebareOpen);
    setCardsState("selectedCardsItem", null);
  };

  const handleClose = () => {
    setNavState("rightSidebareOpen", false);
    setCardsState("selectedCardsItem", null);
  };

  const getDisplay = () => {
    switch (display) {
      case "":
        return <></>;
      case "CT-Pulmonalis":
        return <Lungenembolie />;
      case "CT-COVID-19":
        return <></>;
      case "MRT-Prostata":
        return <></>;
      case "Cards":
        return <CardsDisplay handleClose={handleClose} />;
      default:
        return <></>;
    }
  };

  return (
    <SidebarDiv>
      <Button variant="outlined" color="primary" onClick={onButtonClick}>
        <ArrowForwardIosIcon viewBox="-5 0 24 24" />
      </Button>
      {getDisplay()}
    </SidebarDiv>
  );
};

export default RightSidebar;
