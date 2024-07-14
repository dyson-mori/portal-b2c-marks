import styled, { css } from 'styled-components';

export const Container = styled.section`
  width: 100%;
  padding: 0 70px;

  ${({ theme }) => css`
    h1 {
      font-size: 20px;
      font-weight: ${theme.font.weight[600]};
    };
    h2 {
      font-size: 24px;
      font-weight: ${theme.font.weight[800]};
    }
  `};
`;

export const TextDescription = styled.div`
  position: relative;
  min-height: 50px;
  max-height: 200px;

  z-index: 2;

  overflow: hidden;

  span {
    position: absolute;

    left: -10px;
    right: -10px;

    padding: 10px;

    ${({ theme }) => css`
      background-color: ${theme.colors.background};
      border-radius: ${theme.settings.radius.small};
      box-shadow: ${theme.settings.box.normal};
    `};

    transition: height 1s ease-out;
  };

  &:hover {
    overflow: visible;
  };

  &span:hover {
    transition: height 1s ease-in;
    height: auto;
  };
`;

export const Delivery = styled.div`
  display: flex;

  align-items: center;

  margin: 10px 11px;

  p {
    ${({ theme }) => css`
      color: #47C747;
      font-size: 13px;
      font-weight: ${theme.font.weight[500]};
    `};
  }
`;