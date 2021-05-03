import React, { useState, useEffect, useContext } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components/macro';
import CardsContext from '../../context/cards/cardsContext';
import EditorToolBar from './EditorToolBar';
import blockRenderMap from '../../editor/blocktypes/TextAlign';

const MainStyleWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const EditorStyleWrapper = styled.div`
  background-color: white;
  padding: 3rem;
  font-size: 1.5rem;
`;

const ToolBarSyleWrapper = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const Draft = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const contentState = editorState.getCurrentContent();
  const { selectedCardsItem, editorLocked } = useContext(CardsContext);

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
    if (selectedCardsItem !== null && selectedCardsItem !== undefined) {
      const convertedItem = convertFromRaw(selectedCardsItem.rawEditorState);
      setEditorState(
        EditorState.push(editorState, convertedItem, 'insert-characters')
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [selectedCardsItem]);

  useEffect(() => {
    const rawEditorState = convertToRaw(contentState);
    props.setCardsFormEditorState(rawEditorState);
  }, [contentState]);

  useEffect(() => {
    if (editorLocked === true) {
      setEditorState(EditorState.createEmpty());
    }
  }, [editorLocked]);

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
          blockRenderMap={extendedBlockRenderMap}
          // readOnly={editorLocked}
          placeholder="Bitte klicke auf ein Karten-Element."
        />
      </EditorStyleWrapper>
    </MainStyleWrapper>
  );
};

export default Draft;
