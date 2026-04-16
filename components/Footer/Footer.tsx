"use client";

import { CircleHelp, ExternalLink, Facebook, Instagram, Mail, MapPin, MessageCircle, Music2, Phone, Send } from "lucide-react";
import Image from "next/image";

import * as S from "./Footer.css";

const Footer = () => {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Top>
					<S.Brand>
						<S.BrandLogo>
							<Image src="/logo.png" alt="Мандрівна крамниця" fill priority />
						</S.BrandLogo>
						<S.BrandText>
							«Мандрівна крамниця» — це простір, де зустрічаються гастрономія, історія та дух подорожей. Ми відтворюємо атмосферу
							давнього Подолу, щоб кожен візит був схожий на невелику мандрівку.
						</S.BrandText>
					</S.Brand>

					<S.Contacts>
						<S.ContactsTitle>Контакти</S.ContactsTitle>
						<S.ContactLink href="mailto:support@gmail.com">
							<Mail size={18} />
							support@gmail.com
						</S.ContactLink>
						<S.ContactLink href="tel:+380000000000">
							<Phone size={18} />
							+380 XXXXXXXXX
						</S.ContactLink>
					</S.Contacts>

					<S.Right>
						<S.Legal href="#" onClick={(e) => e.preventDefault()}>
							Умови та Політика конфіденційності
							<CircleHelp size={14} />
						</S.Legal>

						<S.ActionButton href="https://maps.google.com" target="_blank" rel="noreferrer">
							<MapPin size={16} />
							Прокласти маршрут
						</S.ActionButton>

						<S.ActionButton href="#" onClick={(e) => e.preventDefault()}>
							<ExternalLink size={16} />
							Дізнатися більше
						</S.ActionButton>
					</S.Right>
				</S.Top>

				<S.Bottom>
					<S.Copyright>© 2025 Мандрівна крамниця. Всі права захищено</S.Copyright>
					<S.Socials>
						<S.SocialLink href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
							<Instagram size={18} />
						</S.SocialLink>
						<S.SocialLink href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
							<Facebook size={18} />
						</S.SocialLink>
						<S.SocialLink href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
							<Music2 size={18} />
						</S.SocialLink>
						<S.SocialLink href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram">
							<Send size={18} />
						</S.SocialLink>
						<S.SocialLink href="https://viber.com" target="_blank" rel="noreferrer" aria-label="Viber">
							<MessageCircle size={18} />
						</S.SocialLink>
					</S.Socials>
				</S.Bottom>
			</S.Container>
		</S.Wrapper>
	);
};

export default Footer;
