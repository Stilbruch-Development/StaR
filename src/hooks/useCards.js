import React, { useContext } from 'react';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';
import CardsContext from '../components/context/cards/cardsContext';
import NavContext from '../components/context/navigation/navContext';

export default function useCards() {
  const getLocalStorage = JSON.parse(localStorage.getItem('editorState'));

  const { cardsUserData } = useContext(CardsContext);

  const getKeywordArray = (userData) => {
    const finalArray = [];
    if (userData) {
      userData.forEach((element) => {
        if (element.keywords.length !== 0) {
          const elementId = element._id;
          let keywordsArray;
          if (typeof element.keywords === 'string') {
            keywordsArray = element.keywords.split(' ');
            keywordsArray.forEach((e) => {
              const keyObject = {
                keyword: e,
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

  const findCardsDecorators = (contentBlock, user_data, callback) => {
    const keywordArray = getKeywordArray(user_data);
    const text = contentBlock.getText();

    if (keywordArray) {
      const match = keywordArray.map((keyword) => {
        let start;
        const regex = `\\b${keyword.keyword}\\b`;
        const keywordRegex = new RegExp(regex, 'g');
        const matchArr = keywordRegex.exec(text);
        while (matchArr !== null) {
          start = matchArr.index;
          callback(start, start + matchArr[0].length);
        }
        return null;
      });
      return match;
    }
    return null;
  };

  const CardsSpan = (props) => {
    const { setNavState } = useContext(NavContext);
    const { setCardsState } = useContext(CardsContext);

    const { cardsData, decoratedText, children } = props;

    const matchElement = cardsData.filter((element) => {
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
      <button
        style={{
          fontStyle: 'italic',
          color: 'rgba(0, 80, 120, 1)',
          cursor: 'pointer'
        }}
        onClick={handleOnClick}
        type="button"
      >
        {children}
      </button>
    );
  };

  const cardsStrategy = (contentBlock, callback) => {
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
