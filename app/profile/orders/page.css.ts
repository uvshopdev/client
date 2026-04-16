import styled from "styled-components";

export const PageWrapper = styled.main`
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 20px 24px 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: "Montserrat Alternates", sans-serif;

  @media (max-width: 640px) {
    padding: 16px 14px 24px;
    gap: 16px;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-family: "Gabriela", serif;
  font-size: clamp(30px, 4vw, 40px);
  font-weight: 400;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const OrderCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(25, 16, 8, 0.04);
`;

export const OrderTop = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceElevated};
  }

  @media (max-width: 640px) {
    padding: 14px;
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const OrderNumber = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

export const OrderDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const CollapseIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DetailsPanel = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  padding: 0 20px 20px;

  @media (max-width: 640px) {
    padding: 0 14px 14px;
  }
`;

export const TimelineWrapper = styled.div`
  position: relative;
  margin: 6px 0 20px;
  padding: 8px 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
`;

export const TimelineTrack = styled.div`
  position: absolute;
  left: 38px;
  right: 38px;
  top: 29px;
  height: 3px;
  background: ${({ theme }) => theme.colors.secondary};
  z-index: 0;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const TimelineProgress = styled.div<{ $progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.25s ease;
`;

export const Step = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const StepCircle = styled.div<{ $state: "completed" | "active" | "pending" }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 600;
  background: ${({ theme, $state }) => ($state === "pending" ? theme.colors.surface : theme.colors.primary)};
  color: ${({ theme, $state }) => ($state === "pending" ? theme.colors.textSecondary : theme.colors.surface)};
  border: 1px solid
    ${({ theme, $state }) =>
		$state === "active" ? theme.colors.primary : $state === "pending" ? theme.colors.secondary : theme.colors.primary};
  box-shadow: ${({ $state }) => ($state === "active" ? "0 0 0 3px rgba(59, 48, 40, 0.12)" : "none")};
`;

export const StepLabel = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 130px;

  @media (max-width: 640px) {
    font-size: 10px;
    max-width: 75px;
  }
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProductRow = styled.article`
  display: grid;
  grid-template-columns: 84px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.surfaceElevated};

  @media (max-width: 640px) {
    grid-template-columns: 64px 1fr;
  }
`;

export const ProductImage = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.surface};
  object-fit: contain;

  @media (max-width: 640px) {
    width: 64px;
    height: 64px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ProductName = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.4;
`;

export const ProductMeta = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProductPriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 640px) {
    grid-column: 2;
    align-items: flex-start;
  }
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProductQty = styled.p`
  margin: 2px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EmptyState = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  padding: 18px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
`;
