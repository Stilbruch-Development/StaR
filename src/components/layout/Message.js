import React, { useState } from "react";
import styled from "styled-components";

const Notefication = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 200px;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Message = () => {
  const [state, setState] = useState({
    notification: false,
    update: false,
    downloaded: false,
    message: ""
  });

  window.ipcRenderer.on("update_available", () => {
    window.ipcRenderer.removeAllListeners("update_available");
    setState({
      notification: true,
      update: true,
      downloaded: false,
      message:
        "Es steht ein neues Update zur Verfügung. Es wird jetzt herunter geladen..."
    });
  });

  window.ipcRenderer.on("update_downloaded", () => {
    window.ipcRenderer.removeAllListeners("update_downloaded");
    setState({
      notification: true,
      update: true,
      downloaded: true,
      message:
        "Update erfolgreich geladen. Die Installation erfolg nach dem Neustart. Jetzt neu starten?"
    });
  });

  const closeNotification = () => {
    setState({
      notification: false
    });
  };

  const restartApp = () => {
    setState({
      notification: false,
      update: false,
      downloaded: false,
      message: ""
    });
    window.ipcRenderer.send("restart_app");
  };
  return (
    <>
      {state.notefication && (
        <Notefication>
          <p>{state.message}</p>

          <button onClick={closeNotification}>Close</button>
          {state.downloaded && <button onClick={restartApp}>Restart</button>}
        </Notefication>
      )}
    </>
  );
};

export default Message;
