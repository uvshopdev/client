import styled from "styled-components";

export const Content = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 30px;

    padding: 40px;

    @media (max-width: 1024px) {
        grid-template-columns: 220px 1fr;
        gap: 20px;
        padding: 30px;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 20px;
    }
`;
