import Link from "next/link";
import styled from "styled-components";

export const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 20px;
	grid-auto-rows: max-content;

	@media (max-width: 1440px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
		
	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 640px) {
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 14px;
	}
`;


export const GoShopButton = styled(Link)`
	display: inline-flex;
	align-items: center;
	justify-content: center;

	margin-top: 8px;
	padding: 14px 32px;
	border-radius: 14px;
	background: ${({ theme }) => theme.colors.primary};
	color: #ffffff;
	font-size: 15px;
	text-decoration: none;
	transition: opacity 0.2s;

	&:hover {
		opacity: 0.85;
	}
`;
