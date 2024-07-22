import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.article`
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr)); */
  margin: 10px 50px;

  min-height: 80vh;

  height: 100%;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin: ${theme.settings.responsive.margin};
    };
  `};
`;

export const UploadMore = styled(Link)`
  display: flex;

  margin: 0 10px;

  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  cursor: pointer;

  text-decoration: none;

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

export const Navigation = styled.div`
  position: absolute;
  display: flex;

  bottom: 15px;

  left: 50%;
  transform: translateX(-50%);
`;

export const ProductEmpty = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 80vh;
`;