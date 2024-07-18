import styled, { css } from 'styled-components';

import { NotificationProps } from '.';

export const Container = styled.div<Omit<NotificationProps, 'icon'>>`
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