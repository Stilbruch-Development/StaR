import React, { useContext } from 'react';
import useCards from './useCards';
import CardsContext from '../components/context/cards/cardsContext';
import NavContext from '../components/context/navigation/navContext';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';

function useDecorator() {
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

  return [editorStateLocalStore];
}
export default useDecorator;
