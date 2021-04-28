export default function useExternalLink() {
  const goToExternalLink = (link) => {
    window.electron.openLink(link);
  };

  return [goToExternalLink];
}
