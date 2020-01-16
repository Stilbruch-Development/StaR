import React from "react";
import styled from "styled-components";
import { ReactComponent as NavCancelIcon } from "../navCancel.svg";

const Icon = styled.div`
  svg {
    height: 0.8em;
    margin-top: 2rem;
  }
`;

export default function NavCancel() {
  return (
    <Icon data-testid="NavCancel">
      <NavCancelIcon />
    </Icon>
  );
}
