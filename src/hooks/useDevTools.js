import { useContext } from "react";
import AuthContext from "../components/context/auth/authContext";

export default function useDevTools() {
  const { devTools } = useContext(AuthContext);

  const toggleDevTools = () => {
    window.ipcRenderer.send("toggle-dev-tools", devTools);
  };

  return [toggleDevTools];
}
