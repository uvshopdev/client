import styled from "styled-components";

import theme from "../theme";

export const Content = styled.div`
    width: 280px;

    @media (max-width: 1024px) {
        width: 220px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const Items = styled.ul`
    width: 100%;
    height: 100%;

    display: grid;
    grid-auto-rows: 55px;
    gap: 8px;

    @media (max-width: 768px) {
        grid-auto-rows: unset;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(3, 1fr);
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

        & span {
            color: ${({ $active }) => ($active ? "#ffffff" : theme.colors.primary)};
            background: ${({ $active }) => ($active ? theme.colors.primary : "unset")};
        }
    }

    @media (max-width: 768px) {
        & a {
            flex-direction: column;
            justify-content: center;
            gap: 6px;
            padding: 10px 8px;
            border-radius: 12px;
            font-size: 11px;
            text-align: center;
            min-height: 70px;
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

    flex-shrink: 0;
`;
