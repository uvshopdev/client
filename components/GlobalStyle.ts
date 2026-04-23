"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	*::-webkit-scrollbar {
		width: 0;	
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		user-select: none;
	}
	body {
		width: 100%;
		min-height: 100dvh;
		color: ${({ theme }) => theme.colors.primary}
	}

	input,button {
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

	a {
		color: unset;
		text-decoration: none;
	}

	ul,li { 
		list-style: none;
	}

	img, svg {
		display: block;
	}
`;

export default GlobalStyle;
