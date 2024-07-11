import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  /* width: 400px; */
  height: 50px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.default};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Input = styled.input`
  border: 0;
  outline: 0;

  width: 100%;

  padding: 0 10px;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Icon = styled.div`
  width: 50px;
  height: 50px;

  ${({ as }) => as === 'button' && css`
    display: flex;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  `};

  img {
    position: relative;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  };
`;

export const DropDown = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 55px;

  width: 100%;
  min-height: 50px;

  transition: .3s;

  ${({ theme}) => css`
    box-shadow: ${theme.settings.box.default};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};

  button {
    border: 0;

    height: 50px;

    cursor: pointer;

    text-align: start;

    padding: 0 10px;

    ${({ theme }) => css`
      background-color: ${theme.colors.white};
      border-radius: ${theme.settings.radius.small};
    `};
  };
`;