import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding: 0 2.5px;
  margin-right: 5px;

  a {
    margin: 0 2.5px;
  };

  ${({ theme }) => css`
    border-radius: 4px;
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
  `};
`;

export const CartEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;