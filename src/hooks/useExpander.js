import {
  EditorState,
  Modifier,
  SelectionState,
  convertFromRaw
} from 'draft-js';

export default function useExpander() {
  // GET THE CURRENT/SELECTED TEXT
  const getTextSelection = (editorState) => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const contentState = editorState.getCurrentContent();
    const end = selectionState.getEndOffset();

    const selection = new SelectionState({
      focusKey: anchorKey,
      focusOffset: 0,
      anchorKey: anchorKey,
      anchorOffset: end,
      isBackward: true,
      hasFocus: true
    });

    const blockDelimiter = '/n';
    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();
    const blocks = contentState.getBlockMap();

    let lastWasEnd = false;
    const selectedBlock = blocks
      .skipUntil((block) => block.getKey() === startKey)
      .takeUntil((block) => {
        const result = lastWasEnd;

        if (block.getKey() === endKey) {
          lastWasEnd = true;
        }

        return result;
      });
    return selectedBlock
      .map((block) => {
        const key = block.getKey();
        let text = block.getText();

        let start = 0;
        let textEnd = text.length;

        if (key === startKey) {
          start = selection.getStartOffset();
        }
        if (key === endKey) {
          textEnd = selection.getEndOffset();
        }

        text = text.slice(start, textEnd);
        return text;
      })
      .join(blockDelimiter);
  };

  // UPDATE THE EDITOR WITH matchData.long
  const updateEditorStateExpander = (
    matchData,
    editorState,
    setEditorState
  ) => {
    if (matchData) {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const shortLength = matchData.short.length;

      const originalMatchData = convertFromRaw({
        ...matchData.long,
        entityMap: {}
      });

      const blockLength = selectionState.getFocusOffset();

      const focus = blockLength - shortLength;

      const blockKey = contentState.getLastBlock().getKey();

      const deleteRange = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: blockLength,
        focusKey: blockKey,
        focusOffset: focus - 1,
        isBackward: true,
        hasFocus: true
      });

      const insertLongContentState = Modifier.replaceWithFragment(
        contentState,
        deleteRange,
        originalMatchData.blockMap
      );

      setEditorState(
        EditorState.push(
          editorState,
          insertLongContentState,
          'change-block-data'
        )
      );
    }
  };

  // CHECK IF CURRENT TEXT === EXPANDER-ITEM AND UPDATE EDITOR WITH updateEditorStateExpander
  const checkExpander = (editorState, setEditorState, expanderUserData) => {
    const userEditorInput = getTextSelection(editorState);
    const selectionArray = userEditorInput.split(' ');
    const selectionText = selectionArray.slice(-2, -1)[0];

    if (expanderUserData) {
      const matchData = expanderUserData.find((val) => {
        if (val.short && val.long) {
          return val.short === selectionText;
        }
        return null;
      });

      if (matchData !== undefined && matchData !== null) {
        updateEditorStateExpander(matchData, editorState, setEditorState);
      }
    }
  };

  return [checkExpander];
}
