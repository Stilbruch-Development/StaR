export default function useExternalLink() {
  const goToExternalLink = link => {
    window.ipcRenderer.send("open_external_link", link);
  };

  return [goToExternalLink];
}
