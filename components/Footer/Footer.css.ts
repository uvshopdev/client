import styled from "styled-components";

export const Wrapper = styled.footer`
	width: 100%;
	margin-top: 24px;
	background: ${({ theme }) => theme.colors.primary};
	box-sizing: border-box;
`;

export const Container = styled.div`
	width: 100%;
	margin: 0 auto;
	color: #FFFFFF;
	overflow: hidden;
`;

export const Top = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 0.9fr 1.2fr;
	gap: 40px;
	padding: 30px 40px;

	@media (max-width: 1150px) {
		grid-template-columns: 1fr 1fr;
		row-gap: 40px;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		padding: 30px 20px;
		row-gap: 32px;
	}
`;

export const Brand = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	max-width: 490px;
`;

export const BrandLogo = styled.div`
	width: 98px;
	height: 76px;
	position: relative;

	img {
		object-fit: contain;
		filter: brightness(0) invert(1);
	}
`;

export const BrandText = styled.p`
	margin: 0;
	font-weight: 400;
	font-size: 12px;
	line-height: 1.25;
	color: #FFFFFF;
`;

export const Contacts = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	height: 100%;
	gap: 12px;
`;

export const ContactsTitle = styled.h3`
	margin: 0;
	font-weight: 700;
	font-size: 16px;
	color: #FFFFFF;
	text-transform: none;
	letter-spacing: normal;
`;

export const ContactLink = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 10px;
	color: #FFFFFF;
	text-decoration: none;
	font-weight: 500;
	font-size: 14px;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.75;
	}
`;

export const Right = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	height: 100%;

	@media (max-width: 1150px) {
		grid-column: 1 / -1;
		align-items: flex-start;
		gap: 24px;
	}
`;

export const Legal = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 12px;
	font-weight: 500;
	color: #FFFFFF;
	text-decoration: underline;
	text-underline-offset: 3px;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.8;
	}
`;

export const FooterButtons = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
	max-width: 400px;

	@media (max-width: 768px) {
		max-width: 100%;
	}
`;

export const ActionButton = styled.a`
	width: 100%;
	height: 38px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border-radius: 10px;
	border: 1px solid #FFFFFF;
	background: #FFFFFF;
	color: #3B3028;
	text-decoration: none;
	font-size: 14px;
	font-weight: 600;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.85;
	}
`;

export const Bottom = styled.div`
	border-top: 1px solid #FFFFFF;
	padding: 20px 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 14px;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		padding: 24px 20px;
		flex-direction: column-reverse;
		align-items: flex-start;
		gap: 24px;
	}
`;

export const Copyright = styled.p`
	margin: 0;
	font-size: 12px;
	font-weight: 500;
	color: #FFFFFF;
`;

export const Socials = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 24px;
`;

export const SocialLink = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: #FFFFFF;
	text-decoration: none;
	transition: transform 0.2s ease;

	&:hover {
		transform: scale(1.1);
	}
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
`;

export const PolicyModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  max-width: 100%;
  height: 700px;
  max-height: 90vh;
  background: #FFFFFF;
  border-radius: 30px;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 30px;
`;

export const PolicyCloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  flex-shrink: 0;
  padding: 0;
  border-radius: 50%;
  border: none;
  background: #3B3028;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  transition: opacity 0.2s;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  font-family: sans-serif;
  box-sizing: border-box;
  line-height: 1;

  &:hover { opacity: 0.8; }
`;

export const PolicyModalHeader = styled.div`
  padding: 60px 30px 20px 30px;
  background: #FFFFFF;
  z-index: 20;
  flex-shrink: 0;
`;

export const PolicyMainTitle = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #1A1A1A;
  margin: 0;
`;

export const PolicyScrollArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 0 30px;
  overflow-y: auto;
  
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #E9E3D9; border-radius: 10px; }

  &::after {
    content: '';
    display: block;
    min-height: 30px;
    flex-shrink: 0;
  }
`;

export const PolicySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const PolicySectionTitle = styled.h3`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #1A1A1A;
  margin: 0;
`;

export const PolicyText = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #1A1A1A;
  margin: 0;
`;

export const PolicyList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
`;

export const PolicyListItem = styled.li`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: #1A1A1A;
  margin: 0;
  position: relative;
  padding-left: 20px; 
  
  &::before {
    content: '•';
    position: absolute;
    left: 8px; 
    top: 0;
    color: #1A1A1A;
  }
`;