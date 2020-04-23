import React, { useState, useContext, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
} from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";
import EditorToolBar from "./EditorToolBar";
import blockRenderMap from "./blocktypes/TextAlign";
import ExpanderContext from "../context/expander/expanderContext";
import useExpander from "../../hooks/useExpander";
import LungenembolieContext from "../context/lists/lungenembolie/lungenembolieContext";
import useLists from "../../hooks/useLists";
import useCards from "../../hooks/useCards";
import CardsContext from "../context/cards/cardsContext";

const MainStyleWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;

const EditorStyleWrapper = styled.div`
  background-color: white;
  border: 1px solid black;
  padding: 3rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  min-height: 100%;
  line-height: 2rem;
`;

const ToolBarSyleWrapper = styled.div`
  background-color: white;
  border: 1px solid black;
`;

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const Draft = () => {
  const getLocalStorage = JSON.parse(localStorage.getItem("editorState"));
  const { cardsUserData } = useContext(CardsContext);

  const { findCards, getEntityAtSelection } = useCards();

  const CardsSpan = (props) => {
    return (
      <span {...props} style={{ backgroundColor: "red" }}>
        {props.children}
      </span>
    );
  };

  const cardsStrategy = (contentBlock, callback, contentState) => {
    findCards(contentBlock, cardsUserData, callback);
  };

  console.log();

  const compositeDecorator = new CompositeDecorator([
    {
      strategy: cardsStrategy,
      component: CardsSpan,
      props: { hallo: "hallo" },
    },
  ]);

  const editorStateLocalStore = () => {
    if (getLocalStorage !== null) {
      return EditorState.createWithContent(
        convertFromRaw(getLocalStorage),
        compositeDecorator
      );
    }

    return EditorState.createEmpty(compositeDecorator);
  };

  const [editorState, setEditorState] = useState(editorStateLocalStore);

  const { expanderUserData } = useContext(ExpanderContext);

  const [checkExpander] = useExpander();

  const [setList] = useLists();

  const { LungenembolieState, setLungenembolieState } = useContext(
    LungenembolieContext
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
    checkExpander(editorState, setEditorState, expanderUserData);
    const contentState = editorState.getCurrentContent();
    var rawEditorState = convertToRaw(contentState);
    localStorage.setItem("editorState", JSON.stringify(rawEditorState));
    // eslint-disable-next-line
  }, [editorState, expanderUserData]);

  useEffect(() => {
    // getEntityAtSelection(editorState);
    // eslint-disable-next-line
  }, [editorState]);

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
