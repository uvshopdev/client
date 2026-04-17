import styled from "styled-components";
import theme from "../theme";

export const Content = styled.div`
    width: 340px;

    @media (max-width: 990px) {
        width: 100%;
        min-width: 0; 
        margin-bottom: 0;
        overflow: hidden;
    }
`;

export const Items = styled.ul`
    width: 100%;
    height: 100%;

    display: grid;
    grid-auto-rows: 55px;
    gap: 8px;

    @media (max-width: 990px) {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        height: auto;
        
        width: 100%;
        min-width: 0;
        
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch; 
        
        gap: 10px;
        padding-bottom: 10px;
        
        scrollbar-width: thin; 
        &::-webkit-scrollbar {
            height: 6px; 
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: ${({ theme }) => theme.colors.secondary};
            border-radius: 10px;
        }
    }
`;

export const Item = styled.li<{ $active?: boolean }>`
    width: 100%;
    height: 100%;

    & a {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: start;
        gap: 15px;

        padding: 0 20px;

        border-radius: 15px;
        border: 1px solid ${({ $active }) => ($active ? theme.colors.primary : theme.colors.secondary)};

        font-weight: ${({ $active }) => ($active ? 500 : 400)};
        white-space: nowrap;
        transition: 0.2s;

        & span {
            color: ${({ $active }) => ($active ? "#ffffff" : theme.colors.primary)};
            background: ${({ $active }) => ($active ? theme.colors.primary : "unset")};
        }
    }

    @media (max-width: 990px) {
        width: auto;
        flex: 0 0 auto;
        
        & a {
            padding: 10px 15px;
            gap: 10px;
            border-radius: 12px;
        }
    }
`;

export const ItemIcon = styled.span`
    width: max-content;
    height: max-content;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 6px;
    border: 1px solid ${theme.colors.primary};
    border-radius: 50%;
`;
