import styled from "styled-components";

export const Content = styled.div`
    width: 100%;
    height: 100%;
    
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 30px;

    padding: 40px;

    @media (max-width: 990px) {
        grid-template-columns: minmax(0, 1fr);
        gap: 20px;
        padding: 20px;
    }
`;
