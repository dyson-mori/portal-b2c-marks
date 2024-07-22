import styled, { css } from 'styled-components';

export const Container = styled.main`
  display: flex;

  margin: 10px 50px;

  min-height: 80vh;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      flex-direction: column;
      margin: ${theme.settings.responsive.margin};
    };
  `};
`;

export const Aside = styled.aside`
  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      position: relative;
      top: 0px;
    };
  `};

  position: -webkit-sticky;
  position: sticky;

  top: 60px;

  display: flex;

  flex-direction: column;

  width: 350px;
  height: 100%;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      width: 100%;
    };
  `};
`;

export const Products = styled.section`
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(50% / 2), 0fr)); */
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;

  width: 100%;

  margin-left: 5px;

  @media (max-width: 600px) {
    ${({ theme }) => css`
      @media (max-width: ${theme.settings.responsive.maxWidth}){
        grid-template-columns: repeat(auto-fill, minmax(calc(75% / 2), 1fr));
        margin-left: 0px;
      };
    `};
  };
`;

export const ProductEmpty = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;