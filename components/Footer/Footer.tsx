"use client";

import { CircleHelp, ExternalLink, Mail, MapPin, MessageCircle, Music2, Phone, Send } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

import * as S from "./Footer.css";

const Footer = () => {
	const t = useExtracted("footer");
	const [isPolicyOpen, setIsPolicyOpen] = useState(false);

	useEffect(() => {
		if (isPolicyOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isPolicyOpen]);

	return (
		<S.Wrapper>
			<S.Container>
				<S.Top>
					<S.Brand>
						<S.BrandLogo>
							<Image src="/logo.webp" alt={t('"Mandrivna Kramnytsya"')} fill priority />
						</S.BrandLogo>
						<S.BrandText>
							{t(
								'The "Mandrivna Kramnytsya" is a space where gastronomy, history, and the spirit of travel meet. We revive the atmosphere of ancient Podil — a place where international trade routes intersected — so you can feel like a traveler of ancient times and get a unique shopping experience.',
							)}
						</S.BrandText>
					</S.Brand>

					<S.Contacts>
						<S.ContactsTitle>{t("Contacts")}</S.ContactsTitle>
						<S.ContactLink href="mailto:support@gmail.com">
							<Mail size={16} />
							support@gmail.com
						</S.ContactLink>
						<S.ContactLink href="tel:+380000000000">
							<Phone size={16} />
							+380 XXXXXXXXX
						</S.ContactLink>
					</S.Contacts>

					<S.Right>
						<S.Legal
							href="#"
							onClick={(e) => {
								e.preventDefault();
								setIsPolicyOpen(true);
							}}
						>
							{t("Terms and Privacy Policy")}
							<CircleHelp size={16} />
						</S.Legal>

						<S.FooterButtons>
							<S.ActionButton
								href="https://www.google.com/maps/search/?api=1&query=Контрактова+площа,+9,+Київ,+Україна"
								target="_blank"
								rel="noreferrer"
							>
								<MapPin size={16} />
								{t("Get directions")}
							</S.ActionButton>

							<S.ActionButton href="https://landing-nine-beige-68.vercel.app/" target="_blank" rel="noreferrer">
								<ExternalLink size={16} />
								{t("Learn more")}
							</S.ActionButton>
						</S.FooterButtons>
					</S.Right>
				</S.Top>

				<S.Bottom>
					<S.Copyright>{t('© 2026 Mandrivna Kramnytsya. All rights reserved')}</S.Copyright>
					<S.Socials>
						<S.SocialLink href="https://www.instagram.com/?hl=uk" target="_blank" rel="noreferrer" aria-label="Instagram">
							<svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</S.SocialLink>
						<S.SocialLink href="https://www.facebook.com/?locale=uk_UA" target="_blank" rel="noreferrer" aria-label="Facebook">
							<svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</S.SocialLink>
						<S.SocialLink href="https://www.tiktok.com/?lang=uk-UA" target="_blank" rel="noreferrer" aria-label="TikTok">
							<Music2 size={24} />
						</S.SocialLink>
						<S.SocialLink href="https://telegram.org/?setln=uk" target="_blank" rel="noreferrer" aria-label="Telegram">
							<Send size={24} />
						</S.SocialLink>
						<S.SocialLink href="https://www.viber.com/ua/" target="_blank" rel="noreferrer" aria-label="Viber">
							<MessageCircle size={24} />
						</S.SocialLink>
					</S.Socials>
				</S.Bottom>
			</S.Container>

			{/* МОДАЛКА ПОЛІТИКИ */}
			{isPolicyOpen && (
				<S.ModalOverlay onClick={() => setIsPolicyOpen(false)}>
					<S.PolicyModalContainer onClick={(e) => e.stopPropagation()}>
						<S.PolicyCloseBtn onClick={() => setIsPolicyOpen(false)}>✕</S.PolicyCloseBtn>

						<S.PolicyModalHeader>
							<S.PolicyMainTitle>{t("Terms and Privacy Policy")}</S.PolicyMainTitle>
						</S.PolicyModalHeader>

						<S.PolicyScrollArea>
							<S.PolicySection>
								<S.PolicySectionTitle>{t("1. General Information")}</S.PolicySectionTitle>
								<S.PolicyText>
									{t(
										'This Privacy Policy determines the procedure for collecting, storing, processing, and using the personal data of users of the "Mandrivna Kramnytsya" website and web application.',
									)}
									<br />
									<br />
									{t(
										"We comply with GDPR requirements and principles — transparency, security, and data minimization. By using our site, creating an account, and registering in the Hermes loyalty program, you confirm that you have read and agree to this Policy.",
									)}
								</S.PolicyText>
							</S.PolicySection>

							<S.PolicySection>
								<S.PolicySectionTitle>{t("2. What data we collect")}</S.PolicySectionTitle>
								<S.PolicyText>
									{t("We collect only the data necessary for the operation of the service and the loyalty program:")}
								</S.PolicyText>
								<S.PolicyList>
									<S.PolicyListItem>{t("Personal information (email address, date of birth, gender)")}</S.PolicyListItem>
									<S.PolicyListItem>{t("Name")}</S.PolicyListItem>
									<S.PolicyListItem>{t("Phone number (for registration and authorization via SMS)")}</S.PolicyListItem>
									<S.PolicyListItem>{t("Transaction and accrued miles data")}</S.PolicyListItem>
									<S.PolicyListItem>{t("Loyalty program status data")}</S.PolicyListItem>
									<S.PolicyListItem>{t("Purchase history")}</S.PolicyListItem>
								</S.PolicyList>
							</S.PolicySection>

							<S.PolicySection>
								<S.PolicySectionTitle>{t("3. Use of cookies")}</S.PolicySectionTitle>
								<S.PolicyText>
									{t(
										"Our site uses strictly necessary cookies that ensure the proper operation of the service and authorization. We do not use advertising or analytical cookies unless you explicitly agree to them.",
									)}
									<br />
									<br />
									{t(
										"Necessary cookies ensure the operation of the site and cannot be disabled. These include session cookies (store temporary technical data — your session identifier) and a refresh token cookie used to extend your authorized session without re-entering the SMS code. This cookie is secure and inaccessible to third-party sites.",
									)}
								</S.PolicyText>
							</S.PolicySection>

							<S.PolicySection>
								<S.PolicySectionTitle>{t("4. How we use your data")}</S.PolicySectionTitle>
								<S.PolicyText>{t("Your personal data is used exclusively for:")}</S.PolicyText>
								<S.PolicyList>
									<S.PolicyListItem>{t("registration and authorization in the Hermes loyalty program;")}</S.PolicyListItem>
									<S.PolicyListItem>{t("accrual, storage, and deduction of miles;")}</S.PolicyListItem>
									<S.PolicyListItem>{t("operation of the interactive country map and game bonuses;")}</S.PolicyListItem>
									<S.PolicyListItem>{t("placing orders in the web store;")}</S.PolicyListItem>
									<S.PolicyListItem>{t("improving the quality of service and customer support.")}</S.PolicyListItem>
								</S.PolicyList>
								<S.PolicyText>
									{t(
										"We do not transfer your data to third parties, except when necessary for the operation of technological services (SMS sending, simplified admin panel) and only via a secure protocol.",
									)}
								</S.PolicyText>
							</S.PolicySection>
						</S.PolicyScrollArea>
					</S.PolicyModalContainer>
				</S.ModalOverlay>
			)}
		</S.Wrapper>
	);
};

export default Footer;
