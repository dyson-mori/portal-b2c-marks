import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled(Link)`
  position: relative;

  width: 300px;
  height: 300px;

  padding: 0;
  margin: 0;

  margin-bottom: 10px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: 100%;
      height: auto;

      img {
        width: 100%;
        height: 100%;
      };
    };
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
    ${({ theme }) => css`
      font-size: ${theme.font.size.semiBold};
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight[600]};
    `}
    width: 100%;
    font-style: italic;
  };

  #price {
    ${({ theme }) => css`
      font-size: ${theme.font.size.semiBold};
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight[700]};
    `}
    text-align: end;
    width: 160px;
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