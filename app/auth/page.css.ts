import styled from "styled-components";

import theme from "@/components/theme";

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    max-width: 530px;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 40px;
    
    padding: 60px;
    border-radius: 25px;
    border: 1px solid ${theme.colors.secondary};

    transition: all .3s ease;
`;

export const FormInfo = styled.div`
    text-align: center;
`;

export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export const FormLabel = styled.label`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;

    input {
        padding: 10px 15px;
        width: 100%;
    }
        
    button {
        position: absolute;
        top: 0;
        right: 0;

        padding: 0;
        border: none;
    }

`;

export const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
        & > button {
            all: unset;
            cursor: pointer;
        }
    }
    button {
        padding: 10px 25px;
        border: none;
        color: #ffffff;
        background: ${theme.colors.primary};
    }
`;
