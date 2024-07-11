import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.article`
  display: flex;

  margin: 10px 50px;
`;

export const Aside = styled.aside`
  display: flex;

  flex-direction: column;

  width: 400px;
`;

export const Products = styled.section`
  display: flex;

  flex-wrap: wrap;
  justify-content: space-around;

  width: 100%;
`;