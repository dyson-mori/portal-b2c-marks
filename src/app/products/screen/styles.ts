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
  display: grid;

  width: 100%;

  margin-left: 5px;

  ${({ theme }) => css`
    @media (min-width: 1600px){
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 5), 1fr));
    };

    @media (max-width: 1600px){
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 4), 1fr));
    };

    @media (max-width: 1350px){
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
    };

    @media (max-width: 1080px){
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
      margin-left: 0px;
      a {
        margin: 1.5px 0;
        width: calc(240px / 1.26);
        height: calc(240px / 1.26);
      };
    };
  `};

`;

export const ProductEmpty = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;