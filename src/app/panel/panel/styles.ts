import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: grid;

  margin: 10px 50px;

  min-height: 80vh;

  @media (max-width: 1920px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 5), 1fr));
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 5);
    };

    img {
      width: 100%;
      height: calc(100vw / 5);
    };
  };

  @media (max-width: 1280px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 4), 1fr));
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 4);
    };

    img {
      width: 100%;
      height: calc(100vw / 4);
    };
  };

  @media (max-width: 1090px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 3);
    };

    img {
      width: 100%;
      height: calc(100vw / 3);
    };
  };

  @media (max-width: 900px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
    margin: 10px;
    a {
      margin: 0 5px 5px 0;
      width: calc(97%);
      height: calc(100vw / 2);
    };

    img {
      width: 100%;
      height: calc(100vw / 2);
    };
  };
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
      width: 50px;
      height: 50px;

      img {
        width: 50px;
        height: 50px;
      };
    };
  `};
`;

export const Navigation = styled.div`
  position: fixed;
  display: flex;

  bottom: 10px;

  left: 50%;
  transform: translate(-50%);
`;

export const ProductEmpty = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 80vh;
`;