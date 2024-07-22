import styled, { css } from 'styled-components';
import { FooterProps } from '.';

export const Container = styled.footer<FooterProps>`
  ${({ theme, primary }) => primary === 'true' && css`
    position: relative;

    display: flex;

    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 200px;

    padding: 20px;

    @media (max-width: 600px){
      flex-direction: column;
      height: auto;
    }
  `};
  
  ${({ theme, secondary }) => secondary === 'true' && css`
    display: flex;

    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    padding: 15px 0;

    width: 100%;
    height: 200px;
  `};

  
  background: rgb(250,11,91);
  background: linear-gradient(90deg, rgba(250,11,91,1) 0%, rgba(57,95,245,1) 100%, rgba(0,212,255,1) 100%);

  strong {
    color: #fff;

    font-size: 12px;
  };

  p {
    color: #fff;

    font-size: 12px;
  }

   ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: 100%;
      height: 200px;
    };
  `};
`;

export const Payments = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  padding: 15px 0;

  width: 100%;
  height: 300px;
`;