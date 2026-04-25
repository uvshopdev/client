import styled from "styled-components";

export const Container = styled.div`
  padding: 0 40px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 0 20px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const Title = styled.h2`
  font-size: 34px;
  font-family: "Gabriela", serif;
  font-weight: 400;
  color: #3b3028;
  margin: 0;
`;

export const ReviewSummary = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 8px;
  font-family: "Montserrat Alternates", sans-serif;
  color: #6f6258;
`;

export const SummaryRating = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #3b3028;
`;

export const SummaryCount = styled.span`
  font-size: 13px;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const SeeAllBtn = styled.button`
  background: none;
  border: none;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #3B3028;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover { opacity: 0.7; }
`;

export const WriteBtn = styled.button`
  background: #3B3028;
  color: #fff;
  border: none;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 500;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;

  &:hover {
    background: #523C30;
  }

  @media (max-width: 640px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

export const SliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

export const Slider = styled.div`
  display: flex;
  transition: transform 0.4s ease-in-out;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    transform: none !important;
  }
`;

export const Page = styled.div`
  min-width: 100%;
  display: flex;
  gap: 30px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;

    &:not(:first-child) {
      display: none;
    }
  }
`;

export const Card = styled.button`
  flex: 1;
  background: #fff;
  border: 1px solid #e9e3d9;
  border-radius: 16px;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s;
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  appearance: none;
  font: inherit;
  align-items: stretch;

  &:hover {
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }

  &:focus-visible {
    outline: 2px solid #3b3028;
    outline-offset: 2px;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyState = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  min-height: 160px;
  border: 1px dashed #e9e3d9;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: #6f6258;
  font-family: "Montserrat Alternates", sans-serif;
  background: #fff;
  box-sizing: border-box;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #3b3028;
`;

export const CardDate = styled.span`
  font-weight: 400;
  color: #777;
  white-space: nowrap;
  text-align: right;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  justify-content: flex-start;
`;

export const ModalRatingRow = styled(RatingRow)`
  margin-bottom: 20px;
`;

export const RatingValue = styled.span`
  font-weight: 600;
  font-family: "Montserrat Alternates", sans-serif;
`;

export const Stars = styled.div`
  display: flex;
  gap: 4px;
`;

export const Text = styled.div`
  font-size: 14px;
  line-height: 1.6;
  font-family: "Montserrat Alternates", sans-serif;
  color: #3b3028;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-right: 4px;

  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  width: 100%;
  text-align: left;
`;

export const Controls = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;

  @media (max-width: 1024px) {
    display: none;
  }

  button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid #3b3028;
    background: #3b3028;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-family: sans-serif;
    line-height: 1;
    padding-bottom: 4px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      opacity: 0.8;
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
    background: #e9e3d9;
    transition: background 0.3s;
    cursor: pointer;
  }

  .active {
    background: #3b3028;
  }
`;

/* ===== МОДАЛКИ ===== */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

export const SingleModalContent = styled.div`
  position: relative;
  background: #fff;
  border-radius: 30px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);

  @media (max-width: 640px) {
    padding: 60px 20px 30px 20px;
  }
`;

export const AllModalContent = styled.div`
  background: #FFFFFF;
  border-radius: 30px;
  width: 95%;
  max-width: 1200px;
  height: auto;
  max-height: 88vh;
  position: relative;
  padding: 60px 40px 40px 40px; 
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 60px 20px 20px 20px; 
    max-height: 92vh;
  }
`;

export const ModalHeader = styled.div`
  flex-shrink: 0;
  margin-bottom: 30px;
`;

export const WriteModalHeader = styled(ModalHeader)`
  margin-bottom: 40px;
`;

export const ModalReviewHeader = styled.div`
  margin-bottom: 10px;
`;

export const ModalReviewName = styled(Title)`
  font-size: 24px;
`;

export const ModalDate = styled.div`
  color: #777;
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
`;

export const ModalScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  align-content: start;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #E9E3D9; border-radius: 10px; }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ModalText = styled.div`
  background: #F7F3E7;
  border-radius: 16px;
  padding: 20px;
  font-size: 14px;
  line-height: 1.6;
  color: #3b3028;
  font-family: "Montserrat Alternates", sans-serif;

  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #3B3028;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: opacity 0.2s;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
  padding: 0; 
  line-height: 1;

  &:hover { opacity: 0.8; }

  @media (max-width: 640px) {
    top: 15px;
    right: 15px;
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormLabel = styled.div`
  margin-bottom: 12px;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 600;
  color: #3b3028;
`;

export const StarSelector = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 1px solid #e9e3d9;
  border-radius: 16px;
  background: #F7F3E7;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 14px;
  color: #3b3028;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b3028;
  }
`;

export const SubmitBtn = styled.button`
  background: #3B3028;
  color: #fff;
  border: none;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 500;
  font-size: 14px;
  padding: 14px 24px;
  border-radius: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
  align-self: flex-start;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;