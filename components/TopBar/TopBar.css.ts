"use client";

import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 15px 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 30px;
`;

export const Logo = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

export const Catalog = styled.button`
  width: max-content;

  display: flex;
  align-items: center;
  gap: 10px;

  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
`;

export const Search = styled.div`
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

    width: max-content;
    font-size: 100%;
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border: none;
  }
`;

export const Profile = styled.div`
  display: flex;
  gap: 25px;
  justify-self: end;

  button {
    padding: 0 15px;
    border-width: 1px;
    background: none;
    color: unset;
  }
`;
