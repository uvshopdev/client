"use client";

import Link from "next/link";
import styled from "styled-components";

export const Content = styled.div`
  width: 100%;

  padding: 15px 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  will-change: height;

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
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

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr auto;
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: auto 1fr auto;
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

  @media (max-width: 640px) {
    gap: 12px;

    & button span {
      display: none;
    }
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

  & button {
    position: absolute;
    top: 0;
    right: 0;

    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border: none;
  }

  @media (max-width: 640px) {
    min-width: unset;

    & button {
      font-size: 0;
      width: 40px;
      padding: 0;
    }
  }
`;

export const Right = styled.div`
  position: relative;

  display: flex;
  gap: 25px;
  justify-self: end;

  & button, a {
    width: 100%;

    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.primary};

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    padding: 0 15px;
  }

  @media (max-width: 640px) {
    gap: 12px;

    & button, a {
      padding: 0 10px;
    }
  }
`;
