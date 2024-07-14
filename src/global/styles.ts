import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-montserrat), sans-serif;
  }

  body {
    ${({ theme }) => css`
      background-color: ${theme.colors.background};
    `};
  };
`;