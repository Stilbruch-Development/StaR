import React, { useState, useContext, useEffect } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';
import EditorToolBar from './EditorToolBar';
import blockRenderMap from './blocktypes/TextAlign';
import ExpanderContext from '../context/expander/expanderContext';
import useExpander from '../../hooks/useExpander';
import StandardContext from '../context/standard/standardContext';
import useStandards from '../../hooks/useStandards';
import useCards from '../../hooks/useCards';
import CardsContext from '../context/cards/cardsContext';
import NavContext from '../context/navigation/navContext';

const MainStyleWrapper = styled.div`
  width: 100%;
`;

const EditorStyleWrapper = styled.div`
  background-color: white;
  border: 1px solid black;
  padding: 3rem;
  font-size: 1.2rem;
  min-height: 60vh;
  line-height: 2rem;
`;

const ToolBarSyleWrapper = styled.div`
  background-color: white;
  border: 1px solid black;
`;

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const Draft = () => {
  const getLocalStorage = JSON.parse(localStorage.getItem('editorState'));

  //------ Editor Cards Implementation -----------------------------------------------------
  const { cardsUserData } = useContext(CardsContext);
  const { findCardsDecorators } = useCards();

  const CardsSpan = (props) => {
    const { setNavState } = useContext(NavContext);
    const { setCardsState } = useContext(CardsContext);

    var matchElement = props.cardsUserData.filter((element) => {
      if (typeof element.keywords === 'string') {
        const keywordsArray = element.keywords.split(' ');
        return keywordsArray.includes(props.decoratedText) && element;
      }
      return null;
    });

    const handleOnClick = () => {
      if (matchElement) {
        setCardsState('selectedCardsItem', matchElement[0]);
        setNavState('display', 'Cards');
        setNavState('rightSidebareOpen', true);
      }
    };
    return (
      <span
        {...props}
        style={{
          fontStyle: 'italic',
          color: 'rgba(0, 80, 120, 1)',
          cursor: 'pointer'
        }}
        onClick={handleOnClick}
      >
        {props.children}
      </span>
    );
  };

  const cardsStrategy = (contentBlock, callback, contentState) => {
    findCardsDecorators(contentBlock, cardsUserData, callback);
  };

  const compositeDecorator = new CompositeDecorator([
    {
      strategy: cardsStrategy,
      component: CardsSpan,
      props: { cardsUserData }
    }
  ]);

  //------ Set Up Editor -----------------------------------------------------

  const editorStateLocalStore = () => {
    if (getLocalStorage !== null) {
      return EditorState.createWithContent(
        convertFromRaw(getLocalStorage),
        compositeDecorator
      );
    }

    return EditorState.createEmpty(compositeDecorator);
  };

  //------ Context and Hooks-----------------------------------------------------
  const [editorState, setEditorState] = useState(editorStateLocalStore);
  const { expanderUserData } = useContext(ExpanderContext);
  const [checkExpander] = useExpander();
  const [setList] = useStandards();

  const {
    Covid19State,
    setCovid19State,
    PulmonaryEmbolismState,
    setPulmonaryEmbolismState
  } = useContext(StandardContext);

  //------ BlockType Style -----------------------------------------------------
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

  //------ useEffect -----------------------------------------------------
  useEffect(() => {
    checkExpander(editorState, setEditorState, expanderUserData);
    const contentState = editorState.getCurrentContent();
    var rawEditorState = convertToRaw(contentState);
    localStorage.setItem('editorState', JSON.stringify(rawEditorState));
    // eslint-disable-next-line
  }, [editorState, expanderUserData]);

  useEffect(() => {
    const { send, Gesamt } = PulmonaryEmbolismState;
    if (send === true) {
      setList(editorState, setEditorState, Gesamt);
      setPulmonaryEmbolismState({ ...PulmonaryEmbolismState, send: false });
    }
    // eslint-disable-next-line
  }, [PulmonaryEmbolismState.send]);

  useEffect(() => {
    const { send, Gesamt } = Covid19State;
    if (send === true) {
      setList(editorState, setEditorState, Gesamt);
      setCovid19State({
        ...Covid19State,
        Gesamt: '',
        send: false
      });
    }
    // eslint-disable-next-line
  }, [Covid19State.send]);

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
