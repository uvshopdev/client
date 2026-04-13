import styled from "styled-components";

export const FooterWrapper = styled.footer`
	background: #3b3028;
	color: #ffffff;
`;

export const FooterPrivacy = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 14px 40px;

	@media (max-width: 640px) {
		padding: 12px 20px;
		justify-content: center;
	}

	a {
		font-size: 13px;
		color: #c9b99f;
		text-decoration: none;
		opacity: 0.8;
		transition: opacity 0.2s;

		&:hover {
			opacity: 1;
		}
	}
`;

export const FooterMain = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 40px;
	align-items: start;

	padding: 0 40px 40px;

	@media (max-width: 1024px) {
		gap: 24px;
		padding: 0 30px 30px;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		padding: 0 20px 30px;
	}

	@media (max-width: 480px) {
		grid-template-columns: 1fr;
		gap: 28px;
		padding: 0 20px 24px;
	}
`;

export const FooterBrand = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;

	@media (max-width: 768px) {
		grid-column: 1 / -1;
	}
`;

export const BrandRow = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const BrandName = styled.span`
	font-size: 18px;
	font-weight: 500;
	letter-spacing: 0.04em;
	text-transform: uppercase;

	@media (max-width: 480px) {
		font-size: 16px;
	}
`;

export const BrandDesc = styled.p`
	margin: 0;
	font-size: 13px;
	line-height: 1.6;
	color: #c9b99f;
	opacity: 0.85;
`;

export const FooterContacts = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const ContactsTitle = styled.h4`
	margin: 0;
	font-size: 16px;
	font-weight: 500;
`;

export const ContactItem = styled.a`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 14px;
	color: #c9b99f;
	text-decoration: none;
	transition: color 0.2s;

	&:hover {
		color: #ffffff;
	}
`;

export const FooterActions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const FooterActionBtn = styled.a`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 14px 20px;
	border: 1px solid rgba(255, 255, 255, 0.25);
	border-radius: 12px;
	color: #ffffff;
	font-size: 14px;
	text-decoration: none;
	cursor: pointer;
	transition: background 0.2s;

	&:hover {
		background: rgba(255, 255, 255, 0.08);
	}

	svg {
		opacity: 0.6;
		flex-shrink: 0;
	}
`;

export const FooterBottom = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 16px 40px;
	border-top: 1px solid rgba(255, 255, 255, 0.12);

	@media (max-width: 768px) {
		padding: 16px 20px;
	}

	@media (max-width: 480px) {
		flex-direction: column;
		gap: 14px;
		text-align: center;
	}
`;

export const Copyright = styled.span`
	font-size: 13px;
	color: #c9b99f;
	opacity: 0.7;
`;

export const SocialLinks = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const SocialLink = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #c9b99f;
	opacity: 0.7;
	transition: opacity 0.2s;

	&:hover {
		opacity: 1;
	}
`;
