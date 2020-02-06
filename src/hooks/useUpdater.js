import { useState } from "react";
export default initialVal => {
  const [value, setValue] = useState(initialVal);

  const listenForUpdate = () => {
    !value.checkUpdate &&
      window.ipcRenderer.on("update_available", () => {
        window.ipcRenderer.removeAllListeners("update_available");
        setValue({
          ...value,
          notification: true,
          checkUpdate: true,
          downloaded: false,
          message:
            "Es steht ein neues Update zur Verfügung. Es wird jetzt herunter geladen..."
        });
      });

    window.ipcRenderer.on("update-not-available", () => {
      window.ipcRenderer.removeAllListeners("update-not-available");
      setValue({
        ...value,
        notification: true,
        checkUpdate: true,
        downloaded: true,
        message: "Es steht kein Update zur Verfügung."
      });
    });
  };

  const listenForUpdateDownloaded = () => {
    window.ipcRenderer.on("update_downloaded", () => {
      window.ipcRenderer.removeAllListeners("update_downloaded");
      setValue({
        ...value,
        notification: true,
        update: true,
        downloaded: true,
        message:
          "Update erfolgreich geladen. Die Installation erfolg nach dem Neustart. Jetzt neu starten?"
      });
    });
  };
  return [value, listenForUpdate, listenForUpdateDownloaded];
};
