import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  /* width: 400px; */
  height: 45px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Input = styled.input`
  border: 0;
  outline: 0;

  width: 100%;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Icon = styled.div`
  width: 45px;
  height: 45px;

  svg {
    position: relative;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  };
`;

export const DropDown = styled.div`
  position: absolute;
  bottom: -55px;

  width: 100%;
  min-height: 50px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.normal};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;