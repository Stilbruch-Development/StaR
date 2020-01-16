import React from "react";
import styled from "styled-components";
import { ReactComponent as NavMenuIcon } from "../navMenu.svg";

const Icon = styled.object`
  svg {
    height: 6rem;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 1));
  }
`;

export default function NavMenu() {
  return (
    <Icon data-testid="NavMenu">
      <NavMenuIcon />
    </Icon>
  );
}
