import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;

    font-size: 14px;
    & .info {
        font-size: 26px;
        margin-bottom: 10px;
        line-height: 1.2;
    }

    @media (max-width: 640px) {
        gap: 20px;
        & .info {
            font-size: 22px;
        }
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    width: 100%;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 75%;

    @media (max-width: 640px) {
        max-width: 100%;
    }
`;

export const InviteButton = styled.button`
    width: 141px;
    height: 45px;
    background: #3B3028;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-family: 'Montserrat Alternates', sans-serif;
    cursor: pointer;
    flex-shrink: 0; 
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #524339; 
    }

    @media (max-width: 640px) {
        width: 100%;
        margin-top: 10px;
    }
`;

export const Items = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    border-radius: 15px;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    padding: 10px 25px;

    font-size: 16px;
    
    & .status {
        font-size: 14px;
        margin-left: auto; 
        text-align: right;
        flex-shrink: 0;
    }

    & .image {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        
        & img {
            border-radius: 50%;
        }
    }

    @media (max-width: 640px) {
        padding: 10px 15px;
        font-size: 14px;
        
        & .status {
            font-size: 12px;
            max-width: 40%;
        }
    }
`;

/* === СТИЛІ МОДАЛЬНОГО ВІКНА === */
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
  border-radius: 24px; 
  padding: 60px 70px; 
  width: 100%;
  max-width: 680px; 
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.2); 

  @media (max-width: 640px) {
    padding: 40px 20px;
    width: calc(100% - 40px);
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

export const ModalTitle = styled.h3`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 26px; 
  font-weight: 600;
  color: #000000;
  margin-bottom: 35px;
  margin-top: 10px;

  @media (max-width: 640px) {
    font-size: 20px;
    margin-bottom: 25px;
  }
`;

export const LinkContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 490px;
  height: 37px; 
  margin: 0 auto;

  @media (max-width: 640px) {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const LinkInput = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;
  color: #4A4A4A;
  
  padding: 0 145px 0 20px; 
  
  background: #ffffff;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  outline: none;
  cursor: text;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 

  @media (max-width: 640px) {
    padding: 10px;
    height: 45px;
  }
`;

export const CopyButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  
  width: 128px; 
  height: 100%; 
  
  background: #3B3028; 
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Montserrat Alternates', sans-serif;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #524339; 
  }

  @media (max-width: 640px) {
    position: static;
    width: 100%;
    height: 45px;
  }
`;