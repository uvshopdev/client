import styled from "styled-components";

import theme from "@/components/theme";

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1 1 auto; 
    padding: 60px 20px 40px;
    width: 100%;
    min-height: calc(101vh - 80px);
    
    background-image: 
        linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url('/auth_background.webp');
    background-size: cover;
    
    background-position: center bottom; 
    background-repeat: no-repeat;
    
    margin-bottom: -24px; 
`;

export const Form = styled.form`
    max-width: 480px;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 30px;
    
    padding: 50px 60px;
    border-radius: 25px;
    
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
    
    border: 1px solid rgba(255, 255, 255, 0.5); 

    transition: all .3s ease;

    @media (max-width: 640px) {
        padding: 40px 30px;
    }
`;

export const FormInfo = styled.div`
    text-align: center;
    
    h3 {
        margin-bottom: 8px;
        font-size: 24px;
        color: #111;
    }
    
    div {
        color: #555; 
        font-size: 14px;
        font-weight: 500;
    }
`;

export const GoogleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    padding: 12px;
    background: #ffffff;
    border: 1px solid rgba(59, 48, 40, 0.2); 
    border-radius: 14px;
    font-size: 15px;
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    color: #3B3028;

    &:hover {
        background: #fdfdfd;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
`;

export const Divider = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    color: #555;
    font-size: 14px;
    font-weight: 500;

    &::before,
    &::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }

    &::before { margin-right: 15px; }
    &::after { margin-left: 15px; }
`;

export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const FormLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #222;

    input {
        padding: 12px 15px;
        width: 100%;
        background: rgba(255, 255, 255, 0.85);
        border: 1.5px solid rgba(59, 48, 40, 0.3); 
        border-radius: 12px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
        color: #111;

        &::placeholder {
            color: #777;
        }

        &:focus {
            border-color: #3B3028;
            background: #ffffff;
        }
    }
`;

export const InputWithButtonWrapper = styled.div<{ $padRight: number }>`
    position: relative;
    width: 100%;

    input {
        padding-right: ${({ $padRight }) => $padRight}px;
        text-overflow: ellipsis;
    }
`;

export const ActionInsideButton = styled.button`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    color: ${theme.colors.primary};
    cursor: pointer;
    transition: opacity 0.2s;

    &:disabled {
        color: #666;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        opacity: 0.7;
    }
`;

export const Buttons = styled.div`
    width: 100%;
    margin-top: 10px;

    button {
        width: 100%;
        padding: 14px 25px;
        border: none;
        border-radius: 14px;
        color: #ffffff;
        background: ${theme.colors.primary};
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.2s, transform 0.1s;
        box-shadow: 0 4px 12px rgba(59, 48, 40, 0.2);

        &:hover {
            opacity: 0.9;
        }
        
        &:active {
            transform: scale(0.98);
        }
    }
`;
