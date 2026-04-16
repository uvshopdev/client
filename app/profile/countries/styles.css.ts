import styled from "styled-components";

import theme from "@/components/theme";

export const Content = styled.div`
    width: 100%;
    height: auto;

    display: grid;
    grid-template-rows: auto 1fr;
    gap: 30px;

    & span {
        font-size: 26px;
    }
`;

export const MapContent = styled.div`
    width: 100%;
    min-height: 650px;
    height: 70vh;
    
    border-radius: 30px;
    border: 1px solid ${theme.colors.secondary};
    background: ${theme.colors.surfaceElevated};

    overflow: hidden;
    position: relative;
    
    & canvas {
        display: block;
        outline: none;
    }

    @media (max-width: 1024px) {
        min-height: 500px;
    }

    @media (max-width: 640px) {
        min-height: 400px;
        border-radius: 20px;
    }
`;
