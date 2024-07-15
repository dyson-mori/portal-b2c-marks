import styled, { css } from 'styled-components';

export const Container = styled.form`
  width: 50%;

  ${({ theme }) => css`
    h1 {
      font-size: 20px;
      font-weight: ${theme.font.weight[600]};
    };
    h2 {
      font-size: 24px;
      font-weight: ${theme.font.weight[800]};
    }

    ${({ theme }) => css`
      @media (max-width: ${theme.settings.responsive.maxWidth}) {
        padding: 0;
        margin: 20px 0;
      };
    `};
  `};
`;

export const Row = styled.div`
  display: flex;

  width: 100%;
`;