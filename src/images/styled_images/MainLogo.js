import React from "react";
import styled from "styled-components";
import { ReactComponent as RadtoolboxLogo } from "../StaR_Main_500.svg";

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40rem;

  /* phone */
  @media (max-width: 600px) {
  }
  /* tablet portrait */
  @media (max-width: 900px) {
  }
  /* tablet landscape */
  @media (max-width: 1200px) {
    width: 40rem;
  }
  /* desktop */
  @media (max-width: 1800px) {
  }
  /* >1800px = wide screen */
`;

export default function MainLogo() {
  return (
    <Logo>
      <RadtoolboxLogo
        preserveAspectRatio="xMidYMin slice"
        style={{
          width: "100%",
          paddingBottom: "90%",
          height: "1px",
          overflow: "visible"
        }}
      />
    </Logo>
  );
}
