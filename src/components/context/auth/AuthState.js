import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { user_db } from "../../../pouchdb/db";
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
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [checkToken] = useJsonWebToken();

  // Load User
  const loadUser = async () => {
    try {
      const user = checkToken(localStorage.token);
      if (user._id) {
        const userData = await user_db.get(user._id);

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

    formData._id = uuid4();

    const getEmail = email => {
      return user_db.find({
        selector: { email: email },
        fields: ["email"]
      });
    };

    try {
      const matchEmail = await getEmail(email);
      console.log(matchEmail);

      if (matchEmail.docs.length === 0) {
        await user_db.put(formData);

        const payload = {
          user: {
            _id: formData._id
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
      const dbResponse = await user_db.find({
        selector: { email: formData.email }
      });

      if (dbResponse.docs.length === 0) {
        throw new Error("Dieser Benutzer existiert nicht. Bitte registrieren.");
      }

      const userData = dbResponse.docs[0];

      const isMatch = await bcrypt.compare(
        formData.password,
        userData.password
      );

      if (!isMatch) {
        throw new Error("Ungültiges Passwort!");
      }

      const payload = {
        user: {
          _id: userData._id,
          role: userData.role || null
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
