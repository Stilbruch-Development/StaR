import EditorContext from './editorContext';
import React from 'react';
import useEditorState from './useEditorState';

const EditorState = (props) => {
  const [editorState, setEditorState] = useEditorState();
  return (
    <EditorContext.Provider
      value={{
        editorState,
        setEditorState
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export default EditorState;
