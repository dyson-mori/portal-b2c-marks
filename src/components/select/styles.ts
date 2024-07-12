import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;

  /* width: 100%; */
  width: 400px;
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

  width: 100%;
  min-height: 50px;
  max-height: 250px;

  transition: .3s;

  overflow-y: hidden;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.default};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Button = styled.button<{isSelected: string}>`
  border: 0;

  height: 50px;

  cursor: pointer;

  text-align: start;

  padding: 0 10px;

  ${({ theme, isSelected }) => css`
    background-color: ${theme.colors[isSelected === 'true' ? 'primary' : 'white']};
    color: ${theme.colors[isSelected === 'true' ? 'white' : 'primary']};
  `};
`;