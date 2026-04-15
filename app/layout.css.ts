import styled from "styled-components";

export const Main = styled.main`
    width: 100%;
    min-height: 100vh;

    display: grid;
    grid-template-rows: auto 1fr;
`;

export const HeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 1000; /* Щоб хедер завжди був поверх інших елементів (карток, модалок) */
    width: 100%;
    background: #ffffff; /* Білий фон обов'язково, інакше текст при скролі буде накладатись */
`;