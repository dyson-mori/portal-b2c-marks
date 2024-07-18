import styled, { css } from 'styled-components';

export const Container = styled.aside`
  display: flex;

  align-items: center;
  flex-direction: column;

  padding: 30px 10px 10px 10px;

  width: 34%;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    border-radius: ${theme.settings.radius.small};
    background-color: ${theme.colors.white};

    h1 {
      font-size: ${theme.font.size.large};
      font-weight: ${theme.font.weight[700]};
    };

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: 100%;
    }
  `};
`;

export const Form = styled.form`
  display: flex;
  
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  };

  ${({ theme }) => css`
    p {
      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[500]};
      margin-right: 2px;
    };
  `};
`;