import Link from "next/link";
import styled from "styled-components";

import theme from "@/components/theme";

export const FavoritesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
`;

export const FavoritesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 20px;

	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 640px) {
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 14px;
	}
`;

export const ProductCard = styled.article`
	position: relative;

	display: flex;
	flex-direction: column;
	gap: 14px;

	padding: 20px;
	border: 1px solid ${theme.colors.secondary};
	border-radius: 24px;
	background: #ffffff;

	transition: all 0.3s ease;

	@media (max-width: 640px) {
		padding: 14px;
		gap: 10px;
		border-radius: 18px;
	}
`;

export const Badge = styled.div`
	position: absolute;
	top: 14px;
	left: 14px;
	z-index: 2;

	padding: 4px 8px;
	border-radius: 6px;
	background: #cd2323;
	color: #ffffff;
	font-size: 14px;
	font-weight: 500;
`;

export const ImageWrap = styled.div`
	position: relative;
	overflow: hidden;

	border-radius: 16px;
	background: #f3eee9;
`;

export const ProductImage = styled.div`
	position: relative;
	width: 100%;
	height: 220px;

	img {
		object-fit: cover;
	}

	@media (max-width: 640px) {
		height: 180px;
	}
`;

export const ProductName = styled.p`
	margin: 0;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.3;

	@media (max-width: 640px) {
		font-size: 14px;
	}
`;

export const Stock = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;

	font-size: 14px;
	color: #3b3028;

	span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #23a329;
		flex-shrink: 0;
	}
`;

export const Rating = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	font-size: 14px;

	u {
		text-decoration: none;
		letter-spacing: 2px;
		color: #f5b301;
	}
`;

export const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 12px;
	margin-top: 10px;

	@media (max-width: 640px) {
		margin-top: 4px;
	}
`;

export const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

export const ProductPrice = styled.div`
	font-size: 20px;
	font-weight: 700;

	@media (max-width: 640px) {
		font-size: 17px;
	}
`;

export const Sub = styled.div`
	font-size: 12px;
	color: #888888;
`;

export const Actions = styled.div`
	display: flex;
	gap: 10px;
`;

export const FavoriteButton = styled.button`
	width: 52px;
	height: 52px;
	padding: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	border: none;
	border-radius: 12px;
	background: #fdecea;
	color: #e53935;
	cursor: pointer;

	text-decoration: none;
	transition: all 0.3s ease;

	&:hover {
		background: #fbd4d1;
	}

	@media (max-width: 640px) {
		width: 38px;
		height: 38px;
		border-radius: 10px;
	}
`;

export const CartButton = styled.button`
	width: 52px;
	height: 52px;

	display: flex;
	justify-content: center;
	align-items: center;

	border: none;
	border-radius: 12px;
	background: ${theme.colors.primary};
	color: #ffffff;
	cursor: pointer;

	text-decoration: none;
	transition: all 0.3s ease;

	@media (max-width: 640px) {
		width: 38px;
		height: 38px;
		border-radius: 10px;
	}
`;

export const EmptyState = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 16px;

	padding: 80px 20px;
	text-align: center;
`;

export const EmptyIcon = styled.div`
	color: ${theme.colors.secondary};
	margin-bottom: 8px;
`;

export const EmptyTitle = styled.h3`
	margin: 0;
	font-size: 22px;
	font-weight: 500;
	color: ${theme.colors.primary};
`;

export const EmptyText = styled.p`
	margin: 0;
	font-size: 15px;
	color: #888888;
`;

export const GoShopButton = styled(Link)`
	display: inline-flex;
	align-items: center;
	justify-content: center;

	margin-top: 8px;
	padding: 14px 32px;
	border-radius: 14px;
	background: ${theme.colors.primary};
	color: #ffffff;
	font-size: 15px;
	text-decoration: none;
	transition: opacity 0.2s;

	&:hover {
		opacity: 0.85;
	}
`;
