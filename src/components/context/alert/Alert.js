import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import Button from '@material-ui/core/Button';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { makeStyles } from '@material-ui/core/styles';
import AlertContext from './alertContext';

const AlertWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Notefication = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85vw;
  padding: 10px;
  border-radius: 5px;
  color: black;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
    fontSize: '1.5rem',
    margin: '1rem'
  }
}));

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Alert = () => {
  const classes = useStyles();

  const { message, button, onClickButton, removeAlert, alertState } = {
    ...useContext(AlertContext)
  };

  return (
    <AlertWrapper>
      {message !== '' && (
        <Notefication style={{ backgroundColor: alertState?.color || 'red' }}>
          <p>{message}</p>
          <CancelOutlinedIcon
            style={{ fontSize: '3rem', cursor: 'pointer', margin: '1rem' }}
            onClick={removeAlert}
          />
          <ButtonWrapper>
            {button !== '' && (
              <Button
                variant="contained"
                fullWidth
                onClick={onClickButton}
                color="primary"
                className={classes.button}
              >
                {button}
              </Button>
            )}
          </ButtonWrapper>
        </Notefication>
      )}
    </AlertWrapper>
  );
};

export default Alert;
