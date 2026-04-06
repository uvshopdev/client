import styled from "styled-components";

export const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: inherit;
  color: #333;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 35px;
  color: #3a2e28;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
`;

export const EmptyText = styled.p`
  font-size: 24px;
  color: #555;
  margin-bottom: 30px;
`;

export const EmptyButton = styled.button`
  background-color: #433327;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #2c2119;
  }
`;

export const ContentGrid = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  flex: 2;
  width: 100%;
  min-width: 0;
`;

export const LeftBox = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 30px;
  background: #ffffff;
`;

export const RightColumn = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 320px;
  position: sticky;
  top: 20px;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.5fr;
  padding-bottom: 15px;
  border-bottom: 1px solid #eaeaea;
  font-weight: 500;
  color: #999;
  font-size: 13px;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.5fr;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid #eaeaea;
`;

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 600;
  font-size: 15px;
  color: #222;
`;

export const ItemPrice = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 15px;
    font-weight: 600;
    color: #000;
  }

  span {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
  }
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
`;

export const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  button {
    padding: 10px 15px;
    border-color: ${({ theme }) => theme.colors.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  span {
    font-weight: 500;
    width: 15px;
    text-align: center;
    font-size: 14px;
    color: #222;
  }
`;

export const RemoveButton = styled.button`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;

  transition: all 0.3s ease;
`;

export const PromoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

export const PromoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  padding-bottom: 25px;
  color: #222;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 360px;

  input {
    border: none;
    padding: 12px 16px;
    outline: none;
    font-size: 14px;
    flex: 1;

    &::placeholder {
      color: #aaa;
    }

    &:disabled {
      background-color: #f9f9f9;
    }
  }

  button {
    background-color: #433327;
    color: white;
    border: none;
    padding: 0 24px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: 0.2s;

    &:hover:not(:disabled) {
      background-color: #2c2119;
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
  font-size: 13px;
  font-weight: 500;
  color: #444;
  margin-top: 25px;
`;

export const AlertIcon = styled.div`
  background-color: #433327;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
`;

export const SummaryBlock = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px 25px;
  background-color: #ffffff;

  h3 {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 20px;
    margin-top: 0;
    color: #3a2e28;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  color: #555;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 15px;
  font-weight: 700;
  font-size: 15px;
  color: #222;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  background-color: #433327;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 25px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #2c2119;
  }
`;

export const CountryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  font-weight: 500;
  color: #222;

  &:last-of-type {
    border-bottom: none;
  }

  button {
    background: none;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 4px 12px;
    cursor: pointer;
    color: #555;
    display: flex;
    align-items: center;
    height: 32px;
    transition: 0.2s;

    &:hover {
      border-color: #433327;
      color: #433327;
    }
  }
`;

export const SmallText = styled.p`
  font-size: 11px;
  color: #888;
  margin-top: 15px;
  line-height: 1.4;
`;

export const ToastNotification = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  span {
    font-size: 13px;
    font-weight: 500;
    color: #333;
  }

  button {
    background: none;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #888;
    transition: 0.2s;

    &:hover {
      background: #f0f0f0;
      color: #333;
    }
  }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

export const ToastIconWrapper = styled.div`
  background: #433327;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  position: relative;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    transition: 0.2s;

    &:hover {
      color: #000;
    }
  }

  h4 {
    margin: 0 0 30px 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    line-height: 1.4;
  }

  .stamp-img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
