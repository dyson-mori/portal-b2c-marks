import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 45px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};

  svg {
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    margin: 0 10px;
  };
`;

export const Input = styled.input`
  border: 0;
  outline: 0;

  width: 100%;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    font-size: ${theme.font.size.medium};
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
