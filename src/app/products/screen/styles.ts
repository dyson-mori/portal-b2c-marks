import styled, { css } from 'styled-components';

export const Container = styled.main`
  display: flex;

  margin: 10px 50px;

  min-height: 80vh;

  ${({ theme }) => css`
    @media (max-width: 710px){
      flex-direction: column;
    };

    @media (max-width: 1090px){
      margin: 10px 20px;
    };
  `};
`;

export const Aside = styled.aside`
  @media (max-width: 710px){
    position: relative;
    top: 0px;
    width: 100%;
  };

  position: -webkit-sticky;
  position: sticky;

  top: 60px;

  display: flex;

  flex-direction: column;

  width: 350px;
  height: 100%;
`;

export const Products = styled.section`
  display: grid;

  margin-left: 5px;

  width: 100%;
  height: 100%;

  @media (min-width: 1920px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 5), 1fr));
  };

  @media (max-width: 1920px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 5), 1fr));
  };

  @media (max-width: 1280px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 4), 1fr));
  };
  
  @media (max-width: 1090px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
  };

  @media (max-width: 900px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
  };

  @media (max-width: 710px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
    margin-left: 1.5px;
  };

  @media (max-width: 520px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
    margin-left: 1.5px;
  };
`;

export const ProductEmpty = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;