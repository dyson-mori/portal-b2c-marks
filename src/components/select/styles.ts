import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 400px;
`;

export const Content = styled.div`
  position: relative;
  display: flex;

  width: 100%;
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

  svg {
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
  min-height: 0px;
  max-height: 250px;

  transition: .3s;

  overflow-y: hidden;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Button = styled.button`
  border: 0;

  min-height: 50px;

  cursor: pointer;

  text-align: start;

  padding: 0 10px;

`;
