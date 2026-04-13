import { ChevronRight, Facebook, Instagram, Mail, MapPin, Phone, Send, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
	BrandDesc,
	BrandName,
	BrandRow,
	ContactItem,
	ContactsTitle,
	Copyright,
	FooterActionBtn,
	FooterActions,
	FooterBottom,
	FooterBrand,
	FooterContacts,
	FooterMain,
	FooterPrivacy,
	FooterWrapper,
	SocialLink,
	SocialLinks,
} from "./Footer.css";

const Footer = () => {
	return (
		<FooterWrapper>
			<FooterPrivacy>
				<Link href="/privacy">Умови та Політика конфіденційності</Link>
			</FooterPrivacy>

			<FooterMain>
				<FooterBrand>
					<BrandRow>
						<Image src="/logo.png" width={44} height={44} alt="Мандрівна крамниця" />
						<BrandName>Мандрівна крамниця</BrandName>
					</BrandRow>
					<BrandDesc>
						«Мандрівна крамниця» — це простір, де гастрономічна пригода зустрічається з традиціями
						давнього Поділля — місце, де кожен продукт несе в собі неповторний смак місцевого
						виробника з гарантованою неймовірною різноманітністю товарів.
					</BrandDesc>
				</FooterBrand>

				<FooterContacts>
					<ContactsTitle>Контакти</ContactsTitle>
					<ContactItem href="mailto:support@gmail.com">
						<Mail size={16} strokeWidth={1.5} />
						support@gmail.com
					</ContactItem>
					<ContactItem href="tel:+380000000000">
						<Phone size={16} strokeWidth={1.5} />
						+380 XXXXXXXXX
					</ContactItem>
				</FooterContacts>

				<FooterActions>
					<FooterActionBtn href="/map">
						<span>
							<MapPin size={16} strokeWidth={1.5} style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }} />
							Прокласти маршрут
						</span>
						<ChevronRight size={18} strokeWidth={1.5} />
					</FooterActionBtn>
					<FooterActionBtn href="/about">
						<span>Дізнатись більше</span>
						<ChevronRight size={18} strokeWidth={1.5} />
					</FooterActionBtn>
				</FooterActions>
			</FooterMain>

			<FooterBottom>
				<Copyright>© 2025 Мандрівна крамниця. Всі права захищені.</Copyright>
				<SocialLinks>
					<SocialLink href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
						<Instagram size={20} strokeWidth={1.5} />
					</SocialLink>
					<SocialLink href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
						<Facebook size={20} strokeWidth={1.5} />
					</SocialLink>
					<SocialLink href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
						<Youtube size={20} strokeWidth={1.5} />
					</SocialLink>
					<SocialLink href="https://t.me" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
						<Send size={20} strokeWidth={1.5} />
					</SocialLink>
				</SocialLinks>
			</FooterBottom>
		</FooterWrapper>
	);
};

export default Footer;
