import styled, { css } from 'styled-components';

export const Container = styled.form`
  width: 100%;
  padding: 0 70px;

  ${({ theme }) => css`
    h1 {
      font-size: 20px;
      font-weight: ${theme.font.weight[600]};
    };
    h2 {
      font-size: 24px;
      font-weight: ${theme.font.weight[800]};
    }
  `};
`;

export const Row = styled.div`
  display: flex;

  width: 100%;
`;