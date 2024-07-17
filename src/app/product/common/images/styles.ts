import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: 390px;
      height: 390px;

      img {
        width: 390px;
        height: 390px;
      };
    };
  `};
`;

export const Options = styled.div`
  display: flex;

  flex-direction: column;

  margin: 0 10px 0 0;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      display: none;
      /* flex-direction: column;
      padding: ${theme.settings.responsive.padding}; */
    };
  `};
`;

export const Button = styled.button`
  border: 0;

  margin: 0;
  padding: 0;

  cursor: pointer;
`;