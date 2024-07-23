import styled, { css } from 'styled-components';

export const Container = styled.main`
  display: flex;

  margin: 10px 50px;

  min-height: 80vh;

  ${({ theme }) => css`
    @media (max-width: 710px){
      flex-direction: column;
      /* margin: ${theme.settings.responsive.margin}; */
    };

    @media (max-width: 1090px){
      margin: 10px 20px;
    }
  `};
`;

export const Aside = styled.aside`
  ${({ theme }) => css`
    @media (max-width: 710px){
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
    @media (max-width: 710px){
      width: 100%;
    };
  `};
`;

export const Products = styled.section`
  display: grid;

  margin-left: 5px;

  width: 100%;
  height: 100%;

  @media (max-width: 1920px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 5), 1fr));
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 7);
    };

    img {
      width: 100%;
      height: calc(100vw / 7);
    };
  };

  @media (max-width: 1280px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 4), 1fr));
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 6);
    };

    img {
      width: 100%;
      height: calc(100vw / 6);
    };
  };

  @media (max-width: 1090px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 4);
    };

    img {
      width: 100%;
      height: calc(100vw / 4);
    };
  };

  @media (max-width: 900px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 3);
    };

    img {
      width: 100%;
      height: calc(100vw / 3);
    };
  };

  @media (max-width: 710px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
    margin-left: 1.5px;
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 3);
    };

    img {
      width: 100%;
      height: calc(100vw / 3);
    };
  };

  @media (max-width: 520px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
    margin-left: 1.5px;
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 2);
    };

    img {
      width: 100%;
      height: calc(100vw / 2);
    };
  };
`;

export const ProductEmpty = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;