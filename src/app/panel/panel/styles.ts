import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: grid;

  margin: 10px 50px;

  height: 100%;

  @media (min-width: 1920px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 5), 1fr));
    img {
      height: calc(100vw / 7);
    };
  };

  @media (max-width: 1920px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 5), 1fr));
    a {
      height: calc(100vw / 5.5);
    }
    img {
      height: calc(100vw / 5.5);
    };
  };

  @media (max-width: 1280px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 4), 1fr));
  };
  
  @media (max-width: 1090px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
  };

  @media (max-width: 900px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
  };

  @media (max-width: 710px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
  };

  @media (max-width: 520px){
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
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