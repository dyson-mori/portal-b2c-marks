import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 90vh;

  h1 {
    margin: 10px;
    ${({ theme }) => css`
      color: ${theme.colors.text};
      font-size: ${theme.font.size.large};
      font-weight: ${theme.font.weight[600]};
    `};
  }
`;

export const Banner = styled.div`
  position: relative;

  display: flex;

  justify-content: center;
  align-items: center;
`;

export const Loading = styled.div`
  display: flex;
  position: absolute;

  width: 500px;

  transform: 1s;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BannerProduct = styled.div`
  display: flex;
  position: relative;

  flex-direction: column;
  justify-content: center;
  align-items: center;

`;