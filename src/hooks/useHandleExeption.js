export default function useHandleExeption() {
    const handleExeption = () => {
        window.process &&
        window.process.on('uncaughtException', function (error) {
            const {app, dialog} = window.require("electron").remote;
            dialog.showMessageBoxSync({type: 'error', message: 'Leider ist ein unerwarteter Fehler aufgetreten. StaR muss neu gestartet werden.', detail: `${error}`, title: "Fehler"});
            app.relaunch();
            app.exit();
        });
    };

    return [handleExeption];
  }