import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "pretandard";
  }

  body {
    background-color: ${({ theme }) => theme.colors.gray100};

     /* 모바일 */
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      background-color: ${({ theme }) => theme.colors.component.alternative};
    }
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
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: normal;
    font-size: 1rem;
  }
`;

export default GlobalStyle;
