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

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

export const Bar = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  & button {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border: none;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
    height: 44px;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.2s;

    svg {
      pointer-events: none;
    }

    &:hover {
      opacity: 0.9;
    }
  }

  @media (max-width: 640px) {
    gap: 15px;
    
    & button {
      padding: 0 10px;
      height: 40px;
      span {
        display: none;
      }
    }
  }
`;

export const Logo = styled(Link)`
  position: relative;
  width: 40px;
  height: 40px;
  display: block;
`;

export const Right = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 25px;

  button, a {
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.primary};  
    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    
    padding: 0 15px;
    height: 44px;
    box-sizing: border-box;
    
    cursor: pointer;
    background: transparent;
    color: inherit;
    text-decoration: none;
    transition: background 0.2s, opacity 0.2s;

    svg {
      pointer-events: none;
    }

    &:hover {
      background: #f3eee9;
    }
  }

  @media (max-width: 990px) {
    gap: 12px; 
  }

  @media (max-width: 640px) {
    gap: 8px;
    
    button, a {
      padding: 0 10px;
      height: 40px;
      gap: 5px;
    }
  }
`;
