import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const Notefication = styled.div`
  position: fixed;
  bottom: 15px;
  width: 85vw;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(0, 80, 120, 0.6);
  color: black;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const useStyles = makeStyles(theme => ({
  button: {
    width: "40%",
    fontSize: "1.5rem"
  }
}));

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Message = props => {
  const classes = useStyles();
  return (
    <Notefication>
      <p>{props.message}</p>
      <ButtonWrapper>
        <Button
          variant="contained"
          fullWidth
          onClick={props.closeNotification}
          color="primary"
          className={classes.button}
        >
          Schließen
        </Button>
        {props.downloaded && (
          <Button
            variant="contained"
            fullWidth
            onClick={props.restartApp}
            color="primary"
            className={classes.button}
          >
            Neustarten
          </Button>
        )}
      </ButtonWrapper>
    </Notefication>
  );
};

export default Message;
