import styled from "styled-components";
import theme from "@/components/theme";

export const Content = styled.main`
	display: flex;
	flex-direction: column;
	gap: 30px;
	padding: 50px 40px 40px;
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

export const CatalogTitle = styled.h1`
	margin: 0;
	font-family: "Gabriela", serif;
	font-size: 34px;
	font-weight: 400;
	color: #3B3028;
	line-height: 1.2;
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
	gap: 8px;
	padding: 10px 16px;
	border-radius: 10px;
	border: 1px solid ${theme.colors.secondary};
	background: #ffffff;
	
	font-family: "Montserrat Alternates", sans-serif;
	font-weight: 500;
	font-size: 14px;
	color: #000000;

	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		border-color: #3B3028;
		background-color: #fcfcfc;
	}

	@media (max-width: 900px) {
		flex: 1;
		justify-content: center;
	}
`;

export const Products = styled.div`
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	gap: 20px;

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

/* === СТИЛИ БОКОВЫХ ПАНЕЛЕЙ (ФИЛЬТРЫ И СОРТИРОВКА) === */

export const SidebarOverlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(3px);
	z-index: 2000;
	display: flex;
	justify-content: flex-end;
`;

export const SidebarContainer = styled.div`
	width: 480px;
	height: 100%;
	background: #ffffff;
	padding: 40px 50px;
	display: flex;
	flex-direction: column;
	box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
	animation: slideIn 0.3s ease-out;

	@keyframes slideIn {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}
`;

export const SidebarHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40px;

	h2 {
		font-family: "Gabriela", serif;
		font-size: 28px;
		font-weight: 400; 
		color: #000;
		margin: 0;
	}
`;

export const SidebarClose = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	color: #3B3028;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px;
	border-radius: 50%;
	transition: all 0.2s ease;

	&:hover {
		background-color: #524339;
		color: #ffffff;
	}
`;

export const SidebarContent = styled.div`
	flex: 1;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 32px;
	padding-right: 5px;

	&::-webkit-scrollbar { width: 4px; }
	&::-webkit-scrollbar-thumb { background: #E9E3D9; border-radius: 10px; }
`;

export const FilterSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	p {
		font-family: "Montserrat Alternates", sans-serif;
		font-size: 16px;
		font-weight: 400;
		color: #000;
		margin: 0;
	}
`;

export const DropdownHeader = styled.div`
	width: 100%;
	padding: 14px 18px;
	border: 1px solid #E9E3D9;
	border-radius: 14px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: "Montserrat Alternates", sans-serif;
	font-size: 14px;
	font-weight: 400;
	color: #000;
	cursor: pointer;

	&:hover { border-color: #3B3028; }
`;

export const DropdownList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	background: #fff;
	border: 1px solid #E9E3D9;
	border-radius: 14px;
	margin-top: 8px;
	overflow: hidden;
`;

export const DropdownItem = styled.div<{ $cancel?: boolean }>`
	padding: 14px 18px;
	font-family: "Montserrat Alternates", sans-serif;
	font-size: 14px;
	font-weight: 400;
	cursor: pointer;
	color: ${({ $cancel }) => ($cancel ? "#A4A4A4" : "#000000")};
	transition: background 0.2s;

	&:hover {
		background: #f9f9f9;
	}
`;

export const PriceRange = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	font-family: "Montserrat Alternates", sans-serif;

	label { font-size: 14px; color: #888; font-weight: 400; }

	input {
		width: 100%;
		height: 48px;
		border: 1px solid #E9E3D9;
		border-radius: 14px;
		padding: 0 16px;
		outline: none;
		font-family: inherit;
		font-size: 14px;
		font-weight: 400;
		transition: border-color 0.2s;

		&:focus { border-color: #3B3028; }
		&::-webkit-inner-spin-button { display: none; }
	}
`;

export const SortGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
`;

export const SortOption = styled.div<{ $active?: boolean }>`
	border: 1px solid ${({ $active }) => ($active ? "#3B3028" : "#E9E3D9")};
	border-radius: 14px;
	padding: 16px 14px;
	display: flex;
	align-items: center;
	gap: 12px;
	cursor: pointer;
	font-family: "Montserrat Alternates", sans-serif;
	font-size: 14px;
	font-weight: 400;
	color: #000;
	transition: all 0.2s ease;
	line-height: 1.3;

	.radio-circle {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 1.5px solid ${({ $active }) => ($active ? "#3B3028" : "#E9E3D9")};
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		
		&::after {
			content: '';
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: #3B3028;
			display: ${({ $active }) => ($active ? "block" : "none")};
		}
	}

	&:hover { border-color: #3B3028; }
`;

export const ApplyButton = styled.button`
	width: 100%;
	height: 56px;
	background: #3B3028;
	color: #ffffff;
	border: none;
	border-radius: 16px;
	font-family: "Montserrat Alternates", sans-serif;
	font-weight: 600;
	font-size: 16px;
	cursor: pointer;
	margin-top: 24px;
	transition: opacity 0.2s;

	&:hover { opacity: 0.9; }
`;