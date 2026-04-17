import Link from "next/link";
import styled from "styled-components";

export const Content = styled.div<{ $active?: boolean }>`
    position: fixed;
    left: 15px;
    top: 85px;

    width: calc(100% - 30px);
    height: ${(props) => (props.$active ? "40dvh" : "0")};
    opacity: ${(props) => (props.$active ? 1 : 0)};

    pointer-events: ${({ $active }) => ($active ? "auto" : "none")};

    transition: all .3s ease;
    will-change: height, opacity;
    z-index: 100000;

    @media (max-width: 990px) {
        height: ${(props) => (props.$active ? "75dvh" : "0")};
    }
`;

export const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 30px;
    
    padding: 15px 30px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    background: #ffffff;

    overflow: hidden;

    @media (max-width: 990px) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto 1fr;
        gap: 15px;
        padding: 15px;

        width: 100%;
        max-width: 100%;
    }
`;

export const Categories = styled.ul`
    height: 100%;

    display: grid;
    grid-auto-rows: 40px;
    
    overflow-y: auto;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;

    margin: 0;
    padding: 0;

    @media (max-width: 990px) {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        
        width: 100%;
        height: auto;
        min-width: 0;
        
        overflow-x: auto;
        overflow-y: hidden;

        border: none;
        border-radius: 0;
        gap: 10px;
        padding: 0 0 10px 0;
        
        -webkit-overflow-scrolling: touch;
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

export const Category = styled.li<{ $active?: boolean }>`
    width: 100%;
    list-style: none;
    
    button {
        padding: 0 20px;

        width: 100%;
        height: 100%;
        border-radius: 0;

        background: ${(params) => (params.$active ? params.theme.colors.primary : "unset")};
        border: none;
        color: ${(params) => (params.$active ? "#ffffff" : "unset")};
        white-space: normal;

        transition: 0.2s;
    }

    &:hover button {
        background: ${(props) => props.theme.colors.primary};
        color: #ffffff;
    }

    @media (max-width: 990px) {
        width: auto;
        flex-shrink: 0; 
        
        button {
            border-radius: 20px;
            border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.secondary)};
            padding: 8px 16px;
            
            white-space: nowrap; 
            text-align: center;
        }
    }
`;

export const SubCategories = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: max-content;
    gap: 20px;

    overflow-y: auto;
    padding-right: 5px;

    @media (max-width: 990px) {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 15px;
    }
`;

export const SubCategory = styled(Link)<{ $active?: boolean }>`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: flex-start;

    gap: 10px;
    padding: 15px 10px;

    height: 100%;
    text-align: center;

    color: ${(params) => (params.$active ? "#ffffff" : "unset")};
    background: ${({ $active, theme }) => ($active ? theme.colors.primary : "unset")};

    border-radius: 10px;
    border: 1px solid ${({ $active, theme }) => ($active ? "none" : theme.colors.secondary)};
    transition: 0.2s;

    & img {
        object-fit: fill;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        flex-shrink: 0;
    }
    
    &:hover {
        background: ${(props) => props.theme.colors.primary};
        color: #ffffff;
    }

    @media (max-width: 990px) {
        gap: 10px;
        padding: 15px 10px;
        font-size: 13px;
        
        & img {
            width: 60px;
            height: 60px;
        }
    }
`;
