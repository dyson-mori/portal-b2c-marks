import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 90vh;

  p {
    margin: 10px;
    ${({ theme }) => css`
      font-size: ${theme.font.size.large};
      font-weight: ${theme.font.weight[600]};
      color: ${theme.colors.text};
    `};
  }
`;

export const Banner = styled.div`
  position: relative;

  display: flex;

  justify-content: center;
  align-items: center;
`;
