import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 0 40px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 990px) {
    grid-template-columns: 1fr;
  }
`;

/* LEFT */

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const MainImage = styled.div`
  position: relative;
  height: 500px;
  border: 1px solid #e9e3d9;
  border-radius: 30px;
  overflow: hidden;


  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Arrow = styled.button<{ $left?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ $left }) => ($left ? "left: 20px" : "right: 20px")};
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3b3028;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const WishButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 47px;
  height: 40px;
  background: #F7F3E7;
  border: 1px solid #e9e3d9;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 23px;
    height: 21px;
    flex-shrink: 0;
  }
`;

export const Dots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

export const Dot = styled.div<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#3B3028" : "#ccc")};
`;

export const Thumbs = styled.div`
  display: flex;
  gap: 30px;
`;

export const Thumb = styled.div<{ $active?: boolean }>`
  flex: 1;
  height: 120px;
  border: 1px solid ${({ $active }) => ($active ? "#3B3028" : "#E9E3D9")};
  border-radius: 16px;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* RIGHT */

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Breadcrumbs = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`;

export const Title = styled.h1`
  font-size: 34px;
  color: #3b3028;
  font-family: "Gabriela", serif;
`;

export const RowBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CodeStock = styled.div`
  display: flex;
  gap: 40px;
`;

export const Stock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DotStatus = styled.div`
  width: 8px;
  height: 8px;
  background: green;
  border-radius: 50%;
`;

export const RatingRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

export const Stars = styled.div`
  display: flex;
  gap: 4px;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Price = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

export const SubPrice = styled.div`
  font-size: 14px;
  color: gray;
`;

export const BuyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const Quantity = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;

  button {
    width: 40px;
    height: 40px;
  }
`;

export const BuyButton = styled.button`
  background: #3b3028;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;

// ===== BLOCK 2 WRAPPER =====
export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// ===== 2.1 Характеристики =====
export const Characteristics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CharacteristicsTitle = styled.div`
  font-family: "Montserrat Alternates";
  font-weight: 600;
  font-size: 16px;
  color: #000;
`;

export const CharacteristicsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const CharItem = styled.div`
  flex: 1 1 calc(50% - 10px); // ровно 2 колонки

  background: #ffffff;
  border: 1px solid #e9e3d9;
  border-radius: 12px;

  padding: 12px 20px;

  display: flex;
  align-items: center;
  gap: 8px;

  font-family: "Montserrat Alternates";
  font-size: 14px;
`;

export const CharLabel = styled.span`
  font-weight: 600;
  color: #000;
`;

export const CharValue = styled.span`
  color: #000;
`;

// ===== 2.2 Accordion =====
export const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AccordionItem = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #e9e3d9;
  border-radius: 16px;
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  cursor: pointer;

  font-family: "Montserrat Alternates";
  font-weight: 600;
  font-size: 16px;
  color: #000;
`;

export const AccordionContent = styled.div`
  padding: 0 20px 20px 20px;
  font-family: "Montserrat Alternates";
  font-size: 14px;
  line-height: 1.5;
  color: #000;
`;