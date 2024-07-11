import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  label {
    display: flex;

    justify-content: center;
    align-items: center;

    width: 400px;
    height: 400px;

    color: #303030;

    cursor: pointer;

    ${({ theme }) => css`
      background-color: ${theme.colors.white};
      box-shadow: ${theme.settings.box.simple};
      border-radius: ${theme.settings.radius.small};
    `};
  }

  input[type="file"]{
    display: none;
  }

  img {
    width: 400px;
    height: 400px;

    ${({ theme }) => css`
      background-color: ${theme.colors.white};
      box-shadow: ${theme.settings.box.simple};
      border-radius: ${theme.settings.radius.small};
    `};

    object-fit: cover;
  }
`;

export const Load = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 400px;
  height: 400px;
`;