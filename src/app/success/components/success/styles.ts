import styled from 'styled-components';

export const Container = styled.article`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 90vh;
`;

export const Banner = styled.div`
  position: relative;

  display: flex;

  justify-content: center;
  align-items: center;

  img{
    position: absolute;
  };
`;

export const Description = styled.div`
  display: flex;

  text-align: center;

  max-width: 480px;
`;

export const Footer = styled.footer`
  display: flex;

  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  padding: 15px 0;

  width: 100%;
  height: 300px;

  background: rgb(250,11,91);
  background: linear-gradient(90deg, rgba(250,11,91,1) 0%, rgba(57,95,245,1) 100%, rgba(0,212,255,1) 100%);
`;

export const Cards = styled.div`
  svg {
    margin: 5px;
  };
`;
