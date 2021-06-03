/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components/macro';
import CardsList from './CardsList';
import DraftDisplay from './DraftDisplay';
import CardsForm from './CardsForm';
import CardsContext from '../../context/cards/cardsContext';

const MainStyleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0;
  padding: 1rem;
`;

const CardsItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  margin: 0;
  flex: 3 1 auto;
  max-width: 60%;
  word-wrap: break-word;
`;

const CardsListWrapper = styled.div`
  margin: 0 1rem;
  flex: 0 1 auto;
`;

const UnselectedWrapper = styled.div`
  margin: 0 1vw 1vw 1vw;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 1vw;
  padding: 3rem;
  color: rgba(0, 0, 0, 0.5);
`;

const Cards = () => {
  const [open, setOpen] = useState(false);

  const { selectedCardsItem, editingCards, setCardsState } =
    useContext(CardsContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      setCardsState('editingCards', false);
      setCardsState('cardsFormState', null);
      setCardsState('selectedCardsItem', null);
      setCardsState('error', null);
    }, 60);
  };

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Infokarten
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="Dialog"
      >
        <MainStyleWrapper>
          <CardsListWrapper>
            <Typography
              variant="h6"
              style={{
                padding: '16px'
              }}
            >
              Kartenliste
            </Typography>
            <CardsList handleClose={handleClose} />
          </CardsListWrapper>
          <CardsItemWrapper>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Ausgewählte Karte
            </DialogTitle>
            {selectedCardsItem === null && editingCards === false ? (
              <UnselectedWrapper>
                Bitte klicke auf ein Karten-Element.
              </UnselectedWrapper>
            ) : editingCards === false ? (
              <DraftDisplay handleClose={handleClose} />
            ) : (
              <CardsForm formPreset={selectedCardsItem} />
            )}
          </CardsItemWrapper>
        </MainStyleWrapper>
      </Dialog>
    </>
  );
};

export default Cards;
