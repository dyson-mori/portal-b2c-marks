import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: calc(100%);
      height: calc(100vw / 5);
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
      color: ${theme.colors.white};
      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[500]};
    `};

    width: 100%;
    font-style: italic;
  };

  #price {
    ${({ theme }) => css`
      color: ${theme.colors.white};
      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[500]};
    `};

    width: 120px;
    text-align: end;
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