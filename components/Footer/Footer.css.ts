import styled from "styled-components";

export const Wrapper = styled.footer`
	width: 100%;
	margin-top: 24px;
	background: ${({ theme }) => theme.colors.primary};
	box-sizing: border-box;
`;

export const Container = styled.div`
	width: 100%;
	max-width: 1520px;
	margin: 0 auto;
	color: #f6f2eb;
	padding: 0 24px 24px;
	overflow: hidden;

	@media (max-width: 1080px) {
		padding: 0 16px 16px;
	}
`;

export const Top = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 0.9fr 1.2fr;
	gap: 24px;
	padding: 28px 32px;

	@media (max-width: 1080px) {
		grid-template-columns: 1fr;
		gap: 20px;
		padding: 24px 20px;
	}
`;

export const Brand = styled.div`
	display: grid;
	gap: 14px;
`;

export const BrandLogo = styled.div`
	width: 150px;
	height: 62px;
	position: relative;

	img {
		object-fit: contain;
		filter: brightness(0) invert(1);
		opacity: 0.95;
	}
`;

export const BrandText = styled.p`
	margin: 0;
	max-width: 580px;
	font-size: 15px;
	line-height: 1.35;
	color: #efe8dc;
`;

export const Contacts = styled.div`
	display: grid;
	align-content: center;
	gap: 10px;
`;

export const ContactsTitle = styled.h3`
	margin: 0;
	font-size: 30px;
	font-family: "Gabriela", serif;
	font-weight: 400;
	color: #ffffff;
`;

export const ContactLink = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 10px;
	color: #f6f2eb;
	text-decoration: none;
	font-size: 27px;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.75;
	}
`;

export const Right = styled.div`
	display: grid;
	align-content: center;
	justify-items: end;
	gap: 14px;

	@media (max-width: 1080px) {
		justify-items: start;
	}
`;

export const Legal = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 13px;
	color: #f6f2eb;
	text-decoration: underline;
	text-underline-offset: 3px;

	&:hover {
		text-decoration: none;
	}
`;

export const ActionButton = styled.a`
	width: min(360px, 100%);
	height: 44px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.9);
	background: #f2f0ed;
	color: #3b3028;
	text-decoration: none;
	font-size: 14px;
	font-weight: 500;
	transition: transform 0.2s ease;

	&:hover {
		transform: translateY(-1px);
	}
`;

export const Bottom = styled.div`
	border-top: 1px solid rgba(255, 255, 255, 0.35);
	padding: 14px 32px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 14px;

	@media (max-width: 1080px) {
		padding: 14px 20px;
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const Copyright = styled.p`
	margin: 0;
	font-size: 13px;
	color: #efe8dc;
`;

export const Socials = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 14px;
`;

export const SocialLink = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: #f6f2eb;
	text-decoration: none;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.75;
	}
`;
