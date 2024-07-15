import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  margin: 0 50px;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin: ${theme.settings.responsive.margin};
    };
  `};
`;

export const Forms = styled.form`
  display: flex;
  flex-direction: column;

  width: 400px;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;

export const AnsOpt = styled.div`
  display: flex;

  span {
    width: 20px;
  }
`;
