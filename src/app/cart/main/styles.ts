import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 10px 50px;

  ${({ theme }) => css`
    color: ${theme.colors.text};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: ${theme.settings.responsive.padding};
    };
  `};
  height: 82vh;
`;

export const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin: 0 10px 10px 0;

  /* background-color: #f1f1f1; */

  img {
    min-width: 150px;
    min-height: 150px;
  };

  button {
    border: 0;
    padding: 15px;
    cursor: pointer;
    background-color: transparent;
  };

  span {
    width: 100%;
  }

  ${({ theme }) => css`
    h2 {
      font-size: ${theme.font.size.semiBold};
      font-weight: ${theme.font.weight[600]};
    };

    #price {
      font-size: ${theme.font.size.semiBold};
      font-weight: ${theme.font.weight[700]};
    };

    #description {
      line-height: 1.5em;
      height: 3em;
      overflow: hidden;
      /* white-space: nowrap; */
      /* white-space: pre-wrap; */
      text-overflow: ellipsis;
      width: 100%;
    }
  `};
`;

export const Info = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  width: 100%;

  max-height: 50px;

  margin: 10px 20px;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin: 10px;
    };
  `};
`;

export const TP = styled.div`
  display: flex;

  justify-content: space-between;

  width: 100%;

  margin-bottom: 10px;
`;