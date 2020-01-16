import React, { useContext } from "react";
import AlertContext from "../context/alert/alertContext";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const classes = useStyles();

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id} className={alert.type}>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            {alert.msg}
          </Typography>
        </Paper>
      </div>
    ))
  );
};

export default Alerts;
