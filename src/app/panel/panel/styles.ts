import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: grid;

  margin: 10px 50px;

  min-height: 80vh;

  ${({ theme }) => css`
    @media (min-width: 1600px){
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 5), 1fr));
    };

    @media (max-width: 1600px){
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 5), 1fr));
    };

    @media (max-width: 1350px){
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 4), 1fr));
    };

    @media (max-width: 1080px){
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
      margin-left: 0px;
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