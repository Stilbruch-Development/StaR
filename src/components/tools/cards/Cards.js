import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import CardsList from "./CardsList";
import DraftDisplay from "./DraftDisplay";
import CardsForm from "./CardsForm";
import CardsContext from "../../context/cards/cardsContext";

const MainStyleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: strech;
  margin: 0;
  height: 100%;
`;

const CardsItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  margin: 0;
  flex-grow: 3;
`;

const CardsListWrapper = styled.div`
  min-width: 30%;
  flex-grow: 0;
`;

const Cards = () => {
  const [open, setOpen] = useState(false);

  const { selectedCardsItem, editingCards, setCardsState } = useContext(
    CardsContext
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      setCardsState("editingCards", false);
      setCardsState("cardsFormState", null);
      setCardsState("selectedCardsItem", null);
      setCardsState("error", null);
    }, 60);
  };

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
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
        Cards
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        id="ExpanderDialog"
      >
        <MainStyleWrapper>
          <CardsListWrapper>
            <Typography variant="h6" style={{ padding: "16px" }}>
              Kartenliste
            </Typography>
            <CardsList handleClose={handleClose} />
          </CardsListWrapper>
          <CardsItemWrapper>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Ausgewählte Karte
            </DialogTitle>
            {selectedCardsItem === null && editingCards === false ? (
              <div>Bitte Auswahl treffen</div>
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
