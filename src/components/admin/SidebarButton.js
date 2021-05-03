import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components/macro';
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
  height: 100%;
  width: 2vw;

  .MuiButton-root {
    min-width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
`;

const SidebarButton = (props) => {
  const classes = useStyles();
  const { setToggleState } = props;
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

export default SidebarButton;
