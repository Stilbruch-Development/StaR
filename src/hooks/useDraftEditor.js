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
  const { setAlertMessage } = useContext(AlertContext);
  const { user } = useContext(AuthContext);

  const setEditorEmpty = (editorState, setEditorState) => {
    setEditorState(
      EditorState.push(editorState, ContentState.createFromText(""))
    );
  };

  const copyEditorToClipboard = (editorState) => {
    const content = editorState.getCurrentContent().getPlainText("\u0001");
    window.ipcRenderer.send("copy_to_clipboard", content);
    setAlertMessage("Inhalt zur Zwischenablage kopiert!");
  };

  const saveEditorUserIndependent = (editorState) => {
    if (user) {
      const contentState = editorState.getCurrentContent();
      var rawContentState = convertToRaw(contentState);
      var storageItem = { rawContentState: rawContentState, userId: user._id };
      localStorage.setItem("editorState_user", JSON.stringify(storageItem));
      setAlertMessage("Inhalt im Kurzspeicher gespeichert.");
    }
  };

  const deleteLokalstore = () => {
    localStorage.removeItem("editorState");
    localStorage.removeItem("editorState_user");
    setAlertMessage("Lokaler Speicher gelöscht.");
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
      setAlertMessage("Leerer lokaler Speicher. Laden nicht möglich.");
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
