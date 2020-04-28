import React from "react";
import styled from "styled-components";
import Draft from "./Draft";

const MainWrapper = styled.div`
  margin: 0 1vw 1vw 1vw;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 1vw;
  font-size: 1.5rem;
`;

export default function LongItem() {
  return (
    <MainWrapper>
      <Draft />
    </MainWrapper>
  );
}
