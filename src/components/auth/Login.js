import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import AlertContext from "../context/alert/alertContext";
import AuthContext from "../context/auth/authContext";
import Divider from "@material-ui/core/Divider";
import Logo from "../../images/styled_images/MainLogo";

const MainStyleWrapper = styled.div`
  margin: 0% 35% 0% 35%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;

  button {
    font-size: 1.6rem;
    font-family: inherit;
    margin-top: 5rem;
  }
`;

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/workplace");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = () => {
    if (email === "" || password === "") {
      setAlert({
        item: "message",
        value: "Bitte gib eine gültige Email und das zugehörige Password ein.",
      });
    } else if (error) {
      setAlert({
        item: "message",
        value: error,
      });
      clearErrors();
    } else {
      login({
        email,
        password,
      });
    }
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        onSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <MainStyleWrapper>
      <div style={{ width: "80%", padding: "2rem" }}>
        <Logo />
      </div>
      <Divider />
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

      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={onButtonClick}
      >
        Login
      </Button>
    </MainStyleWrapper>
  );
};

export default Login;
