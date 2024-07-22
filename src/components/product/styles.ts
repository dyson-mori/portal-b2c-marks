import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(300px / 1.26);
  height: calc(300px / 1.26);

  margin: 0 5px 5px 0;

  img {
    width: calc(300px / 1.26);
    height: calc(300px / 1.26);
  }

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: calc(100% / 1.015);
      height: calc(100% / 1.015);

      img {
        width: 100%;
        height: 100%;
      };
    };
  `};
`;

export const Footer = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 10px;

  border-radius: 0 0 5px 5px;

  background: linear-gradient(180deg, rgba(48,48,48,0) 0%, rgba(48,48,48,1) 100%, rgba(0,212,255,1) 100%);

  #title {
    ${({ theme }) => css`
      font-size: ${theme.font.size.medium};
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight[500]};
    `};

    width: 100%;
    font-style: italic;
  };

  #price {
    ${({ theme }) => css`
      font-size: ${theme.font.size.medium};
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight[600]};
    `};

    text-align: end;
    width: 130px;
    font-weight: 500;
    font-style: italic;
  };

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      #title {
        font-size: ${theme.font.size.normal};
      };

      #price {
        font-size: ${theme.font.size.normal};
      };
    };
  `};
`;

export const Delete = styled.button`
  position: absolute;

  top: 0;
  right: 0;
  border: 0;

  width: 50px;
  height: 50px;
  background-color: transparent;
  z-index: 5;

  transition: .3s;

  cursor: pointer;

  &:hover {
    background-color: #292D32aa;
    svg {
      stroke: #fff;
    }
  };
`;