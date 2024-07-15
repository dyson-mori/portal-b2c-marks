import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;

  flex-wrap: wrap;
  justify-content: space-between;

  margin: 10px 50px;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin: ${theme.settings.responsive.margin};
    };
  `};
`;

export const UploadMore = styled(Link)`
  display: flex;

  border: 0;

  margin: 0 0 10px 0;
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

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: 390px;
      height: 390px;

      img {
        width: 390px;
        height: 390px;
      };
    };
  `};
`;
