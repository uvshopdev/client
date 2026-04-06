import styled from "styled-components";

import theme from "../theme";

export const Items = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 20px;

    overflow-y: auto;
`;
export const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    border-radius: 15px;
    border: 1px solid ${theme.colors.secondary};
    padding: 10px 25px;

    font-size: 16px;
    
    & .status {
        font-size: 14px;
        margin-left: auto
    }

    & .image {
        display: flex;
        justify-content: center;
        align-items: center;
        
        & img {
            border-radius: 50%;
        }
    }
`;
