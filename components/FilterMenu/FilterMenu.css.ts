import styled from "styled-components";

import theme from "../theme";

export const Content = styled.div<{ $active?: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99999;
    
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
    transition: all 0.3s ease;
    
    display: flex;
    justify-content: flex-end;
`;

export const ContentWrapper = styled.div<{ $active: boolean }>`
    width: 600px;
    height: 100vh;
    background: #FFFFFF;
    
    display: flex;
    flex-direction: column;
    padding: 60px;
    gap: 32px;
    
    transform: ${({ $active }) => ($active ? "translateX(0)" : "translateX(100%)")};
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        width: 100%;
        padding: 30px 20px;
    }
`;

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    h2 {
        font-weight: 400;
    }
`;

export const Close = styled.button`
    width: 40px;
    height: 40px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    
    font-size: 20px;
    font-weight: bold;

    line-height: 1;

    &:hover {
        background: ${theme.colors.secondary};
    }
`;
export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2000;
    
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
    transition: opacity 0.3s ease;
    
    display: flex;
    justify-content: flex-end;
`;

export const SidebarContainer = styled.div<{ $isOpen: boolean }>`
    width: 600px;
    height: 100vh;
    background: #FFFFFF;
    
    display: flex;
    flex-direction: column;
    padding: 60px;
    gap: 32px;
    
    transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease;
    overflow-y: auto;

    @media (max-width: 768px) {
        width: 100%;
        padding: 30px 20px;
    }
`;

export const SidebarTitleBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const SidebarTitle = styled.h2`
    font-family: 'Gabriela', serif;
    font-weight: 400;
    font-size: 28px;
    color: #000000;
    margin: 0;
`;

export const SidebarCloseBtn = styled.button`
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    
    font-size: 20px;
    font-weight: bold;
    font-family: sans-serif;
    color: #3B3028;
    line-height: 1;

    &:hover {
        background: #f3eee9;
    }
`;

export const SidebarFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 32px;
    width: 100%;
`;

export const SidebarInputsGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;
    width: 100%;
`;

export const SidebarSelectGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

export const SidebarLabel = styled.label`
    font-family: 'Montserrat Alternates', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #000000;
`;

export const SidebarPriceGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 100%;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

export const SidebarPriceInputWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 14px;
    flex: 1;

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const SidebarPriceInput = styled.input`
    width: 100%;
    height: 45px;
    padding: 14px 20px;
    background: #FFFFFF;
    border: 1px solid #D3D3D3;
    border-radius: 12px;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
        border-color: #3B3028;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const SidebarRadioGroupRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
`;

export const VisuallyHiddenInput = styled.input`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

export const SidebarRadioLabel = styled.label<{ $isActive?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 14px 16px;
    gap: 12px;
    flex: 1;
    min-width: 200px;
    height: 45px;
    border: ${({ $isActive }) => ($isActive ? "2px solid #3B3028" : "1px solid #D3D3D3")};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    span {
        font-family: 'Montserrat Alternates', sans-serif;
        font-weight: 400;
        font-size: 12px;
        color: #000000;
        
        /* Запобігаємо виділенню тексту */
        user-select: none;
    }

    &::before {
        content: "";
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: ${({ $isActive }) => ($isActive ? "2px solid #3B3028" : "2px solid #D3D3D3")};
        flex-shrink: 0;
        transition: all 0.2s ease;
        box-sizing: border-box; /* Щоб border входив у розмір */
        background-color: #FFFFFF;
    }

    &::after {
        content: "";
        position: absolute;
        left: 20px; 
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${({ $isActive }) => ($isActive ? "#3B3028" : "transparent")};
        transform: ${({ $isActive }) => ($isActive ? "scale(1)" : "scale(0)")};
        transition: all 0.2s ease;
    }

    &:hover {
        border-color: #3B3028;
        &::before { border-color: #3B3028; }
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
    height: 45px;
    padding: 0 20px;
    background: #FFFFFF;
    
    border: 1px solid ${({ $isOpen }) => ($isOpen ? "#3B3028" : "#D3D3D3")};
    border-radius: 12px;
    cursor: pointer;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    user-select: none;
    transition: border-color 0.2s ease;

    span {
        flex: 1;
        text-align: left;
    }

    svg {
        flex-shrink: 0;
        transition: transform 0.3s ease;
        transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    }
`;

export const CustomSelectList = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #3B3028;
    border-radius: 12px;
    z-index: 100;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
`;

export const CustomSelectItem = styled.div<{ $isCancel?: boolean }>`
    padding: 0 20px;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: ${({ $isCancel }) => ($isCancel ? "#D3D3D3" : "#000000")};
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.6;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 10px;
`;

export const ApplyButton = styled.button`
    padding: 14px 32px;
    background: #3B3028;
    color: #FFFFFF;
    border: none;
    border-radius: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.8;
    }
`;

export const ClearButton = styled.button`
    background: transparent;
    border: none;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #cd2323;
    cursor: pointer;
    padding: 8px 0;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: transparent;
    transition: all 0.2s ease;

    &:hover {
        color: #a81c1c;
        text-decoration-color: #a81c1c;
    }
`;