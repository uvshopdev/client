import styled from "styled-components";

export const Container = styled.div`
  padding: 0 40px;
  width: 100%;
`;

export const Title = styled.h2`
  font-family: "Gabriela", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 44px;
  color: #3B3028;
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
  justify-content: flex-start;
  gap: 20px;
  cursor: pointer;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Montserrat Alternates", sans-serif;
`;

export const ReviewName = styled.span`
  /* Сделали ЖИРНЫМ (Bold 700) как на скриншоте */
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
`;

export const ReviewDate = styled.span`
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #3B3028;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
`;

export const Stars = styled.div`
  display: flex;
  gap: 6px;
`;

export const Text = styled.div`
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
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
    border: none;
    background: #3b3028;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
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
  font-family: "Montserrat Alternates", sans-serif;
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
`;