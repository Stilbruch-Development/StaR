import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components/macro';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import bcrypt from 'bcryptjs';
import AuthContext from '../context/auth/authContext';

const MainStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 3rem;
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
`;

const DisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  font-size: 1.5rem;
  min-height: 50%;
  margin-top: 3%;
  font-weight: normal;
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

const User = () => {
  const authContext = useContext(AuthContext);

  const { user, devTools, update } = authContext;

  const { register, handleSubmit, watch, errors } = useForm();

  const [localState, setLocalState] = useState({
    editing: false,
    changingPassword: false
  });

  const onClickChange = () => setLocalState({ ...localState, editing: true });

  const onSubmit = async (input) => {
    const data = input;
    delete data.password2;
    const userData = {
      ...user,
      ...data
    };
    const salt = await bcrypt.genSalt(10);

    if (data.password) {
      userData.password = await bcrypt.hash(data.password, salt);
    }

    update(userData);
    setLocalState({ ...localState, editing: false });
  };

  const handleCheck = (e) => {
    setLocalState({ ...localState, [e.target.name]: e.target.checked });
  };

  let emailInputRef;
  let passwordInputRef;

  if (devTools) {
    emailInputRef = register({
      required: {
        value: true,
        message: 'Bitte eine gültige Email-Adresse angeben!'
      }
    });
    passwordInputRef = register({
      required: {
        value: true,
        message: 'Bitte Passwort eingeben!'
      }
    });
  } else {
    emailInputRef = register({
      required: {
        value: true,
        message: 'Bitte eine gültige Email-Adresse angeben!'
      },
      pattern: {
        value: /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i,
        message: 'Bitte eine gültige Email-Adresse angeben!'
      }
    });
    passwordInputRef = register({
      required: {
        value: true,
        message:
          'Bitte Passwort aus mindestens 4 und höchstens 20 Zeichen wählen. Es muss mindestens einen Klein- und einen Großbuchstaben sowie eine Ziffer enthalten!'
      },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/i,
        message:
          'Passwort aus mindestens 4 und höchstens 20 Zeichen wählen, das mindestens einen Klein- und einen Großbuchstaben sowie eine Ziffer enthält!'
      }
    });
  }

  return (
    <MainStyleWrapper>
      <AlignWrapper>
        {localState.editing ? (
          <HeadingWrapper>Benutzerdaten ändern</HeadingWrapper>
        ) : (
          <HeadingWrapper>Benutzerdaten</HeadingWrapper>
        )}
        <Divider />
      </AlignWrapper>
      {localState.editing ? (
        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              label="Vorname"
              type="text"
              name="first_name"
              defaultValue={user.first_name}
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
              defaultValue={user.last_name}
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
              defaultValue={user.email}
              margin="dense"
              label="Email"
              fullWidth
              inputRef={emailInputRef}
            />
            {errors.email && (
              <p className="formError">{errors.email.message}</p>
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={localState.changingPassword}
                  onChange={handleCheck}
                  name="changingPassword"
                  color="primary"
                />
              }
              label="Passwort ändern?"
            />
            {localState.changingPassword && (
              <>
                <TextField
                  name="password"
                  margin="dense"
                  label="Passwort"
                  type="password"
                  fullWidth
                  inputRef={passwordInputRef}
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
                setLocalState({ ...localState, editing: false });
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
        </FormWrapper>
      ) : (
        <DisplayWrapper>
          <div style={{ padding: '1rem' }}>
            Vorname:
            <p
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                display: 'inline'
              }}
            >
              {` ${user.first_name}`}
            </p>
          </div>
          <div style={{ padding: '1rem' }}>
            Nachname:
            <p
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                display: 'inline'
              }}
            >
              {` ${user.last_name}`}
            </p>
          </div>
          <div style={{ padding: '1rem' }}>
            Email:
            <p
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                display: 'inline'
              }}
            >
              {` ${user.email}`}
            </p>
          </div>
          <Button
            style={{ marginTop: '20%', fontSize: '1.5rem', cursor: 'pointer' }}
            variant="outlined"
            fullWidth
            onClick={onClickChange}
            color="primary"
          >
            Benutzerdaten ändern!
          </Button>
        </DisplayWrapper>
      )}
    </MainStyleWrapper>
  );
};

export default User;
