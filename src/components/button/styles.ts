import styled, { css } from 'styled-components';
import { ButtonProps } from '.';

export const Container = styled.button<ButtonProps>`
  border: 0;

  width: 100%;
  height: 50px;

  ${({ theme, primary }) => primary === 'true' && css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
    font-weight: ${theme.font.weight[700]};
  `};

  ${({ theme, secondary }) => secondary  === 'true' && css`
    color: ${theme.colors.primary};
    background-color: ${theme.colors.background};
    border: 1px solid ${theme.colors.primary};
    font-weight: ${theme.font.weight[500]};
  `};

  ${({ theme, disabled }) => css`
    box-shadow: ${theme.settings.box.simple};
    border-radius: ${theme.settings.radius.small};
    background-color: ${theme.colors[disabled ? 'primary_loading' : 'primary']};
    cursor: ${disabled ? 'default' : 'pointer'};
  `};
`;
