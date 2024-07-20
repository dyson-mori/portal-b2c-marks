import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  flex-wrap: wrap;

  width: 400px;
  height: 400px;

  input[type="file"]{
    display: none;
  }
`;

export const MultiFiles = styled.div`
  display: flex;

  justify-content: space-between;

  width: 400px;
  height: 400px;

  flex-wrap: wrap;

  label {
    display: flex;

    justify-content: center;
    align-items: center;

    width: calc(400px / 3.1);
    height: calc(400px / 3.1);

    color: #303030;

    cursor: pointer;

    ${({ theme }) => css`
      background-color: ${theme.colors.white};
      box-shadow: ${theme.settings.box.simple};
      border-radius: ${theme.settings.radius.small};
    `};
  };

  img {
    ${({ theme }) => css`
      background-color: ${theme.colors.white};
      box-shadow: ${theme.settings.box.simple};
      border-radius: ${theme.settings.radius.small};
    `};
  }
`;
