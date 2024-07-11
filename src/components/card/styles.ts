import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;

  flex-direction: column;

  width: 100%;

  transition: .5s;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Title = styled.button`
  border: 0;
  background-color: transparent;

  width: 100%;
  height: 50px;

  text-align: start;

  cursor: pointer;

  ${({ theme }) => css`
    padding: ${theme.settings.padding.button};
  `};
`;

export const DropDown = styled.div`
  display: flex;

  flex-wrap: wrap;

  width: 100%;

  button {
    border: 0;

    cursor: pointer;

    flex-grow: 1;

    min-width: 80px;

    margin: 3px 6px;
    padding: 2px 4px;

    ${({ theme }) => css`
      background-color: ${theme.colors.white};
      border-radius: ${theme.settings.radius.small};

      &:hover {
        background-color: ${theme.colors.primary}aa;
      }
    `};
  };
`;