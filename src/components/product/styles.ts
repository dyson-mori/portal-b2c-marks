import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled(Link)`
  position: relative;

  width: calc(300px / 1.3);
  height: calc(300px / 1.3);

  margin: 0 5px 5px 0;

  img {
    width: calc(300px / 1.3);
    height: calc(300px / 1.3);
  }

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: calc(250px / 1.3);
      height: calc(250px / 1.3);

      img {
        width: calc(250px / 1.3);
        height: calc(250px / 1.3);
      }
    };
  `};
`;

export const Footer = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;

  width: 100%;

  justify-content: space-between;

  padding: 10px;

  border-radius: 0 0 5px 5px;

  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);

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
    `}
    text-align: end;
    width: 160px;
    font-weight: 500;
    font-style: italic;
  }
`;

export const Delete = styled.button`
  position: absolute;

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