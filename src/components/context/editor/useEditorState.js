import React, { useState } from 'react';
import useDecorator from '../../../hooks/useDecorator';

function useEditorState() {
  const [editorStateLocalStore] = useDecorator();

  const [editorState, setEditorState] = useState(editorStateLocalStore);

  return [editorState, setEditorState];
}
export default useEditorState;
