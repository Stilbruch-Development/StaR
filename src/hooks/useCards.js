export default function useCards() {
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

  const findCardsDecorators = (contentBlock, cardsUserData, callback) => {
    const keywordArray = getKeywordArray(cardsUserData);
    const text = contentBlock.getText();

    if (keywordArray) {
      const match = keywordArray.map((keyword) => {
        let matchArr, start;
        var regex = `\\b${keyword.keyword}\\b`;
        var keywordRegex = new RegExp(regex, "g");
        while ((matchArr = keywordRegex.exec(text)) !== null) {
          start = matchArr.index;
          callback(start, start + matchArr[0].length);
        }
        return null;
      });
      return match;
    }
  };

  return {
    findCardsDecorators,
  };
}
