import React, { useState, useEffect, useContext } from "react";
import ExpanderContext from "../../context/expander/expanderContext";

import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
} from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";
import EditorToolBar from "./EditorToolBar";
import blockRenderMap from "../../editor/blocktypes/TextAlign";

const MainStyleWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  margin: unset;
`;

const EditorStyleWrapper = styled.div`
  background-color: white;
  padding: 3rem;
  font-size: 1.5rem;
`;

const ToolBarSyleWrapper = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
`;

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const Draft = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const contentState = editorState.getCurrentContent();
  const { selectedExpanderItem, editorLocked, setExpanderEditor } = useContext(
    ExpanderContext
  );

  const _toggleBlockType = (blockType) => {
    const toggleBlock = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(toggleBlock);
  };

  const _toggleInlineStyle = (inlineStyle) => {
    const toggleInlineStyle = RichUtils.toggleInlineStyle(
      editorState,
      inlineStyle
    );
    setEditorState(toggleInlineStyle);
  };

  useEffect(() => {
    if (selectedExpanderItem !== null) {
      setEditorState(
        EditorState.push(editorState, selectedExpanderItem, "insert-characters")
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExpanderItem]);

  useEffect(() => {
    setExpanderEditor(contentState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentState]);

  useEffect(() => {
    if (editorLocked === true) {
      setEditorState(EditorState.createEmpty());
    }
  }, [editorLocked]);

  return (
    <MainStyleWrapper>
      {!editorLocked && (
        <ToolBarSyleWrapper>
          <EditorToolBar
            _toggleInlineStyle={_toggleInlineStyle}
            _toggleBlockType={_toggleBlockType}
          />
        </ToolBarSyleWrapper>
      )}
      <EditorStyleWrapper>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          blockRenderMap={extendedBlockRenderMap}
          readOnly={editorLocked}
          placeholder="Bitte klicke auf ein Expander-Element."
        />
      </EditorStyleWrapper>
    </MainStyleWrapper>
  );
};

export default Draft;
