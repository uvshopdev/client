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
    grid-auto-rows: 45px;
    gap: 25px 20px;
`;

export const Item = styled.button<{ $active?: boolean }>`
    justify-content: flex-start;
    gap: 12px;

    padding: 0 15px;
    
    border: ${({ $active }) => ($active ? "2px solid #3B3028" : "2px solid #D3D3D3")};
    border-radius: 12px;
    transition: all 0.2s ease;
    position: relative;


    & span {
        position: relative;
        
        width: 18px;
        height: 18px;

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
