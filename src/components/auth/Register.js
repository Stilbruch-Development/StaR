import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import AlertContext from "../context/alert/alertContext";
import AuthContext from "../context/auth/authContext";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const MainStyleWrapper = styled.div`
  margin: 10% 30% 10% 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginTop: "10%",
  },
  input: {
    display: "none",
  },
}));

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { register, error, clearErrors } = authContext;

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { first_name, last_name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      password === "" ||
      password2 === ""
    ) {
      setAlert({ item: "message", value: "Bitte alle Felder ausfüllen!" });
    } else if (password !== password2) {
      setAlert({
        item: "message",
        value: "Passwörter stimmen nicht überein!",
      });
    } else if (error) {
      setAlert({
        item: "message",
        value: error,
      });
      clearErrors();
    } else {
      register({
        first_name,
        last_name,
        email,
        password,
      });
      setAlert(
        {
          item: "message",
          value: `Neuer Beneutzer angelegt: ${first_name} ${last_name}, ${email}`,
        },
        { item: "color", value: "rgba(191, 255, 184, 0.8)" }
      );
      props.setAdminState({
        register: false,
      });
    }
  };

  const classes = useStyles();

  return (
    <MainStyleWrapper>
      <Typography
        variant="h4"
        style={{ fontFamily: "inherit", marginBottom: "10%" }}
      >
        Neues Benutzerkonto anlegen.
      </Typography>
      <Divider />
      <TextField
        autoFocus
        margin="dense"
        label="Vorname"
        type="text"
        name="first_name"
        value={first_name}
        onChange={onChange}
        fullWidth
      />
      <TextField
        name="last_name"
        value={last_name}
        onChange={onChange}
        margin="dense"
        label="Nachname"
        type="text"
        fullWidth
      />
      <TextField
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
      <TextField
        name="password2"
        value={password2}
        onChange={onChange}
        margin="dense"
        label="Passwort Wiederhohlung"
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
        Neuen Benutzer anlegen.
      </Button>
    </MainStyleWrapper>
  );
};

export default Register;
