import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

/*  Play font */
  @font-face {
    font-family: 'Play';
    font-style: normal;
    font-weight: 400;
    src: local('Play'), local('Play-Regular'),
        url(${require("../../fonts/Play/Play-Regular.ttf")}) format('truetype')
  }
  @font-face {
    font-family: 'Play';
    font-style: bold;
    font-weight: 700;
    src: local('Play'), local('Play-Bold'),
        url(${require("../../fonts/Play/Play-Bold.ttf")}) format('truetype')
  }

  html, body {
    --main-bg-color: rgb(220, 220, 220);
    --theme-color: rgba(0, 80, 120, 0.8);
    --editor-bg-color: white;
    --button-color-primary: rgb(63,81,181);
    --button-border: 1px solid rgba(63, 81, 181, 0.5);
    --alert-color-warning: rgba(255, 184, 191, 0.8);
    --alert-color-message: rgba(244, 255, 184, 0.8);
    --alert-color-success: rgba(191, 255, 184, 0.8);
    background-color: var(--main-bg-color);
    font-family: "Play", Arial;
    color: black;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 1vw;
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
