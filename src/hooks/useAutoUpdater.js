import { useContext } from 'react';
import AlertContext from '../components/context/alert/alertContext';

export default function useAutoUpdater() {
  const { removeAlert, setAlert } = { ...useContext(AlertContext) };

  const autoUpdater = () => {
    if (window.ipcRenderer) {
      window.ipcRenderer.on('update_available', () => {
        window.ipcRenderer.removeAllListeners('update_available');
        setAlert(
          {
            item: 'message',
            value:
              'Es steht ein neues Update zur Verfügung. Bitte etwas Gedult, es wird jetzt herunter geladen...'
          },
          { item: 'color', value: 'rgba(244, 255, 184, 0.8)' }
        );
      });

      window.ipcRenderer.on('update_not_available', () => {
        window.ipcRenderer.removeAllListeners('update_not_available');
        console.log('Kein neues Update verfügbar.');
      });

      const restartApp = () => {
        removeAlert();
        window.ipcRenderer.send('restart_app');
      };

      window.ipcRenderer.on('update_downloaded', () => {
        window.ipcRenderer.removeAllListeners('update_downloaded');
        setAlert(
          {
            item: 'message',
            value:
              'Update erfolgreich geladen. Die Installation erfolg nach dem Neustart. Jetzt neu starten?'
          },
          { item: 'color', value: 'rgba(191, 255, 184, 0.8)' },
          { item: 'button', value: 'Neustart' },
          { item: 'onClickButton', value: restartApp }
        );
      });

      window.ipcRenderer.on('error', () => {
        window.ipcRenderer.removeAllListeners('error');
        setAlert({
          item: 'message',
          value: 'Es gab ein Problem mit dem automatischen Update!'
        });
      });
    }
  };

  return [autoUpdater];
}
