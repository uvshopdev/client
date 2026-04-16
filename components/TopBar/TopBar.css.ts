"use client";

import Link from "next/link";
import styled from "styled-components";

export const Content = styled.div`
  width: 100%;

  position: sticky;
  top: 0;
  z-index: 1000;
  background: #ffffff;

  padding: 15px 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  will-change: height;
`;

export const Bar = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  input, button {
    width: 100%;
    height: 100%;
  }
  button {
    width: max-content;
  }
`;

export const Left = styled.div`
  display: flex;
  gap: 30px;

  & button {
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border: none;
    gap: 10px;
  }
`;

export const Logo = styled(Link)`
  position: relative;
  width: 40px;
  height: 40px;
`;

export const Center = styled.div`
  position: relative;
  display: flex;
  justify-self: center;

  min-width: 220px;
  max-width: 470px;
  width: 100%;

  button {
    position: absolute;
    top: 0;
    right: 0;

    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border: none;
  }

  @media (max-width: 990px) {
    button {
      display: none;
    }
  }
`;

export const Right = styled.div`
  position: relative;

  display: flex;
  gap: 25px;
  justify-self: end;

  button, a {
    width: 100%;
    
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.primary};  
    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    
    padding: 0 15px;
  }

  @media (max-width: 990px) {
    & .desktop {
      display: none;
    }
  }
`;
