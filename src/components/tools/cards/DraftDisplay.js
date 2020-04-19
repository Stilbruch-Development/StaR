import React, { useState, useEffect, useContext } from "react";
import CardsContext from "../../context/cards/cardsContext";

import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";

const MainStyleWrapper = styled.div`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 3rem;
  font-size: 1.5rem;
`;

const Draft = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { selectedCardsItem } = useContext(CardsContext);

  useEffect(() => {
    if (selectedCardsItem !== null && selectedCardsItem !== undefined) {
      const convertedItem = convertFromRaw(selectedCardsItem.rawEditorState);
      setEditorState(
        EditorState.push(editorState, convertedItem, "insert-characters")
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCardsItem]);

  return (
    <MainStyleWrapper>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        readOnly={true}
      />
      <div>
        <h1>Schlagworte:</h1>
        <p>{selectedCardsItem.keywords}</p>
      </div>
      <div>
        <h1>Link:</h1>
        <p>{selectedCardsItem.url}</p>
      </div>
    </MainStyleWrapper>
  );
};

export default Draft;
