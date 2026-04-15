import styled, { css } from "styled-components";

const fontBase = css`
  font-family: "Montserrat Alternates", sans-serif;
  font-style: normal;
  color: #000;
`;

const gap16 = css`gap: 16px;`;
const gap30 = css`gap: 30px;`;

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

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  ${gap30}
`;

export const MainImage = styled.div`
  position: relative;
  height: 538px;
  border: 1px solid #e9e3d9;
  border-radius: 40px;
  padding: 0 80px;
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
  ${({ $left }) => ($left ? "left: 20px;" : "right: 20px;")};
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #3b3028;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const WishButton = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 47px;
  height: 40px;
  background: #f7f3e7;
  border-radius: 6px;
  border: none;
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
  gap: 12px;
`;

export const Dot = styled.div<{ $active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#3B3028" : "#E5E5E5")};
  cursor: pointer;
`;

export const Thumbs = styled.div`
  display: flex;
  gap: 30px;
  height: 160px;
`;

export const Thumb = styled.div<{ $active?: boolean }>`
  flex: 1;
  height: 100%;
  border: 1px solid ${({ $active }) => ($active ? "#3B3028" : "#E9E3D9")};
  border-radius: 20px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

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
  align-items: center;
  gap: 6px;
  
  /* Сделали ЖИРНЫМ (Bold 700) как на скриншоте */
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #A4A4A4;

  span.current {
    color: #3B3028;
  }
`;

export const Title = styled.h1`
  font-family: "Gabriela", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 44px;
  color: #3B3028;
  margin: 0;
`;

export const RowBetween = styled.div`
  display: flex;
  justify-content: space-between;
  ${fontBase}
`;

export const CodeStock = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  
  span {
    /* Сделали ЖИРНЫМ (Bold 700) как на скриншоте */
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const Stock = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

export const DotStatus = styled.div`
  width: 14px;
  height: 14px;
  background: #00B221;
  border-radius: 50%;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  ${fontBase}
  
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const Stars = styled.div`
  display: flex;
  gap: 6px;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${fontBase}
`;

export const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Price = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
`;

export const SubPrice = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
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
    width: 48px;
    height: 40px;
    border-radius: 12px;
    border: 1px solid #D3D3D3;
    background: transparent;
    cursor: pointer;
    font-size: 18px;
  }

  span {
    min-width: 25px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
  }
`;

export const BuyButton = styled.button`
  background: #3B3028;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid #3B3028;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  text-decoration: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
`;

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
  line-height: 20px;
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
`;

export const CharLabel = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

export const CharValue = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

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
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

export const AccordionContent = styled.div`
  padding: 0 20px 20px 20px;
  ${fontBase}
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;