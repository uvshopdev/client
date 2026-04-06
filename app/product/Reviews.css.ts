import styled from "styled-components";

export const Container = styled.div`
  padding: 0 40px;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 34px;
  font-family: "Gabriela", serif;
  color: #3b3028;
  margin-bottom: 30px;
`;

export const SliderWrapper = styled.div`
  overflow: hidden;
`;

export const Slider = styled.div`
  display: flex;
  gap: 30px;
  transition: 0.3s ease;
`;

export const Card = styled.div`
  min-width: 460px;
  height: 163px;
  background: #fff;
  border: 1px solid #e9e3d9;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  margin-bottom: 20px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Montserrat Alternates";
  font-size: 16px;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 10px;
`;

export const Stars = styled.div`
  display: flex;
  gap: 4px;
`;

export const Text = styled.div`
  font-size: 14px;
  font-family: "Montserrat Alternates";
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const Controls = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;

  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #3b3028;
    background: #3b3028;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      opacity: 0.7;
      cursor: default;
    }
  }
`;

export const Dots = styled.div`
  display: flex;
  gap: 12px;

  div {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #e5e5e5;
  }

  .active {
    background: #3b3028;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: #00000050;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  position: relative;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 30px #000;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  strong {
    display: block;
    font-size: 18px;
  }

  span {
    font-size: 14px;
    color: #777;
  }
`;

export const ModalText = styled.div`
  position: relative; 
  background: #e9e3d9;
  border-radius: 16px;
  padding: 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #3b3028;
  line-height: 1;
  transition: transform 0.2s;

  &:hover {
    transform: rotate(90deg);
  }
`;