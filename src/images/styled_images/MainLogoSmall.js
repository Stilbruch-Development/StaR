import React from "react";
import styled from "styled-components";
import { ReactComponent as RadtoolboxLogoSmall } from "../StaR_Main_500.svg";

const Logo = styled.object`
  display: flex;
  flex-direction: collum;
  justify-content: center;

  svg {
    width: 80%;
    height: 80%;
  }

  /* phone */
  @media (max-width: 600px) {
    svg {
      width: 30%;
      height: 30%;
    }
  }
  /* tablet portrait */
  @media (max-width: 900px) {
  }
  /* tablet landscape */
  @media (max-width: 1200px) {
  }
  /* desktop */
  @media (max-width: 1800px) {
  }
  /* >1800px = wide screen */
`;

export default function MainLogoSmall() {
  return (
    <Logo>
      <RadtoolboxLogoSmall />
    </Logo>
  );
}
