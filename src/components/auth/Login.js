import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import AlertContext from "../context/alert/alertContext";
import AlertBox from "../layout/Alerts";
import AuthContext from "../context/auth/authContext";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const MainStyleWrapper = styled.div`
  margin: 5% 30% 10% 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    marginTop: "10%"
  },
  input: {
    display: "none"
  }
}));

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/workplace");
    }
    if (error === "Ungültige Email oder Passwort!") {
      setAlert("allFields", "error", error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    email === "" &&
      setAlert("email", "error", "Bitte gib eine gültige Email an.");
    password === "" &&
      setAlert("password", "error", "Bitte gib ein Passwort an.");

    login({
      email,
      password
    });
  };

  const classes = useStyles();

  return (
    <MainStyleWrapper>
      <AlertBox />
      <Typography
        variant="h4"
        style={{ fontFamily: "inherit", marginBottom: "10%" }}
      >
        Bitte melde dich mit deinen Zugangsdaten an.
      </Typography>
      <Divider />
      <TextField
        // error={true}
        // helperText={"Achtung"}
        name="email"
        value={email}
        onChange={onChange}
        margin="dense"
        label="Email"
        type="email"
        fullWidth
      />
      <TextField
        name="password"
        value={password}
        onChange={onChange}
        margin="dense"
        label="Passwort"
        type="password"
        fullWidth
      />

      <Button
        variant="contained"
        fullWidth
        onClick={onSubmit}
        color="primary"
        className={classes.button}
      >
        Login
      </Button>
    </MainStyleWrapper>
  );
};

export default Login;
