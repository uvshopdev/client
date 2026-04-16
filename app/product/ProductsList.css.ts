import styled from "styled-components";

export const ProductsSection = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 40px;

  @media (max-width: 640px) {
    padding: 0 20px;
  }
`;

export const ProductsTitle = styled.h2`
  font-family: 'Gabriela', serif;
  font-size: 34px;
  font-weight: 400;
  color: #3B3028;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;