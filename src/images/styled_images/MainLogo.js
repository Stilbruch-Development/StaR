import React from "react";
import styled from "styled-components";
import { ReactComponent as RadtoolboxLogo } from "../StaR_Main.svg";

const Logo = styled.object`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 40rem;
  }

  /* phone */
  @media (max-width: 600px) {
    svg {
      width: 80rem;
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

export default function MainLogo() {
  return (
    <Logo>
      <RadtoolboxLogo />
    </Logo>
  );
}
