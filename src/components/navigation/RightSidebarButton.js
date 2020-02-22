import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const ButtonWrapper = styled.div`
  height: 100%;
  width: 2vw;

  .MuiButton-root {
    min-width: unset;
    height: 100%;
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;

const RightSidebarButton = props => {
  const classes = useStyles();

  return (
    <ButtonWrapper>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={props.setToggleState}
      >
        <ArrowBackIosIcon style={{ fontSize: "1rem", marginLeft: "10px" }} />
      </Button>
    </ButtonWrapper>
  );
};

export default RightSidebarButton;
