import styled, { css } from 'styled-components';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;

  width: 400px;
  height: 500px;
  
  padding: 10px;

  ${({ theme }) => css`
    color: ${theme.colors.text};
    border-radius: ${theme.settings.radius.small};
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin: ${theme.settings.responsive.margin};
      display: none;
    };
  `};
`;
