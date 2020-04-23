import { useContext } from "react";
import { EditorState, Modifier, SelectionState } from "draft-js";
// import CardsContext from "../components/context/cards/cardsContext";

export default function useCards() {
  // const { cardsUserData } = useContext(CardsContext);

  const getKeywordArray = (cardsUserData) => {
    const finalArray = [];
    if (cardsUserData) {
      cardsUserData.forEach((element) => {
        const elementId = element._id;
        const keywordsArray = element.keywords.split(" ");

        keywordsArray.forEach((element) => {
          const keyObject = {
            keyword: element,
            keyId: elementId,
          };
          finalArray.push(keyObject);
        });
      });
      return finalArray;
    }
    return null;
  };

  const findCards = (contentBlock, cardsUserData, callback) => {
    const keywordArray = getKeywordArray(cardsUserData);
    const text = contentBlock.getText();

    if (keywordArray) {
      const match = keywordArray.map((keyword) => {
        let matchArr, start;
        var regex = `\\b${keyword.keyword}\\b`;
        var keywordRegex = new RegExp(regex, "g");
        while ((matchArr = keywordRegex.exec(text)) !== null) {
          start = matchArr.index;
          const selectionState = new SelectionState({
            focusKey: contentBlock.getKey(),
            focusOffset: start + matchArr[0].length,
            anchorKey: contentBlock.getKey(),
            anchorOffset: start,
            isBackward: false,
          });
          callback(start, start + matchArr[0].length);
        }
      });
      return match;
    }
  };

  const getEntityAtSelection = (editorState) => {
    const selectionState = editorState.getSelection();
    const selectionKey = selectionState.getStartKey();
    const contentstate = editorState.getCurrentContent();

    // The block in which the selection starts
    const block = contentstate.getBlockForKey(selectionKey);

    // Entity key at the start selection
    const entityKey = block.getEntityAt(selectionState.getStartOffset());
    if (entityKey) {
      // The actual entity instance
      const entityInstance = contentstate.getEntity(entityKey);
      const entityInfo = {
        type: entityInstance.getType(),
        mutability: entityInstance.getMutability(),
        data: entityInstance.getData(),
      };
      console.log(JSON.stringify(entityInfo, null, 4));
    } else {
      console.log("No entity present at current selection!");
    }
  };

  return { findCards, getEntityAtSelection };
}
