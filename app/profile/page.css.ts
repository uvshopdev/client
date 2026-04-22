import styled from "styled-components";

import theme from "@/components/theme";

// Глобальные стили для контента
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const PassportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 15px 30px;
  border-radius: 15px;
  border: 1px solid ${theme.colors.secondary};

  h2 {
    font-weight: 400;
    margin: 0;
  }

  button {
    display: flex;
    align-items: center;
    height: 100%;
    border: none;
    background: #6F3F18;
    color: #ffffff;
    gap: 5px;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  .badges {
    height: 100%;
    display: flex;
    gap: 15px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 15px 20px;

    .badges {
      width: 100%;
      justify-content: flex-start;
      gap: 10px;
    }

    button {
      padding: 8px 12px;
      font-size: 14px;
    }
  }
`;

/* === СТИЛІ ДЛЯ МОДАЛЬНОГО ВІКНА СТАТУСУ === */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

export const ModalBox = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 40px 50px;
  width: calc(100% - 40px); 
  max-width: 520px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);

  @media (max-width: 640px) {
    padding: 30px 20px;
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #3B3028; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px; 
  border-radius: 50%; 
  transition: all 0.2s ease-in-out; 

  &:hover {
    background-color: #524339;
    color: #ffffff; 
  }

  @media (max-width: 640px) {
    top: 15px;
    right: 15px;
  }
`;

export const StatusModalBox = styled(ModalBox)`
  max-width: 680px;
  padding: 60px 50px;
  align-items: stretch; 
  text-align: left;
  max-height: 90vh; 
  overflow-y: auto; 

  @media (max-width: 640px) {
    padding: 45px 20px 30px;
  }
`;

export const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 30px; 
  margin-bottom: 60px; 

  @media (max-width: 640px) {
    flex-direction: column; 
    gap: 15px;
    margin-top: 10px;
    margin-bottom: 40px;
  }
`;

export const StatusTitleBlock = styled.div`
  h3 {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 26px;
    font-weight: 600;
    color: #000000;
    margin: 0 0 8px 0;

    @media (max-width: 640px) {
      font-size: 22px;
    }
  }
  span {
    font-size: 14px;
    color: #666666;
  }
`;

export const StatusBadge = styled.div`
  background: #6F3F18;
  color: #ffffff;
  padding: 12px 25px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 500;

  @media (max-width: 640px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

export const TimelineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 50px;
  width: 100%;

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

export const TimelineLineBase = styled.div`
  position: absolute;
  top: 25px;
  left: 50px; 
  right: 50px; 
  height: 4px;
  background: #F5F5F5;
  z-index: 1;

  @media (max-width: 640px) {
    top: 20px;
    left: 20px;
    right: 20px;
  }
`;

export const TimelineLineActive = styled.div<{ $progress: number }>`
  position: absolute;
  top: 25px;
  left: 50px;
  width: ${({ $progress }) => `calc((100% - 100px) * ${$progress / 100})`};
  height: 4px;
  background: #3B3028;
  z-index: 2;
  transition: width 0.4s ease-in-out;

  @media (max-width: 640px) {
    top: 20px;
    left: 20px;
    width: ${({ $progress }) => `calc((100% - 40px) * ${$progress / 100})`};
  }
`;

export const TimelineNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 3;
  width: 100px; 
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 640px) {
    width: 70px;
    gap: 8px;
  }
`;

export const TimelineCircle = styled.div<{ $active?: boolean; $achieved?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-sizing: border-box;

  box-shadow: 0 0 0 6px #ffffff; 

  background-color: ${({ $achieved }) => ($achieved ? "#3B3028" : "#ffffff")};
  color: ${({ $achieved }) => ($achieved ? "#ffffff" : "#4A4A4A")};
  border: ${({ $achieved }) => ($achieved ? "none" : "1px dashed #A0A0A0")};

  ${({ $active, $achieved }) =>
    $active &&
    `
    border: 3px solid ${$achieved ? "#6F3F18" : "#3B3028"}; 
    ${$achieved ? "" : "color: #000000; font-weight: 600;"}
  `}

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
    font-size: 12px;
    box-shadow: 0 0 0 4px #ffffff;
  }
`;

export const TimelineLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  white-space: pre-line; 
  line-height: 1.3;

  @media (max-width: 640px) {
    font-size: 11px;
  }
`;

export const InfoCard = styled.div`
  border: 1px solid #EAEAEA;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoCardTitle = styled.h4`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  margin: 0 0 25px 0;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid #F0F0F0;
  font-size: 15px;
  color: #4A4A4A;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  span:nth-child(2) {
    font-weight: 600;
    color: #000000;
  }
`;

export const BonusRow = styled.div`
  padding: 18px 0;
  border-bottom: 1px solid #F0F0F0;
  font-size: 15px;
  color: #4A4A4A;
  line-height: 1.5;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;
