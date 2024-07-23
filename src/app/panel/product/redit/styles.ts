import styled, { css } from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  overflow: hidden;

  @media (max-width: 520px){
    flex-direction: column;
  };
`;

export const Forms = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  margin: 0 10px;

  @media (max-width: 520px){
    margin: 10px;
    padding: 0 15px;
    width: 100%;
  };

  width: 450px;
  height: 398px;
`;

export const Selects = styled.button`
  border: 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 50px;

  cursor: pointer;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  position: absolute;

  top: 50%;
  transform: translateY(-50%);

  width: 100%;
  height: 100%;

  transition: .3s;

  @media (max-width: 520px){
    width: 93%;
  };

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

  margin: 2px;
  padding: 8px;
  height: 40px;

  border-radius: 3px;

  ${({ theme }) => css`
    font-weight: ${theme.font.weight[500]};
  `};
`;