import { useContext } from "react";
import AlertContext from "../components/context/alert/alertContext";

export default function useAutoUpdater() {
  const {
    setAlertMessage,
    setAlertButton,
    setAlertOnClick,
    removeAlert
  } = useContext(AlertContext);

  const autoUpdater = () => {
    window.ipcRenderer.on("update_available", () => {
      window.ipcRenderer.removeAllListeners("update_available");
      setAlertMessage(
        "Es steht ein neues Update zur Verfügung. Es wird jetzt herunter geladen..."
      );
    });

    window.ipcRenderer.on("update_not_available", () => {
      window.ipcRenderer.removeAllListeners("update-not-available");
      setAlertMessage("Es steht kein neues Update zur Verfügung.");
    });

    const restartApp = () => {
      removeAlert();
      window.ipcRenderer.send("restart_app");
    };

    window.ipcRenderer.on("update_downloaded", () => {
      window.ipcRenderer.removeAllListeners("update_downloaded");
      setAlertMessage(
        "Update erfolgreich geladen. Die Installation erfolg nach dem Neustart. Jetzt neu starten?"
      );
      setAlertButton("Neustart");
      setAlertOnClick(restartApp);
    });
  };

  return [autoUpdater];
}
