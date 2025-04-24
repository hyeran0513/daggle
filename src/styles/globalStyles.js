import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.gray100};
    font-family: "Pretendard";
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: normal;
    font-size: 1rem;
  }
`;

export default GlobalStyle;
