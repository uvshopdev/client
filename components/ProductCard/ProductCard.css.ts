import styled from "styled-components";

export const Content = styled.article`
	position: relative;

	display: flex;
	flex-direction: column;
	gap: 15px;
	justify-content: space-between;

	padding: 20px;
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	border-radius: 24px;
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

export const Top = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const ImageWrap = styled.div`
	position: relative;
	overflow: hidden;
	display: block;

	border-radius: 16px;
	background: ${({ theme }) => theme.colors.secondary};
`;

export const ProductImage = styled.div`
	position: relative;
	width: 100%;
	height: 220px;

	img {
		object-fit: contain;
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
	color: inherit;
	text-decoration: none;
`;

export const Stock = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	font-size: 14px;

	.indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #23a329;
		flex-shrink: 0;
	}
`;

export const Rating = styled.div`
	letter-spacing: 5px;
	color: #f5b301;
`;

export const Bottom = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const Buttons = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: end;
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

export const FavoriteButton = styled.button<{ $favorite?: boolean }>`
	width: 52px;
	height: 52px;
	padding: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	border: none;
	border-radius: 12px;
	background: ${({ $favorite }) => ($favorite ? "#fdecea" : "#ececec")};
	cursor: pointer;

	text-decoration: none;
	transition: all 0.3s ease;
	& svg {
		color: ${({ $favorite }) => ($favorite ? "#e53935" : "#bdbdbd")};
		fill: ${({ $favorite }) => ($favorite ? "#e53935" : "#bdbdbd")};
	}

	&:hover {
		background: ${({ $favorite }) => ($favorite ? "#fbd4d1" : "#dbdbdb")};
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
	padding: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	border: none;
	border-radius: 12px;
	background: ${({ theme }) => theme.colors.primary};
	color: #ffffff;
	cursor: pointer;
`;
