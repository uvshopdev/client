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
	gap: 20px;
	padding: 24px 32px;

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
	font-size: 14px;
	line-height: 1.55;
	color: rgba(246, 242, 235, 0.9);
`;

export const Contacts = styled.div`
	display: grid;
	align-content: center;
	gap: 10px;
`;

export const ContactsTitle = styled.h3`
	margin: 0;
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: rgba(246, 242, 235, 0.82);
`;

export const ContactLink = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 10px;
	color: #f6f2eb;
	text-decoration: none;
	font-size: 15px;
	line-height: 1.4;
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
	font-size: 12px;
	font-weight: 500;
	color: rgba(246, 242, 235, 0.9);
	text-decoration: underline;
	text-underline-offset: 3px;

	&:hover {
		text-decoration: none;
	}
`;

export const ActionButton = styled.a`
	width: min(360px, 100%);
	height: 42px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	border-radius: 11px;
	border: 1px solid rgba(255, 255, 255, 0.72);
	background: rgba(242, 240, 237, 0.96);
	color: #342a23;
	text-decoration: none;
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.01em;
	transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

	&:hover {
		transform: translateY(-1px);
		background: #f7f5f2;
		border-color: rgba(255, 255, 255, 0.92);
	}
`;

export const Bottom = styled.div`
	border-top: 1px solid rgba(255, 255, 255, 0.22);
	padding: 12px 32px;
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
	font-size: 12px;
	line-height: 1.4;
	color: rgba(246, 242, 235, 0.84);
`;

export const Socials = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 12px;
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
