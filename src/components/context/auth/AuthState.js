import React, { useReducer, useContext } from 'react';
import bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import AlertContext from '../alert/alertContext';
import { user_db, cards_db, expander_db, syncDB } from '../../../pouchdb/db';
import useJsonWebToken from '../../../hooks/useJsonWebToken';

import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_DEVTOOLS
} from '../types';

const jwtSecret = process.env.REACT_APP_JWTSECRET;

const AuthState = (props) => {
  const { children } = props;
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loadingAuth: false,
    user: null,
    error: null,
    devTools: false
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [checkToken] = useJsonWebToken();
  const { removeAlert, setAlert } = useContext(AlertContext);

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
        syncDB();
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.message });
      setAlert({
        item: 'message',
        value: err.message
      });
    }
  };

  // Register New User
  const register = async (e) => {
    const formData = e;
    const { email, password } = formData;

    const salt = await bcrypt.genSalt(10);

    formData.password = await bcrypt.hash(password, salt);

    formData._id = uuid4();

    const getEmail = (email_input) =>
      user_db.find({
        selector: { email: email_input },
        fields: ['email']
      });

    try {
      const matchEmail = await getEmail(email);

      if (matchEmail.docs.length === 0) {
        await user_db.put(formData);
      } else {
        throw new Error('Ein Benutzer mit dieser Email existiert schon!');
      }
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.message
      });
      setAlert({
        item: 'message',
        value: err.message
      });
    }
  };

  // UPDATE_USER
  const update = async (formData) => {
    try {
      const response = await user_db.put({
        ...formData
      });
      if (response.ok === true) {
        setAlert(
          { item: 'message', value: 'Neue Benutzerdaten gespeichert!' },
          { item: 'color', value: 'rgba(191, 255, 184, 0.8' }
        );
        loadUser();
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err });
      setAlert({
        item: 'message',
        value:
          'Neue Benutzerdaten konnten nicht gespeichert werden. Bitte neu einloggen.'
      });
    }
  };

  // DELETE USER AND ALL DOCUMENTS!!
  const deleteUserData = async (user) => {
    try {
      const responseUser = await user_db.put({
        ...user,
        _deleted: true
      });

      const expanderArray = await expander_db.find({
        selector: { user: user._id }
      });

      expanderArray.docs.forEach((i) => {
        const element = i;
        element._deleted = true;
      });

      const responseExpander = await expander_db.bulkDocs(expanderArray.docs);
      let responseExpanderNumber = 0;

      responseExpander.forEach((x) => {
        x.ok === true && (responseExpanderNumber += 1);
      });

      const cardsArray = await cards_db.find({
        selector: { user: user._id }
      });

      cardsArray.docs.forEach((a) => {
        const element = a;
        element._deleted = true;
      });

      const responseCards = await cards_db.bulkDocs(cardsArray.docs);
      let responseCardsNumber = 0;

      responseCards.forEach((x) => {
        x.ok === true && (responseCardsNumber += 1);
      });

      if (
        responseUser.ok === true &&
        responseExpanderNumber !== 0 &&
        responseCardsNumber !== 0
      ) {
        setAlert(
          {
            item: 'message',
            value: `Benutzer und alle Benutzerdaten wurden gelöscht!! (Expander: ${responseExpanderNumber}; Cards: ${responseCardsNumber})`
          },
          { item: 'color', value: 'rgba(191, 255, 184, 0.8' }
        );
        syncDB();
      } else {
        setAlert({
          item: 'message',
          value: `Löschen nur teilweise erfolgreich! User: ${responseUser.ok}; Expander: ${responseExpanderNumber}; Cards: ${responseCardsNumber};`
        });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err });
      setAlert({
        item: 'message',
        value: 'Benutzer und Benutzerdaten konnten nicht gelöscht werden!!'
      });
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const dbResponse = await user_db.find({
        selector: { email: formData.email }
      });

      if (dbResponse.docs.length === 0) {
        throw new Error('Dieser Benutzer existiert nicht. Bitte registrieren.');
      }

      const userData = dbResponse.docs[0];

      const isMatch = await bcrypt.compare(
        formData.password,
        userData.password
      );

      if (!isMatch) {
        throw new Error('Ungültiges Passwort!');
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
      removeAlert();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message
      });
      setAlert({
        item: 'message',
        value: err.message
      });
      console.log('from catch login in AuthState.js');
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
    removeAlert();
    syncDB();
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Set DevTools
  const setDevTools = (boolean) => {
    dispatch({
      type: SET_DEVTOOLS,
      payload: boolean
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loadingAuth: state.loadingAuth,
        user: state.user,
        error: state.error,
        devTools: state.devTools,
        register,
        loadUser,
        update,
        deleteUserData,
        login,
        logout,
        clearErrors,
        setDevTools
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
