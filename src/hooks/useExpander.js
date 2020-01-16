import {
  EditorState,
  Modifier,
  SelectionState,
  convertFromRaw
} from "draft-js";

export default function useExpander() {
  // GET THE CURRENT/SELECTED TEXT
  const getTextSelection = editorState => {
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

    const blockDelimiter = "/n";
    var startKey = selection.getStartKey();
    var endKey = selection.getEndKey();
    var blocks = contentState.getBlockMap();

    var lastWasEnd = false;
    var selectedBlock = blocks
      .skipUntil(function(block) {
        return block.getKey() === startKey;
      })
      .takeUntil(function(block) {
        var result = lastWasEnd;

        if (block.getKey() === endKey) {
          lastWasEnd = true;
        }

        return result;
      });
    return selectedBlock
      .map(function(block) {
        var key = block.getKey();
        var text = block.getText();

        var start = 0;
        var end = text.length;

        if (key === startKey) {
          start = selection.getStartOffset();
        }
        if (key === endKey) {
          end = selection.getEndOffset();
        }

        text = text.slice(start, end);
        return text;
      })
      .join(blockDelimiter);
  };

  // CHECK IF CURRENT TEXT === EXPANDER-ITEM AND UPDATE EDITOR WITH updateEditorStateExpander
  const checkExpander = (editorState, setEditorState, expanderUserData) => {
    const userEditorInput = getTextSelection(editorState);
    const selectionArray = userEditorInput.split(" ");
    const selectionText = selectionArray.slice(-2, -1)[0];

    if (expanderUserData) {
      let matchData = expanderUserData.find(val => {
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
          "change-block-data"
        )
      );
    }
  };

  return [checkExpander];
}
