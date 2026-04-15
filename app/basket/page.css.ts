import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1520px;
  margin: 0 auto;
  padding: 20px 40px 40px; 
`;

export const Title = styled.h1`
  font-family: "Gabriela", serif;
  font-weight: 400;
  font-size: 34px;
  line-height: 44px;
  color: #3B3028;
  margin: 0 0 40px 0;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
`;

export const EmptyText = styled.p`
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #3B3028;
  margin-bottom: 30px;
`;

export const EmptyButton = styled.button`
  background-color: #3B3028;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ContentGrid = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;

  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const LeftBox = styled.div`
  border: 1px solid #E9E3D9;
  border-radius: 20px;
  padding: 30px 40px;
  background: #ffffff;
`;

export const RightColumn = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-shrink: 0;

  @media (max-width: 990px) {
    width: 100%;
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.3fr;
  padding-bottom: 20px;
  border-bottom: 1px solid #E9E3D9;
  
  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #A4A4A4;
  }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.3fr;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #E9E3D9;
`;

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  .image-wrap {
    position: relative;
    width: 60px;
    height: 80px;
    background: #f3eee9;
    border-radius: 8px;
    overflow: hidden;
  }

  p {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    margin: 0;
    max-width: 250px;
  }
`;

export const ItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #000000;
  }

  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: #A4A4A4;
  }
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;
`;

export const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  button {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: 1px solid #D3D3D3;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    color: #000000;
    transition: 0.2s;

    &:hover:not(:disabled) {
      border-color: #3B3028;
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .qty-value {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: #000000;
    width: 20px;
    text-align: center;
  }
`;

export const RemoveButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #3B3028;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const PromoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PromoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;

  &.bordered {
    border-top: 1px solid #E9E3D9;
  }

  > p {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #000000;
    margin: 0;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: stretch;
  width: 400px;
  height: 48px;

  input {
    flex: 1;
    border: 1px solid #E9E3D9;
    border-right: none;
    border-radius: 12px 0 0 12px;
    padding: 0 20px;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 14px;
    outline: none;
    color: #000;

    &::placeholder {
      color: #A4A4A4;
    }

    &:disabled {
      background-color: #f9f9f9;
    }
  }

  button {
    background-color: #3B3028;
    color: white;
    border: none;
    border-radius: 0 12px 12px 0;
    padding: 0 30px;
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }

    &:disabled {
      background-color: #888;
      cursor: default;
    }
  }
`;

export const InfoText = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;

  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 500;
    font-size: 12px;
    color: #3B3028;
  }
`;

export const AlertIcon = styled.div`
  background-color: #3B3028;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
  font-family: "Montserrat Alternates", sans-serif;
`;

export const SummaryBlock = styled.div`
  border: 1px solid #E9E3D9;
  border-radius: 20px;
  padding: 30px;
  background-color: #ffffff;

  h3 {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #3B3028;
    margin: 0 0 24px 0;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #E9E3D9;
  
  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #A4A4A4;
  }

  span:last-child {
    color: #000000;
  }
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  
  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #000000;
  }

  .total-price {
    font-size: 20px;
  }

  .total-miles {
    color: #3B3028;
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  height: 52px;
  background-color: #3B3028;
  color: white;
  border: none;
  border-radius: 12px;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin-top: 30px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const CountryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #E9E3D9;

  &.last {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #000000;
  }

  button {
    background: none;
    border: 1px solid #E9E3D9;
    border-radius: 8px;
    padding: 6px 14px;
    cursor: pointer;
    color: #A4A4A4;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    &:hover {
      border-color: #3B3028;
      color: #3B3028;
    }
  }
`;

export const SmallText = styled.p`
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #A4A4A4;
  margin: 24px 0 0 0;
  line-height: 1.4;
`;

export const ToastNotification = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  background: white;
  border: 1px solid #E9E3D9;
  border-radius: 30px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #000;
  }

  button {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    color: #A4A4A4;
    transition: 0.2s;

    &:hover {
      color: #3B3028;
    }
  }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

export const ToastIconWrapper = styled.div`
  background: #3B3028;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

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
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 40px 50px;
  width: 100%;
  max-width: 520px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);

  h4 {
    margin: 0 0 30px 0;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #000;
    line-height: 1.4;
  }

  .stamp-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 0 auto;
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
`;