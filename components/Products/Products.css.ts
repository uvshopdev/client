import styled from "styled-components";

import theme from "../theme";

export const Content = styled.main`
	display: flex;
	flex-direction: column;
	gap: 30px;
	padding: 28px 40px 14px;
	flex: 1;

	@media (max-width: 640px) {
        padding: 24px 20px 14px;
    }
`;

export const CatalogHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;

	@media (max-width: 900px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const CatalogTitle = styled.h2`
  font-family: "Gabriela", serif;
  font-size: 34px;
  font-weight: 400;
  color: #3B3028;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const CatalogActions = styled.div`
	display: flex;
	gap: 10px;

	@media (max-width: 900px) {
		width: 100%;
	}
`;

export const FilterButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 6px;

	padding: 10px 16px;
	border-radius: 10px;
	border: 1px solid ${theme.colors.secondary};
	background: #ffffff;

	transition: all 0.3s ease;

	@media (max-width: 900px) {
		flex: 1;
		justify-content: center;
	}
`;

export const Items = styled.div`
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	gap: 20px;
	margin-bottom: auto;

	@media (max-width: 1440px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }

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
