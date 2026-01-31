"use client";

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box
	}
	body {
		width: 100dvw;
		height: 100dvh;
		
		display: grid;
		grid-template-rows: auto 1fr;
	}
	img: {
		width: 100%;
		height: 100%;
	}

	input,button {
		width: 100%;
		height: 100%;

		border-radius: 10px;
		background: none;
		outline: none;
		padding: 0 20px;
		font-size: 100%;
		font-family: inherit;
	}
	input {
		border: 1px solid ${({ theme }) => theme.colors.secondary};
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		
		border: 1px solid ${({ theme }) => theme.colors.primary};
		cursor: pointer;
	}

	ul,li { 
		list-style: none;
	}
`;
