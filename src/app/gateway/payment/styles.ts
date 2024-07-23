import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 90vh;

  text-align: center;

  justify-content: space-evenly;

  h1 {
    margin: 10px;
    ${({ theme }) => css`
      color: ${theme.colors.text};
      font-size: ${theme.font.size.large};
      font-weight: ${theme.font.weight[600]};
    `};
  };
`;

export const Banner = styled.div`
  display: flex;

  @media (min-width: 1000px) {
    justify-content: space-evenly;
    align-items: center;
    overflow-x: hidden;
    margin-bottom: 20px;
  };

  width: 100%;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;
`;

export const BannerProduct = styled.div`
  display: flex;
  position: relative;

  justify-content: center;
  align-items: center;

  width: 300px;
  height: 350px;

  @media (max-width: 600px) {
    min-width: 100%;
  };
`;