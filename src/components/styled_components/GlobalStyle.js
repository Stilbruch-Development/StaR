import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html, body {
    --main-bg-color: rgb(220, 220, 220);
    --editor-bg-color: white;
    background-color: var(--main-bg-color);
    font-family: "Play", Arial;
    color: black;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 1.2vw;
    z-index: -1;
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

  /* poiret-one font */
  @font-face {
    font-family: 'Poiret One';
    font-style: normal;
    font-weight: 400;
    src: url(${require("../../fonts/poiret-one/poiret-one-v7-latin-regular.eot")});  // IE9 Compat Modes
    src: local('Poiret One'), local('PoiretOne-Regular'),
        url(${require("../../fonts/poiret-one/poiret-one-v7-latin-regular.eot")}) format('embedded-opentype'), // IE6-IE8
        url(${require("../../fonts/poiret-one/poiret-one-v7-latin-regular.woff2")}) format('woff2'), // Super Modern Browsers
        url(${require("../../fonts/poiret-one/poiret-one-v7-latin-regular.woff")}) format('woff'), // Modern Browsers
        url(${require("../../fonts/poiret-one/poiret-one-v7-latin-regular.ttf")}) format('truetype'), // Safari, Android, iOS
        url(${require("../../fonts/poiret-one/poiret-one-v7-latin-regular.svg")}) format('svg'); // Legacy iOS
  }

  #ExpanderDialog {
    .MuiDialog-paper {
      max-width: unset;
      width: 80%;
    }
    .MuiPaper-root {
      height: 100%;
    }
    .MuiTableCell-root  {
      padding: unset;
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
