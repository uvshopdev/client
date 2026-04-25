import styled from "styled-components";
import theme from "../theme";

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  padding: 30px;
  border: 1px solid ${theme.colors.secondary};
  border-radius: 15px;

  @media (max-width: 990px) {
    flex-direction: column;
    gap: 40px;
    padding: 20px;
  }
`;

export const AvatarSection = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PhotoFrameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* Подтягиваем нашу переименованную SVG рамочку */
  background-image: url('/frame.svg'); 
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  /* Рамочка прозрачна для кликов мышки */
  pointer-events: none;
  z-index: 10;
`;

export const ImageContainer = styled.div`
  position: relative;
  
  width: 195px; 
  height: 195px;
  
  border-radius: 50%;
  overflow: hidden;
  background-color: #ffffff;
  z-index: 5;

  &:hover > div {
    opacity: 1;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    z-index: 30;
  }
`;

export const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 20;
`;

export const FormSection = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;

  button {
    width: 100%;
    background: ${theme.colors.primary};
    color: #ffffff;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;

  input {
    padding: 10px 15px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
  }
`;

export const PasswordInputWrapper = styled.div`
    position: relative;
    width: 100%;

    input {
        padding-right: 44px; /* Місце для іконки ока */
    }
`;

export const PasswordToggle = styled.button`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #777 !important;
    cursor: pointer;
    transition: color 0.2s ease;
    width: auto !important; /* Перевизначаємо 100% width з вашого FormSection */

    &:hover {
        color: #111 !important;
        opacity: 1 !important;
    }
`;