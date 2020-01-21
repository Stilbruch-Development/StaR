import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import db from "../../indexedDB/db";
import bcrypt from "bcryptjs";
import uuid4 from "uuid/v4";
import jwt from "jsonwebtoken";
import useJsonWebToken from "../../../hooks/useJsonWebToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const jwtSecret = process.env.REACT_APP_JWTSECRET;

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [checkToken] = useJsonWebToken();

  // Load User
  const loadUser = async () => {
    try {
      const user = checkToken(localStorage.token);
      if (user.id) {
        const userData = await db.users.get({
          id: user.id
        });

        dispatch({
          type: USER_LOADED,
          payload: userData
        });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err });
      console.log(err);
    }
  };

  // Register New User
  const register = async formData => {
    const { email, password } = formData;

    const salt = await bcrypt.genSalt(10);

    formData.password = await bcrypt.hash(password, salt);

    formData.id = uuid4();

    function getEmail(email) {
      return db.users
        .where("email")
        .equals(email)
        .toArray();
    }

    try {
      const matchEmail = await getEmail(email);

      if (matchEmail.length === 0) {
        await db.users.add(formData);

        const payload = {
          user: {
            id: formData.id
          }
        };

        const token = jwt.sign(payload, jwtSecret, {
          expiresIn: 7200
        });

        dispatch({
          type: REGISTER_SUCCESS,
          payload: token
        });
      } else {
        throw new Error("Einen Benutzer mit dieser Email existiert schon!");
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err
      });
    }
  };

  // Login User
  const login = async formData => {
    try {
      const userData = await db.users.get({
        email: formData.email
      });

      if (!userData) {
        throw new Error("Dieser Benutzer existiert nicht. Bitte registrieren.");
      }

      const isMatch = await bcrypt.compare(
        formData.password,
        userData.password
      );

      if (!isMatch) {
        throw new Error("Ungültiges Passwort!");
      }

      const payload = {
        user: {
          id: userData.id
        }
      };

      const token = jwt.sign(payload, jwtSecret, {
        expiresIn: 7200
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: token
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err
      });
      console.log(err);
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
