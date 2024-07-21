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

export const Modal = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;

  background-color: #dededeaa;
  /* background-color: #292D32aa; */

  transition: .5s;

  div {
    width: 300px;
  };

  button {
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 0px;
  }
`;

export const Navigations = styled.div`
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