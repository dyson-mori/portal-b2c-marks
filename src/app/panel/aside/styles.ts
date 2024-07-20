import styled, { css } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;

  padding: 50px;
`;

export const Forms = styled.form`
  display: flex;
  margin-bottom: 10px;
  width: 400px;
`;

export const Items = styled.div`
  display: flex;

  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  margin: 2px 0;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
    p {
      width: 100%;
      font-size: ${theme.font.size.medium};
    };
  `};
`;

export const Header = styled.div`
  display: flex;

  align-items: center;

  width: 400px;

  padding: 5px 10px;
  margin: 2px 0;

  ${({ theme }) => css`
    p {
      width: 100%;
      font-size: ${theme.font.size.medium};
    };
  `};

  button {
    background-color: transparent;
    border: 0;
    padding: 5px;
    margin: 0 5px;

    cursor: pointer;
  }
`;

export const ButtonToAdd = styled.button`
  border: 0;

  cursor: pointer;

  flex-grow: 1;

  display: flex;

  align-items: center;

  margin: 1px 2px;
  padding: 10px;

  border-radius: 3px;
`;

export const Options = styled.div`
  display: flex;

  flex-wrap: wrap;

  width: 400px;
`;