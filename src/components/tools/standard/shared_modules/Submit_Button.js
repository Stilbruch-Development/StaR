import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .MuiButton-root {
    width: 85%;
    height: 2.5rem;
    margin: 1rem 1rem 0 1rem;
  }
`;

export default function SubmitButton(props) {
  return (
    <ButtonWrapper>
      <Button variant="outlined" color="primary" onClick={props.handleSubmit}>
        Abschicken
      </Button>
    </ButtonWrapper>
  );
}
