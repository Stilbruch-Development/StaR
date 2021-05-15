/* eslint-disable node/no-unpublished-require */
export default function useHandleException() {
  const handleException = () => {
    window.process &&
      window.process.on('uncaughtException', (error) => {
        const { app, dialog } = window.require('electron').remote;
        dialog.showMessageBoxSync({
          type: 'error',
          message:
            'Leider ist ein unerwarteter Fehler aufgetreten. StaR muss neu gestartet werden.',
          detail: `${error}`,
          title: 'Fehler'
        });
        app.relaunch();
        app.exit();
      });
  };

  return [handleException];
}
