export default function useExternalLink() {
  const goToExternalLink = (link) => {
    window.ipcRenderer && window.ipcRenderer.send('open_external_link', link);
  };

  return [goToExternalLink];
}
