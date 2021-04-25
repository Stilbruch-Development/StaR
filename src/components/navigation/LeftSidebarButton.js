import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

const ButtonWrapper = styled.div`
  width: 2vw;
  margin-top: 1vw;
  margin-bottom: 1vw;

  .MuiButton-root {
    min-width: unset;
    height: 100%;
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;

const LeftSidebarButton = (props) => {
  const { setToggleState } = props;
  const classes = useStyles();

  return (
    <ButtonWrapper>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={setToggleState}
      >
        <ArrowForwardIosIcon style={{ fontSize: '1rem' }} />
      </Button>
    </ButtonWrapper>
  );
};

export default LeftSidebarButton;
