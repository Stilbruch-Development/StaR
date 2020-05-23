import { useContext } from "react";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import AlertContext from "../components/context/alert/alertContext";
import AuthContext from "../components/context/auth/authContext";

export default function useDraftEditor() {
  const { setAlertState, removeAlert } = useContext(AlertContext);
  const { user } = useContext(AuthContext);

  const setEditorEmpty = (editorState, setEditorState) => {
    setEditorState(
      EditorState.push(editorState, ContentState.createFromText(""))
    );
  };

  const copyEditorToClipboard = (editorState) => {
    const content = editorState.getCurrentContent().getPlainText("\u0001");
    window.ipcRenderer.send("copy_to_clipboard", content);
    setAlertState("message", "Inhalt zur Zwischenablage kopiert!");
    setAlertState("color", "rgba(191, 255, 184, 0.8)");
    removeAlert();
  };

  const saveEditorUserIndependent = (editorState) => {
    if (user) {
      const contentState = editorState.getCurrentContent();
      var rawContentState = convertToRaw(contentState);
      var storageItem = { rawContentState: rawContentState, userId: user._id };
      localStorage.setItem("editorState_user", JSON.stringify(storageItem));
      setAlertState("message", "Inhalt im Kurzspeicher gespeichert.");
      setAlertState("color", "rgba(191, 255, 184, 0.8)");
      removeAlert();
    }
  };

  const deleteLokalstore = () => {
    localStorage.removeItem("editorState");
    localStorage.removeItem("editorState_user");
    setAlertState("message", "Lokaler Speicher gelöscht.");
    setAlertState("color", "rgba(191, 255, 184, 0.8)");
    removeAlert();
  };

  const loadFromLokalStore = (editorState, setEditorState, decorator) => {
    const getlocalStorage = JSON.parse(
      localStorage.getItem("editorState_user")
    );

    if (getlocalStorage && getlocalStorage.userId === user._id) {
      const newContentState = convertFromRaw(getlocalStorage.rawContentState);

      setEditorState(
        EditorState.push(editorState, newContentState, "change-block-data")
      );
    } else {
      setAlertState("message", "Leerer lokaler Speicher. Laden nicht möglich.");
      setAlertState("color", "rgba(255, 184, 191, 0.8)");
      removeAlert();
    }
  };

  return {
    setEditorEmpty,
    copyEditorToClipboard,
    saveEditorUserIndependent,
    deleteLokalstore,
    loadFromLokalStore,
  };
}
