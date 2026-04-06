import styled from "styled-components";

import theme from "@/components/theme";

// Глобальные стили для контента
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const PassportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 15px 30px;
  border-radius: 15px;
  border: 1px solid ${theme.colors.secondary};

  h2 {
    font-weight: 400;
  }

  button {
    height: 100%;

    border: none;
    background: #6F3F18;
    color: #ffffff;
    gap: 5px;
  }

  .badges {
    height: 100%;

    display: flex;
    gap: 15px;
  }
`;
