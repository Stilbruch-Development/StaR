import React from "react";
import styled from "styled-components";
import { ReactComponent as SLogo } from "../stilbruchLogo.svg";

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  canvas {
    display: block;
    width: 50%;
    visibility: hidden;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  /* phone */
  @media (max-width: 600px) {
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

export default function StilbruchLogo() {
  return (
    <Logo>
      <canvas></canvas>
      <SLogo />
    </Logo>
  );
}
