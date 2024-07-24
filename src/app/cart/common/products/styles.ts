import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: inline-grid;

  width: 100%;

  padding: 0 2.5px;
  margin-right: 5px;

  @media (max-width: 1920px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 4), 1fr));
    a {
      margin: 2.5px;
      width: 98%;
      height: calc(100vw / 6.2);
    };
    img {
      height: calc(100vw / 6.2);
    };
  };

  @media (max-width: 520px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
    a {
      margin: 2.5px;
      width: 98%;
      height: calc(100vw / 2.2);
    };
    img {
      height: calc(100vw / 2.2);
    };
  };

  ${({ theme }) => css`
    border-radius: 4px;
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      min-height: 40vh;
      margin-bottom: 10px;
      justify-content: space-evenly;

      padding: 1.5px 0;
    };
  `};
`;

export const CartEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;