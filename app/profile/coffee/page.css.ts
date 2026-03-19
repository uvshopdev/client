import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

export const Card = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 40px;
  border: 1px solid #EAEAEA;
`;

export const HeaderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  h2 {
    font-family: 'Gabriela', serif;
    font-size: 26px;
    font-weight: 400; /* Gabriela обычно идет в normal */
    color: #3B3028;
    margin: 0 0 8px 0;
  }

  p {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 12px;
    color: #666;
    margin: 0;
  }
`;

export const CounterBadge = styled.div`
  background-color: #5C3D26;
  color: white;
  padding: 6px 20px;
  border-radius: 20px;
  
  /* Точные настройки шрифта из Фигмы */
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 14px;
  font-weight: 400; /* Не жирный */
`;

// === СЕКЦИЯ ЗИГЗАГА ===
export const TimelineContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px; 
  margin-top: 40px;
`;

export const TimelineLine = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  polyline {
    stroke: #5C3D26;
    stroke-width: 6px;
    fill: none;
    vector-effect: non-scaling-stroke; 
  }
`;

export const NodeWrapper = styled.div<{ $top: string; $left: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

/* Убрали старый NodeCircle и заменили на NodeImage для твоих SVG */
export const NodeImage = styled.img<{ $large?: boolean }>`
  /* Размер подгоняем под твои SVG, большой делаем чуть крупнее */
  width: ${({ $large }) => ($large ? "90px" : "75px")};
  height: ${({ $large }) => ($large ? "90px" : "75px")};
  object-fit: contain;
  /* Добавляем белую подложку-кружок, чтобы линия зигзага не просвечивала сквозь прозрачные места SVG */
  background-color: #FFF;
  border-radius: 50%;
`;

export const ClaimButton = styled.button`
  background-color: #D3D3D3;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: not-allowed;
  
  /* Точные настройки шрифта */
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

// === СЕКЦИЯ БЕСПЛАТНЫХ КОФЕ ===
export const FreeCoffeeGrid = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
  flex-wrap: wrap;
`;

export const FreeCoffeeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const ActionButton = styled.button`
  background-color: #4A3320;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s;

  /* Точные настройки шрифта */
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;