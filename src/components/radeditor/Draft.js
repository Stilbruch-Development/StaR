import React, { useState, useContext, useEffect } from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap
} from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";
import EditorToolBar from "./EditorToolBar";
import blockRenderMap from "./blocktypes/TextAlign";
import ExpanderContext from "../context/expander/expanderContext";
import useExpander from "../../hooks/useExpander";

const MainStyleWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;

const EditorStyleWrapper = styled.div`
  background-color: white;
  border: 1px solid black;
  padding: 3rem;
  font-size: 1.5rem;
  height: 50%;
`;

const ToolBarSyleWrapper = styled.div`
  background-color: white;
  border: 1px solid black;
`;

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const Draft = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { expanderUserData } = useContext(ExpanderContext);

  const [checkExpander] = useExpander();

  const _toggleBlockType = blockType => {
    const toggleBlock = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(toggleBlock);
  };

  const _toggleInlineStyle = inlineStyle => {
    const toggleInlineStyle = RichUtils.toggleInlineStyle(
      editorState,
      inlineStyle
    );
    setEditorState(toggleInlineStyle);
  };

  useEffect(() => {
    checkExpander(editorState, setEditorState, expanderUserData);
    // eslint-disable-next-line
  }, [editorState, expanderUserData]);

  return (
    <MainStyleWrapper>
      <ToolBarSyleWrapper>
        <EditorToolBar
          _toggleInlineStyle={_toggleInlineStyle}
          _toggleBlockType={_toggleBlockType}
        />
      </ToolBarSyleWrapper>
      <EditorStyleWrapper>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Starte deinen Befund"
          blockRenderMap={extendedBlockRenderMap}
        />
      </EditorStyleWrapper>
    </MainStyleWrapper>
  );
};

export default Draft;
