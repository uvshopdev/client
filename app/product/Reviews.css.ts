import styled from "styled-components";

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