import { EditorState, Modifier } from 'draft-js';

export default function useStandards() {
  const setList = (editorState, setEditorState, listData) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const report = Modifier.insertText(contentState, selectionState, listData);

    setEditorState(EditorState.push(editorState, report, 'insert-characters'));
  };
  return [setList];
}
