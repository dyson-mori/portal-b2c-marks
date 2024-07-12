import styled, { css } from 'styled-components';

import { NotificationProps } from './root';

export const Container = styled.div<NotificationProps>`
  position: fixed;

  display: flex;

  align-items: center;

  right: 10px;

  width: 350px;
  height: 80px;

  transition: .5s;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
    box-shadow: ${theme.settings.box.default};
  `};

  p {
    font-size: 15px;
    font-weight: 400;
    transition: .5s;
  }
`;
