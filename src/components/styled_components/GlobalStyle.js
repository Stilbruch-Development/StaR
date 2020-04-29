import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html, body {
    --main-bg-color: rgb(220, 220, 220);
    --theme-color: rgba(0, 80, 120, 0.8);
    --editor-bg-color: white;
    --button-color-primary: rgb(63,81,181);
    --button-border: 1px solid rgba(63, 81, 181, 0.5);
    background-color: var(--main-bg-color);
    font-family: "Play", Arial;
    color: black;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 1.2vw;
    z-index: -1;

    .MuiButton-root {
      font-family: unset;
    }
  }

  //hides all scrollbars
  .displayNone,
  ::-webkit-scrollbar {
    display: none !important;
  }

  hr {
    border: 0;
    margin: 1rem 0 0 0;
    height: 2px;
  }

  .Dialog {
    .MuiDialog-paper {
      max-width: unset;
      width: 80%;
    }
  }

  // phone
  @media (max-width: 600px) {
    html, body {

    }
  }
  // tablet portrait
  @media (max-width: 900px) {
  }
  // tablet landscape
  @media (max-width: 1200px) {
  }
  // desktop
  @media (max-width: 1800px) {
  }
  // >1800px = wide screen
`;
export default GlobalStyle;
