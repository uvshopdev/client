import styled, { css } from "styled-components";

const fontBase = css`
  font-family: "Montserrat Alternates";
  color: #000;
`;

const gap16 = css`gap: 16px;`;
const gap30 = css`gap: 30px;`;

export const Wrapper = styled.div`
  padding: 0 40px;

  @media (max-width: 640px) {
    padding: 0 20px;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  align-items: start;

  @media (max-width: 990px) {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div`
  position: sticky;
  width: 100%;
  top: 100px;
  align-self: start;

  @media (max-width: 1200px) {
    position: relative;
    top: 0;
  }
`;

export const MainImage = styled.div`
  position: relative;
  width: 100%;

  aspect-ratio: 1 / 1;
  max-height: 600px;

  border: 1px solid #e9e3d9;
  border-radius: 30px;
  overflow: hidden;
  padding: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;

  & img {
    object-fit: contain;
  }

  @media (max-width: 990px) {
    max-height: 450px;
    padding: 30px;
  }

  @media (max-width: 640px) {
    aspect-ratio: 4 / 3;
    max-height: none;
    padding: 20px;
    border-radius: 20px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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

export const Title = styled.h1`
  font-size: 34px;
  color: #3b3028;
  font-family: 'Gabriela', serif;
  font-weight: 545;
  line-height: 1.2;
  margin: 0;

  word-break: break-word; 

  @media (max-width: 640px) {
    font-size: 26px;
  }
`;

export const BoldText = styled.span`
  font-weight: 700;
`;

export const RowBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CodeStock = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 640px) {
    gap: 15px;
    flex-direction: column;
    align-items: flex-start;
  }
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

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
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

  @media (max-width: 640px) {
    gap: 15px;
    flex-wrap: wrap; 
  }
`;

export const Quantity = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;

  @media (max-width: 640px) {
    gap: 12px;
  }

  button {
    width: 48px;
    height: 40px;
    border-radius: 12px;
    border: 1px solid #000000;
    background: #FFFFFF;
    color: #000000;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background: #f3eee9;
    }

    &:disabled {
        border: 1px solid #D3D3D3;
        color: #BDBDBD;
        cursor: not-allowed;
        background: #FFFFFF;
    }
  }

  span {
    min-width: 20px;
    text-align: center;
    display: inline-block;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: #000000;
  }
`;

export const BuyButton = styled.button`
  background: #3b3028;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
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

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

export const CharLabel = styled.span`
  font-weight: 600;
`;

export const CharValue = styled.span``;

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
