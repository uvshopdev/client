import styled from "styled-components";

export const Wrapper = styled.div`
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

export const Title = styled.h1`
  margin: 0;
  font-family: "Gabriela", serif;
  font-size: clamp(30px, 4vw, 40px);
  font-weight: 400;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.primary};
`;

export const TimelineWrapper = styled.div`
  position: relative;
  padding: 8px 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
`;

export const TimelineTrack = styled.div`
  position: absolute;
  left: 40px;
  right: 40px;
  top: 30px;
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

export const Circle = styled.div<{ $state: "completed" | "active" | "pending" }>`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  font-size: 14px;
  font-weight: 600;

  background: ${({ theme, $state }) => ($state === "pending" ? theme.colors.surface : theme.colors.primary)};
  color: ${({ theme, $state }) => ($state === "pending" ? theme.colors.textSecondary : theme.colors.surface)};
  border: 1px solid
    ${({ theme, $state }) => ($state === "active" ? theme.colors.primary : $state === "pending" ? theme.colors.secondary : theme.colors.primary)};
  box-shadow: ${({ $state }) => ($state === "active" ? "0 0 0 3px rgba(59, 48, 40, 0.12)" : "none")};

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    font-size: 12px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const StepLabel = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 140px;

  @media (max-width: 640px) {
    font-size: 11px;
    max-width: 88px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};

  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 640px) {
    padding: 14px;
    border-radius: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const fieldBase = `
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid;
  outline: none;
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  transition: border-color 0.2s, box-shadow 0.2s;
`;

export const Input = styled.input`
  ${fieldBase}

  background: ${({ theme }) => theme.colors.surface};
  border-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(59, 48, 40, 0.08);
  }
`;

export const CustomSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const CustomSelectHeader = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $isOpen }) => ($isOpen ? theme.colors.primary : theme.colors.secondary)};
  border-radius: 10px;
  box-shadow: ${({ $isOpen }) => ($isOpen ? "0 0 0 2px rgba(59, 48, 40, 0.08)" : "none")};
  cursor: pointer;
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: border-color 0.2s, box-shadow 0.2s;
  user-select: none;

  span {
    flex: 1;
    text-align: left;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const CustomSelectList = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  z-index: 100;
  padding: 14px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
`;

export const CustomSelectItem = styled.div`
  padding: 0 14px;
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 108px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  outline: none;
  resize: vertical;
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(59, 48, 40, 0.08);
  }
`;

export const Controls = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 2px auto 0;

  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const IconButton = styled.button`
  width: 44px;
  height: 44px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    cursor: default;
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  svg {
    width: 22px;
    height: 22px;
    stroke-width: 2.2;
    flex-shrink: 0;
  }
`;

export const SubmitButton = styled.button`
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  font-size: 14px;
  font-weight: 500;
  font-family: "Montserrat Alternates", sans-serif;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) => theme.colors.overlay};
`;

export const ModalContent = styled.div`
  width: min(440px, 100%);
  padding: 22px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.surface};

  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-family: "Gabriela", serif;
  font-size: 26px;
  font-weight: 400;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

export const ModalBtnOutline = styled.button`
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 14px;
  font-weight: 500;
  font-family: "Montserrat Alternates", sans-serif;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ModalBtnSolid = styled.button`
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  border: none;

  font-size: 14px;
  font-weight: 500;
  font-family: "Montserrat Alternates", sans-serif;
  cursor: pointer;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
