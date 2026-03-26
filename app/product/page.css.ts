import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1520px;
  margin: 0 auto;
  padding-top: 130px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

// === PRODUCT CARD ===

export const ProductCard = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 40px;
`;

// LEFT (carousel)

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

// RIGHT (info)

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

// characteristics

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


// === REVIEWS ===

export const ReviewsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 40px;
`;

export const ReviewsTitle = styled.h2`
  font-family: 'Gabriela', serif;
  font-size: 34px;
  color: #3B3028;
`;

export const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const ReviewsScroll = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const ReviewsRow = styled.div`
  display: flex;
  gap: 30px;
  width: max-content;
`;

export const ReviewCard = styled.div`
  width: 460px;
  height: 163px;
  padding: 20px;
  border: 1px solid #E9E3D9;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ReviewTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Name = styled.div`
  font-weight: 700;
`;

export const Date = styled.div`
  font-size: 12px;
  color: #3B3028;
`;

export const Stars = styled.div`
  display: flex;
  gap: 6px;
`;

export const Star = styled.div<{ $active?: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background: ${({ $active }) => ($active ? "#FFD400" : "#D3D3D3")};
`;

export const ReviewText = styled.div`
  font-size: 14px;
`;

// controls

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`;

export const ArrowBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #3B3028;
  color: white;
  border: none;
  cursor: pointer;
`;

export const Dots = styled.div`
  display: flex;
  gap: 12px;
`;

export const Dot = styled.div<{ $active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? "#3B3028" : "#E5E5E5")};
`;

// === PRODUCTS LIST ===

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

// карточка

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