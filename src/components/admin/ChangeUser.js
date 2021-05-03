import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import bcrypt from 'bcryptjs';
import Divider from '@material-ui/core/Divider';
import { user_db } from '../../pouchdb/db';
import UserTable from './UserTable';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

const MainStyleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AlignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const HeadingWrapper = styled.div`
  font-family: inherit;
  font-size: 2.5rem;
  padding: 1rem;
  margin-top: 5%;
`;

const FormWrapper = styled.div`
  width: 30%;
  margin-top: 3%;
  .MuiInputBase-inputMarginDense {
    font-size: 1.5rem;
  }
  .MuiInputLabel-root {
    font-size: 1.5rem;
  }

  #user_edit_save {
    background-color: rgba(191, 255, 184, 0.6);
    :hover {
      background-color: rgba(191, 255, 184, 1);
    }
  }
  #user_edit_cancel {
    background-color: rgba(255, 184, 191, 0.6);
    :hover {
      background-color: rgba(255, 184, 191, 1);
    }
  }
`;

const ChangeUser = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { user, update, deleteUserData } = authContext;

  const { register, handleSubmit, watch, errors } = useForm();

  const [state, setState] = useState({
    userArray: null,
    selectedUser: null,
    editing: false,
    changingPassword: false,
    deleteUser: false
  });

  const getAllUser = async () => {
    try {
      let user_array;
      if (user.role === 1) {
        user_array = await user_db.allDocs({
          include_docs: true
        });
      }
      setState({ userArray: user_array.rows });

      return user_array;
    } catch (err) {
      setAlert({
        item: 'message',
        value: err.message
      });
    }
    return null;
  };

  const onSubmit = async (form_data_input) => {
    const form_data = form_data_input;
    delete form_data.password2;
    const user_data = {
      ...state.selectedUser,
      ...form_data
    };
    delete user_data.tableData;
    const salt = await bcrypt.genSalt(10);

    if (form_data.password) {
      user_data.password = await bcrypt.hash(form_data.password, salt);
    }
    update(user_data);
    setState({ ...state, editing: false });
  };

  const onDeleteClick = async (user_data_input) => {
    const user_data = user_data_input;
    delete user_data.tableData;
    user.role === 1 &&
      deleteUserData(user_data) &&
      setState({ ...state, deleteUser: false });
  };

  const handleCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  state.userArray === null && getAllUser();

  return (
    <MainStyleWrapper>
      <AlignWrapper>
        {state.editing ? (
          <HeadingWrapper>BENUTZERDATEN ÄNDERN</HeadingWrapper>
        ) : (
          <HeadingWrapper>Benutzerdaten</HeadingWrapper>
        )}
        <Divider style={{ marginBottom: '5%' }} />
      </AlignWrapper>
      {state.userArray && !state.editing && (
        <UserTable changeUserState={state} changeUserSetState={setState} />
      )}
      {!state.editing &&
        (state.selectedUser ? (
          <Button
            variant="outlined"
            color="primary"
            style={{
              marginTop: '5%',
              fontSize: '1.5rem',
              cursor: 'pointer',
              width: '80%'
            }}
            onClick={() => {
              setState({
                ...state,
                editing: true
              });
            }}
          >
            Benutzerdaten ändern!
          </Button>
        ) : (
          <p className="formError">Bitte Benutzer auswählen!</p>
        ))}

      {state.editing && state.selectedUser && (
        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              label="Vorname"
              type="text"
              name="first_name"
              defaultValue={state.selectedUser.first_name}
              fullWidth
              inputRef={register({
                required: true,
                pattern: /^[a-zA-ZöäüÖÄÜ][a-zA-ZöäüÖÄÜ0-9-_.]{1,20}$/i
              })}
            />
            {errors.first_name && (
              <p className="formError">
                Bitte Vorname aus 2 bis 20 Buchstaben oder Ziffern angeben!
              </p>
            )}
            <TextField
              name="last_name"
              defaultValue={state.selectedUser.last_name}
              margin="dense"
              label="Nachname"
              type="text"
              fullWidth
              inputRef={register({
                required: true,
                pattern: /^[a-zA-ZöäüÖÄÜ][a-zA-ZöäüÖÄÜ0-9-_.]{1,20}$/i
              })}
            />
            {errors.last_name && (
              <p className="formError">
                Bitte Nachnamen aus 2 bis 20 Buchstaben oder Ziffern angeben!
              </p>
            )}
            <TextField
              name="email"
              defaultValue={state.selectedUser.email}
              margin="dense"
              label="Email"
              fullWidth
              inputRef={register({
                required: {
                  value: true,
                  message: 'Bitte eine gültige Email-Adresse angeben!'
                }
              })}
            />
            {errors.email && (
              <p className="formError">{errors.email.message}</p>
            )}
            <FormControlLabel
              control={
                <Switch
                  onChange={handleCheck}
                  name="changingPassword"
                  color="primary"
                />
              }
              label="Passwort ändern?"
            />
            {state.changingPassword && (
              <>
                <TextField
                  name="password"
                  margin="dense"
                  label="Passwort"
                  type="password"
                  fullWidth
                  inputRef={register({
                    required: {
                      value: true,
                      message: 'Bitte Passwort eingeben!'
                    }
                  })}
                />
                {errors.password && (
                  <p className="formError">{errors.password.message}</p>
                )}
                <TextField
                  name="password2"
                  margin="dense"
                  label="Passwort Wiederholung"
                  type="password"
                  fullWidth
                  inputRef={register({
                    required: {
                      value: true,
                      message: 'Bitte Passwort wiederholen!'
                    },
                    validate: (value) =>
                      value === watch('password') ||
                      'Passwörter stimmen nicht überein!'
                  })}
                />
                {errors.password2 && (
                  <p className="formError">{errors.password2.message}</p>
                )}
              </>
            )}

            <Button
              variant="outlined"
              fullWidth
              type="submit"
              style={{
                marginTop: '10%',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
              id="user_edit_save"
            >
              Benutzerdaten speichern!
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setState({ ...state, editing: false });
              }}
              style={{
                marginTop: '10%',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
              id="user_edit_cancel"
            >
              Abbrechen
            </Button>
          </form>
          <FormControlLabel
            style={{ marginTop: '10%', color: 'red' }}
            control={
              <Switch
                onChange={handleCheck}
                name="deleteUser"
                color="primary"
              />
            }
            label="BENUTZER UND ALLE BENUTZERDATEN LÖSCHEN?!"
          />
          {state.deleteUser && (
            <>
              <p className="formError" style={{ fontSize: '1.5rem' }}>
                DER BENUTZER UND ALLE BENUTZERDATEN WERDEN UNWIEDERRUFLICH
                GELÖSCHT!!
              </p>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  onDeleteClick(state.selectedUser);
                }}
                style={{
                  marginTop: '10%',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
                id="user_edit_cancel"
              >
                BENUTZERDATEN LÖSCHEN
              </Button>
            </>
          )}
        </FormWrapper>
      )}
    </MainStyleWrapper>
  );
};

export default ChangeUser;
