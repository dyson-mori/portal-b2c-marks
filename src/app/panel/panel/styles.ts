import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;

  margin: 10px 50px;

  a {
    margin: 0 2px;
  }
`;

export const UploadMore = styled(Link)`
  display: flex;

  border: 0;

  margin: 0;
  padding: 0;

  justify-content: center;
  align-items: center;

  width: 300px;
  height: 300px;

  color: #303030;

  cursor: pointer;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    box-shadow: ${theme.settings.box.simple};
    border-radius: ${theme.settings.radius.small};
  `};
`;
