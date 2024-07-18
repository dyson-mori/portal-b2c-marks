import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));

  margin: 10px 50px;

  min-height: 80vh;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin: ${theme.settings.responsive.margin};
    };
  `};
`;

export const UploadMore = styled(Link)`
  display: flex;

  flex-direction: column;

  border: 0;

  margin: 0 0 10px 0;
  padding: 0;

  justify-content: center;
  align-items: center;

  width: calc(300px / 1.3);
  height: calc(300px / 1.3);

  color: #303030;

  cursor: pointer;

  text-decoration: none;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    box-shadow: ${theme.settings.box.simple};
    border-radius: ${theme.settings.radius.small};

    p {
      color: ${theme.colors.text};
      font-size: ${theme.font.size.medium};
      font-weight: ${theme.font.weight[500]};
    }

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

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;

  background-color: #292D32aa;

  transition: .5s;
`;