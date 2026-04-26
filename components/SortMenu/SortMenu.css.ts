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

export const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(45px, auto);
    gap: 25px 20px;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 15px;
    }
`;

export const Item = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

    padding: 10px 15px;
    background: transparent;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 14px;
    
    white-space: normal;
    text-align: left;
    
    border: ${({ $active }) => ($active ? "2px solid #3B3028" : "2px solid #D3D3D3")};
    border-radius: 12px;
    transition: all 0.2s ease;
    position: relative;
    cursor: pointer;
    color: #3B3028;

    & span {
        position: relative;
        
        width: 18px;
        height: 18px;
        flex-shrink: 0;

        border-radius: 50%;
        border: ${({ $active }) => ($active ? "2px solid #3B3028" : "2px solid #D3D3D3")};
        transition: all 0.2s ease;
        box-sizing: border-box;

        &::before {
            content: "";

            position: absolute;
            left: 50%; 
            top: 50%;
            transform: translate(-50%, -50%) ${({ $active }) => ($active ? "scale(1)" : "scale(0)")};
            
            width: 10px;
            height: 10px;

            border-radius: 50%;
            background-color: ${({ $active }) => ($active ? "#3B3028" : "transparent")};
            transition: all 0.2s ease;
        }
    }

    &:hover {
        border-color: #3B3028;
        & span { border-color: #3B3028; }
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

    @media (max-width: 640px) {
        flex-direction: column-reverse;
        align-items: stretch;
        gap: 15px;
    }
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