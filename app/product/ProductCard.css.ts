import styled from "styled-components";

export const ProductCard = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 40px;
`;

export const Left = styled.div`
  width: 705px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const MainImage = styled.div`
  position: relative;
  width: 100%;
  height: 538px;
  border-radius: 40px;
  border: 1px solid #E9E3D9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
`;

export const Arrow = styled.button<{ $left?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $left }) => ($left ? "left: 20px;" : "right: 20px;")}
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #3B3028;
  color: white;
  border: none;
  cursor: pointer;
`;

export const Thumbs = styled.div`
  display: flex;
  gap: 30px;
`;

export const Thumb = styled.div<{ $active?: boolean }>`
  width: 215px;
  height: 160px;
  padding: 16px;
  border-radius: 20px;
  border: 1px solid ${({ $active }) => ($active ? "#3B3028" : "#E9E3D9")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Right = styled.div`
  width: 705px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.h1`
  font-family: 'Gabriela', serif;
  font-size: 34px;
  color: #3B3028;
`;

export const Price = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

export const BuyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const QtyBtn = styled.button`
  width: 48px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #D3D3D3;
  background: white;
  cursor: pointer;
`;

export const BuyButton = styled.button`
  width: 140px;
  height: 40px;
  border-radius: 12px;
  background: #3B3028;
  color: white;
  border: none;
  cursor: pointer;
`;

export const Characteristics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const CharItem = styled.div`
  width: 342px;
  height: 41px;
  padding: 12px 20px;
  border: 1px solid #E9E3D9;
  border-radius: 12px;
  display: flex;
  gap: 8px;
`;