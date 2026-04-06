import styled, { css } from "styled-components";

/* ===== Общие переменные ===== */
const fontBase = css`
  font-family: "Montserrat Alternates";
  color: #000;
`;

const gap16 = css`gap: 16px;`;
const gap20 = css`gap: 20px;`;
const gap30 = css`gap: 30px;`;

/* ===== WRAPPER ===== */
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

/* ===== LEFT ===== */
export const Left = styled.div`
  display: flex;
  flex-direction: column;
  ${gap30}
`;

export const MainImage = styled.div`
  position: relative;
  height: 500px;
  border: 1px solid #e9e3d9;
  border-radius: 30px;
  overflow: hidden;
  padding: 80px;
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
  cursor: pointer;
`;

export const WishButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 47px;
  height: 40px;
  background: #f7f3e7;
  border: 1px solid #e9e3d9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

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
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

/* ===== RIGHT ===== */
export const Right = styled.div`
  display: flex;
  flex-direction: column;
  ${gap30}
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  ${gap16}
`;

export const Breadcrumbs = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`;

export const Title = styled.h1`
  font-size: 34px;
  color: #3b3028;
  font-family: 'Gabriela', serif;
  font-weight: 400;
  line-height: 1.2;
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
  align-items: center;
  gap: 14px;
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
    cursor: pointer;
  }

  span {
    min-width: 25px;
    text-align: center;
    display: inline-block;
    font-variant-numeric: tabular-nums;
  }
`;

export const BuyButton = styled.button`
  background: #3b3028;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
`;

/* ===== INFO BLOCK ===== */
export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  ${gap30}
`;

export const Characteristics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CharacteristicsTitle = styled.div`
  ${fontBase}
  font-weight: 600;
  font-size: 16px;
`;

export const CharacteristicsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const CharItem = styled.div`
  flex: 1 1 calc(50% - 10px);
  background: #fff;
  border: 1px solid #e9e3d9;
  border-radius: 12px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  ${fontBase}
  font-size: 14px;
`;

export const CharLabel = styled.span`
  font-weight: 600;
`;

export const CharValue = styled.span``;

/* ===== ACCORDION ===== */
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
  ${fontBase}
  font-weight: 600;
  font-size: 16px;
`;

export const AccordionContent = styled.div`
  padding: 0 20px 20px 20px;
  ${fontBase}
  font-size: 14px;
  line-height: 1.5;
`;