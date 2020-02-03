import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainLogo from "../../images/styled_images/MainLogo";
import Message from "../layout/Message";
import useUpdater from "../../hooks/useUpdater";

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
    downloaded: false,
    message: "",
    version: ""
  });

  const [valu, listenForUpdate, listenForUpdateDownloaded] = useUpdater(state);

  useEffect(() => {
    listenForUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.checkUpdate]);

  useEffect(() => {
    // state.checkUpdated && !state.downloaded && listenForUpdateDownloaded(state);
    listenForUpdateDownloaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.downloaded]);

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
