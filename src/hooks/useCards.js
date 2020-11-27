import React, { useContext } from 'react';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';
import CardsContext from '../components/context/cards/cardsContext';
import NavContext from '../components/context/navigation/navContext';

export default function useCards() {
  const getLocalStorage = JSON.parse(localStorage.getItem('editorState'));

  const { cardsUserData } = useContext(CardsContext);

  const getKeywordArray = (cardsUserData) => {
    const finalArray = [];
    if (cardsUserData) {
      cardsUserData.forEach((element) => {
        if (element.keywords.length !== 0) {
          const elementId = element._id;
          let keywordsArray;
          if (typeof element.keywords === 'string') {
            keywordsArray = element.keywords.split(' ');
            keywordsArray.forEach((element) => {
              const keyObject = {
                keyword: element,
                keyId: elementId
              };
              finalArray.push(keyObject);
            });
          }
        }
      });
      return finalArray;
    }
    return null;
  };

  const findCardsDecorators = (contentBlock, cardsUserData, callback) => {
    const keywordArray = getKeywordArray(cardsUserData);
    const text = contentBlock.getText();

    if (keywordArray) {
      const match = keywordArray.map((keyword) => {
        let matchArr, start;
        var regex = `\\b${keyword.keyword}\\b`;
        var keywordRegex = new RegExp(regex, 'g');
        while ((matchArr = keywordRegex.exec(text)) !== null) {
          start = matchArr.index;
          callback(start, start + matchArr[0].length);
        }
        return null;
      });
      return match;
    }
  };

  const CardsSpan = (props) => {
    const { setNavState } = useContext(NavContext);
    const { setCardsState } = useContext(CardsContext);

    const { cardsUserData, decoratedText } = props;

    const matchElement = cardsUserData.filter((element) => {
      if (typeof element.keywords === 'string') {
        const keywordsArray = element.keywords.split(' ');
        return keywordsArray.includes(decoratedText) && element;
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
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <span
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

  const editorStateWithDecorator = () => {
    if (getLocalStorage !== null) {
      return EditorState.createWithContent(
        convertFromRaw(getLocalStorage),
        compositeDecorator
      );
    }

    return EditorState.createEmpty(compositeDecorator);
  };

  return [editorStateWithDecorator];
}
