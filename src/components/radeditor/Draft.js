import React, { useState, useContext, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertFromRaw,
  convertToRaw
} from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";
import EditorToolBar from "./EditorToolBar";
import blockRenderMap from "./blocktypes/TextAlign";
import ExpanderContext from "../context/expander/expanderContext";
import useExpander from "../../hooks/useExpander";
import LungenembolieContext from "../context/lists/lungenembolie/lungenembolieContext";
import useLists from "../../hooks/useLists";

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
  const getLocalStorage = JSON.parse(localStorage.getItem("editorState"));

  const editorStateLocalStore = () => {
    if (getLocalStorage !== null) {
      return EditorState.createWithContent(convertFromRaw(getLocalStorage));
    }

    return EditorState.createEmpty();
  };

  const [editorState, setEditorState] = useState(editorStateLocalStore);

  const { expanderUserData } = useContext(ExpanderContext);

  const [checkExpander] = useExpander();

  const [setList] = useLists();

  const { LungenembolieState, setLungenembolieState } = useContext(
    LungenembolieContext
  );

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
    const contentState = editorState.getCurrentContent();
    var rawEditorState = convertToRaw(contentState);
    localStorage.setItem("editorState", JSON.stringify(rawEditorState));
    // eslint-disable-next-line
  }, [editorState, expanderUserData]);

  useEffect(() => {
    const { send } = LungenembolieState;
    if (send === true) {
      setList(editorState, setEditorState, LungenembolieState.Gesamt);
      setLungenembolieState({ ...LungenembolieState, send: false });
    }
    // eslint-disable-next-line
  }, [LungenembolieState.send]);

  return (
    <MainStyleWrapper>
      <ToolBarSyleWrapper>
        <EditorToolBar
          _toggleInlineStyle={_toggleInlineStyle}
          _toggleBlockType={_toggleBlockType}
          editorState={editorState}
          setEditorState={setEditorState}
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
