import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ShortsList from "./ShortsList";
import LongItem from "./LongItem";
import ExpanderContext from "../../context/expander/expanderContext";

const MainStyleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: strech;
  margin: 0;
  height: 100%;
`;

const ExpanderEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  margin: 0;
  flex-grow: 3;
`;

const ExpanderShortsWrapper = styled.div`
  min-width: 30%;
  flex-grow: 0;
`;

const Expander = props => {
  const [open, setOpen] = useState(false);

  const { selectExpanderItem, lockEditor, setExpanderEditor } = useContext(
    ExpanderContext
  );

  const handleClickOpen = () => {
    setOpen(true);
    lockEditor(true);
  };

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      selectExpanderItem(null);
      lockEditor(true);
      setExpanderEditor(null);
    }, 60);
  };

  const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

  const DialogTitle = withStyles(styles)(props => {
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
        Expander
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        id="ExpanderDialog"
      >
        <MainStyleWrapper>
          <ExpanderShortsWrapper>
            <Typography variant="h6" style={{ padding: "16px" }}>
              KÜRZEL
            </Typography>
            <ShortsList handleClose={handleClose} />
          </ExpanderShortsWrapper>
          <ExpanderEditorWrapper>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              EXPANDER TEXT
            </DialogTitle>
            <LongItem />
          </ExpanderEditorWrapper>
        </MainStyleWrapper>
      </Dialog>
    </>
  );
};

export default Expander;
