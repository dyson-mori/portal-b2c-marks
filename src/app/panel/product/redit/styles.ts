import styled, { css } from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  overflow: hidden;
`;

export const Forms = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  margin: 0 10px;

  width: 450px;
  height: 398px;
`;

export const Selects = styled.button`
  border: 0;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;

  cursor: pointer;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Options = styled.div`
  display: flex;

  align-items: start;

  position: absolute;

  flex-wrap: wrap;

  width: 100%;
  height: 100%;

  transition: .3s;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const ButtonCategoriesRemove = styled.button`
  border: 0;

  cursor: pointer;

  display: flex;

  align-items: center;

  margin: 8px 5px;
  padding: 10px;

  border-radius: 3px;
`;