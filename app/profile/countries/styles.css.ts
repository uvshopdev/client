import styled from "styled-components";

import theme from "@/components/theme";

export const Content = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: auto 1fr;
    gap: 30px;

    & span {
        font-size: 26px;
    }
`;

export const MapContent = styled.div`
    width: 100%;
    height: 100%;
    
    border-radius: 30px;
    border: 1px solid ${theme.colors.secondary};

    overflow: hidden;
    
    & canvas {
        display: block;
        outline: none;
    }
`;
