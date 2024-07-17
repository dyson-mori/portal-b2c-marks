import styled, { css } from 'styled-components';

export const Container = styled.main`
  display: flex;

  margin: 10px 50px;

  height: 80vh;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      flex-direction: column;
      margin: ${theme.settings.responsive.margin};
    };
  `};
`;

export const Aside = styled.aside`
  display: flex;

  flex-direction: column;

  width: 400px;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      width: 100%;
    };
  `};
`;

export const Products = styled.section`
  display: flex;

  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin-left: 15px;

  @media (max-width: 600px){
  }
  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin-left: 0px;
    };
  `};
`;

export const ProductEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;