import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainLogo from "../../images/styled_images/MainLogo";
import Message from "../layout/Message";
// import useUpdater from "../../hooks/useUpdater";

const LandingMain = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingSub = styled.div`
  font-size: 3rem;
  letter-spacing: 1rem;
  margin: 3rem;

  // phone
  @media (max-width: 600px) {
    font-size: 6rem;
    letter-spacing: 1rem;
  }
  // tablet portrait
  @media (max-width: 900px) {
  }
  // tablet landscape
  @media (max-width: 1200px) {
  }
  // desktop
  @media (max-width: 1800px) {
  }
  // >1800px = wide screen
`;

const Version = styled.div`
  font-size: 2rem;
  letter-spacing: 1rem;
  margin: 3rem;

  // phone
  @media (max-width: 600px) {
    font-size: 6rem;
    letter-spacing: 1rem;
  }
  // tablet portrait
  @media (max-width: 900px) {
  }
  // tablet landscape
  @media (max-width: 1200px) {
  }
  // desktop
  @media (max-width: 1800px) {
  }
  // >1800px = wide screen
`;

const Landing = () => {
  const [state, setState] = useState({
    notification: false,
    checkUpdate: false,
    updateAvailable: null,
    downloaded: false,
    message: "",
    version: ""
  });

  if (state.checkUpdate === false && state.updateAvailable === null) {
    window.ipcRenderer.on("update_available", () => {
      console.log("update available");
      window.ipcRenderer.removeAllListeners("update_available");
      setState({
        ...state,
        notification: true,
        checkUpdate: true,
        updateAvailable: true,
        message:
          "Es steht ein neues Update zur Verfügung. Es wird jetzt herunter geladen..."
      });
    });

    window.ipcRenderer.on("update_not_available", () => {
      console.log("update not available");
      window.ipcRenderer.removeAllListeners("update-not-available");
      setState({
        ...state,
        notification: true,
        checkUpdate: true,
        updateAvailable: false,
        message: "Es steht kein neues Update zur Verfügung."
      });
    });
  }

  if (state.updateAvailable === true) {
    window.ipcRenderer.on("update_downloaded", () => {
      console.log("update downloaded");
      window.ipcRenderer.removeAllListeners("update_downloaded");
      setState({
        ...state,
        downloaded: true,
        message:
          "Update erfolgreich geladen. Die Installation erfolg nach dem Neustart. Jetzt neu starten?"
      });
    });
  }

  const closeNotification = () => {
    setState({
      ...state,
      notification: false
    });
  };

  const restartApp = () => {
    setState({
      ...state,
      notification: false,
      checkUpdate: false,
      updateAvailable: null,
      downloaded: false,
      message: ""
    });
    window.ipcRenderer.send("restart_app");
  };

  useEffect(() => {
    window.ipcRenderer.send("app_version");
    window.ipcRenderer.on("app_version", (event, arg) => {
      window.ipcRenderer.removeAllListeners("app_version");
      setState({ ...state, version: `Version ${arg.version}` });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.version]);

  console.log(state);

  return (
    <LandingMain id="Start" data-testid="LandingComponent">
      <div className="navChange">
        <MainLogo />
      </div>
      <LandingSub className="navChange">Standards der Radiologie</LandingSub>
      <Version className="navChange">{state.version}</Version>
      {state.notification && (
        <Message
          message={state.message}
          downloaded={state.downloaded}
          closeNotification={closeNotification}
          restartApp={restartApp}
        />
      )}
    </LandingMain>
  );
};

export default Landing;
