import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled(Link)`
  position: relative;

  width: 300px;
  height: 300px;

  padding: 0;
  margin: 0;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 0;

  display: flex;

  width: 100%;

  justify-content: space-between;

  padding: 15px 10px;

  border-radius: 0 0 5px 5px;

  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);

  #title {
    width: 100%;
    font-size: 15px;
    color: #fff;
    font-style: italic;
  };

  #price {
    text-align: end;
    width: 120px;
    font-size: 15px;
    color: #fff;
    font-weight: 500;
    font-style: italic;
  }
`;

export const Actions = styled.button`
  position: absolute;

  left: 0;
  bottom: 0;
  border: 0;

  width: 100%;

  background-color: transparent;
  z-index: 10;
`;