import styled from "styled-components";

export const ProductsSection = styled.div`
  width: 100%;
  max-width: 1520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 40px;
`;

export const ProductsTitle = styled.h2`
  font-family: 'Gabriela', serif;
  font-size: 34px;
  color: #3B3028;
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
`;

export const ProductItem = styled.div`
  border: 1px solid #E9E3D9;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
`;

export const ProductName = styled.div`
  font-size: 16px;
`;

export const ProductPrice = styled.div`
  font-weight: 600;
`;