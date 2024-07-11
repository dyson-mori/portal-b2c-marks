import styled, { css } from 'styled-components';
import Link from "next/link";

export const Container = styled.header`
  position: relative;
  display: flex;

  width: 100%;
  height: 50px;

  padding: 0 50px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
  `};
`;

export const Icon = styled.div`
  width: 50px;
  height: 50px;

  img {
    position: relative;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  };
`;

export const Nav = styled.nav`
  display: flex;

  align-items: center;

  padding: 0 60px;

  width: 100%;
`;

export const LinkStyle = styled(Link)`
  position: relative;

  color: #47474D;

  margin: 0 25px;

  height: 100%;

  top: 50%;
  transform: translateY(-20%);

  text-decoration: none;

  font-size: 14px;
  font-weight: 500;
`;