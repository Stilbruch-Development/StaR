import React, { useState, useEffect, useContext } from "react";
import CardsContext from "../../context/cards/cardsContext";
import useExternalLink from "../../../hooks/useExternalLink";
import AlertContext from "../../context/alert/alertContext";

import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";

const MainStyleWrapper = styled.div`
  margin: 0 1vw 1vw 1vw;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 1vw;
  font-size: 1.5rem;
`;

const DraftDisplay = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { selectedCardsItem } = useContext(CardsContext);
  const [goToExternalLink] = useExternalLink();
  const { setAlert } = useContext(AlertContext);

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

  const onClickLogo = (url) => {
    goToExternalLink(url);
  };
  window.ipcRenderer &&
    window.ipcRenderer.on("open_external_link_error", (event, msg) => {
      window.ipcRenderer.removeAllListeners("open_external_link_error");
      setAlert({
        item: "message",
        value: msg,
      });
      props.handleClose();
    });

  return selectedCardsItem ? (
    <MainStyleWrapper>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        readOnly={true}
        placeholder="Bitte klicke auf ein Cards-Element."
      />
      <div>
        <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
          Schlagworte:
        </p>
        <p>{selectedCardsItem.keywords}</p>
      </div>
      <div>
        <p style={{ textDecoration: "underline", fontWeight: "bold" }}>Link:</p>
        <p
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            onClickLogo(selectedCardsItem.url);
          }}
        >
          {selectedCardsItem.url}
        </p>
      </div>
    </MainStyleWrapper>
  ) : (
    <></>
  );
};

export default DraftDisplay;
