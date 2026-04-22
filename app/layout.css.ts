import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const Shell = styled.div`
    min-height: 100dvh;

    display: flex;
    flex-direction: column;
`;

export const Main = styled.main`
    width: 100%;
    flex: 1;
    min-height: 0;

    display: flex;
    flex-direction: column;
`;

export const GlobalStyles = createGlobalStyle`
  @media (max-width: 640px) {
    [data-sonner-toaster] {
      bottom: auto !important;
      top: 85px !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      z-index: 9999 !important;

      display: flex !important;
      justify-content: center !important;
      pointer-events: none !important;
    }

    [data-sonner-toast] {
      pointer-events: auto !important;
      width: auto !important;
      max-width: 90vw !important;
      margin: 0 auto !important;
    }
  }

  [data-sonner-toast] [data-close-button] {
    left: auto !important;
    right: 12px !important;
    
    top: 50% !important; 
    transform: translateY(-50%) !important; 
    
    width: 24px !important;
    height: 24px !important;
    background: transparent !important;
    border: 1px solid #EAEAEA !important;
  }
`;