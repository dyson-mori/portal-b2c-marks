import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;

  justify-content: space-between;

  padding: 10px 50px;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      flex-direction: column;
      padding: ${theme.settings.responsive.padding};
    };
  `};
`;
