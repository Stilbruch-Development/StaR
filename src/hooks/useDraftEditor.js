import { useContext } from "react";
import { EditorState, ContentState } from "draft-js";
import AlertContext from "../components/context/alert/alertContext";

export default function useDraftEditor() {
  const { setAlertMessage } = useContext(AlertContext);

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

  return [setEditorEmpty, copyEditorToClipboard];
}
