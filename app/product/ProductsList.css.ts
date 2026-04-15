import styled from "styled-components";

export const ProductsSection = styled.section`
	width: 100%;
	padding: 0 40px;
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const ProductsTitle = styled.h2`
	font-family: "Gabriela", serif;
	font-style: normal;
	font-weight: 400;
	font-size: 34px;
	line-height: 44px;
	color: #3B3028;
	margin: 0;
`;

export const ProductsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 20px;

	@media (max-width: 1200px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	@media (max-width: 900px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	@media (max-width: 640px) {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
`;