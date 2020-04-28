import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Draft from "./Draft";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0),
    width: "100%",
  },
}));

export default function LongItem() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Draft />
    </Paper>
  );
}
