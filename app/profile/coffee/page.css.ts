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

  h2 {
    font-weight: 400;
  }

  p {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 12px;
    color: #666;
    margin: 0;
  }
`;

export const CounterBadge = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: white;
  padding: 5px 20px;
  border-radius: 20px;
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
    stroke: ${({ theme }) => theme.colors.primaryLight};
    stroke-width: 5px;
    fill: none;
    vector-effect: non-scaling-stroke; 
  }
`;

export const NodeWrapper = styled.div<{ $top: string; $left: string; $closed?: boolean }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  
  transform: translate(-50%, -50%);
  z-index: 2;

  border-radius: 50%;

  padding: 15px;
  box-shadow: inset 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  background: #ffffff;

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #3b3028bd;
    opacity: ${({ $closed }) => ($closed ? "1" : "0")};
    backdrop-filter: blur(5px);
    border-radius: 50%;
    transition: all .3s ease;

    color: ${({ theme }) => theme.colors.secondary};
  }

  .collect {
    position: absolute;
    left: 50%;
    top: calc(100% + 10px);
    
    transform: translateX(-50%);
    padding: 5px 20px;
    background: #D3D3D3;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

export const ClaimButton = styled.button`
  background-color: #D3D3D3;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: not-allowed;
  
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

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
