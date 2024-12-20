import styled, { css } from 'styled-components';

export const Container = styled.section`
  width: 100%;
  padding: 0 40px;

  pre {
    white-space: pre-wrap;
    width: 100%;
  }

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

export const Delivery = styled.div`
  display: flex;

  align-items: center;

  margin: 15px 0px;

  p {
    ${({ theme }) => css`
      color: #47C747;
      font-size: 13px;
      font-weight: ${theme.font.weight[500]};
    `};
  }
`;