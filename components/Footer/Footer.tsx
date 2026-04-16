"use client";

import React, { useState, useEffect } from "react";
import { CircleHelp, ExternalLink, Facebook, Instagram, Mail, MapPin, MessageCircle, Music2, Phone, Send } from "lucide-react";
import Image from "next/image";

import * as S from "./Footer.css";

const Footer = () => {
	const [isPolicyOpen, setIsPolicyOpen] = useState(false);

	useEffect(() => {
		if (isPolicyOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => { document.body.style.overflow = "auto"; };
	}, [isPolicyOpen]);

	return (
		<S.Wrapper>
			<S.Container>
				<S.Top>
					<S.Brand>
						<S.BrandLogo>
							<Image src="/logo.png" alt="Мандрівна крамниця" fill priority />
						</S.BrandLogo>
						<S.BrandText>
							«Мандрівна крамниця» — це простір, де зустрічаються гастрономія, історія та дух подорожей. Ми відроджуємо атмосферу давнього Подолу — місця, де перетиналися міжнародні торгові шляхи, — щоб ви могли відчути себе мандрівником стародавніх часів і отримати неповторний досвід покупок.
						</S.BrandText>
					</S.Brand>

					<S.Contacts>
						<S.ContactsTitle>Контакти</S.ContactsTitle>
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
						<S.Legal href="#" onClick={(e) => { e.preventDefault(); setIsPolicyOpen(true); }}>
							Умови та Політика конфіденційності
        					<CircleHelp size={16} />
						</S.Legal>

						<S.FooterButtons>
							<S.ActionButton href="https://www.google.com/maps/search/?api=1&query=Контрактова+площа,+9,+Київ,+Україна" target="_blank" rel="noreferrer">
								<MapPin size={16} />
								Прокласти маршрут
							</S.ActionButton>

							<S.ActionButton href="https://landing-nine-beige-68.vercel.app/" target="_blank" rel="noreferrer">
								<ExternalLink size={16} />
								Дізнатися більше
							</S.ActionButton>
						</S.FooterButtons>
					</S.Right>
				</S.Top>

				<S.Bottom>
					<S.Copyright>© 2026 Мандрівна крамниця. Всі права захищено</S.Copyright>
					<S.Socials>
						<S.SocialLink href="https://www.instagram.com/?hl=uk" target="_blank" rel="noreferrer" aria-label="Instagram">
							<Instagram size={24} />
						</S.SocialLink>
						<S.SocialLink href="https://www.facebook.com/?locale=uk_UA" target="_blank" rel="noreferrer" aria-label="Facebook">
							<Facebook size={24} />
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
						
						<S.PolicyCloseBtn onClick={() => setIsPolicyOpen(false)}>
							✕
						</S.PolicyCloseBtn>

						<S.PolicyModalHeader>
							<S.PolicyMainTitle>Умови та Політика конфіденційності</S.PolicyMainTitle>
						</S.PolicyModalHeader>

						<S.PolicyScrollArea>
							<S.PolicySection>
								<S.PolicySectionTitle>1. Загальна інформація</S.PolicySectionTitle>
								<S.PolicyText>
									Ця Політика конфіденційності визначає порядок збору, зберігання, обробки та використання персональних даних користувачів веб-сайту та веб-застосунку «Мандрівна Крамниця».
									<br /><br />
									Ми дотримуємось вимог та принципів GDPR — прозорості, безпеки та мінімізації даних. Користуючись нашим сайтом, створюючи акаунт та реєструючись у програмі лояльності «Hermes», ви підтверджуєте, що ознайомлені з цією Політикою та погоджуєтесь із нею.
								</S.PolicyText>
							</S.PolicySection>

							<S.PolicySection>
								<S.PolicySectionTitle>2. Які дані ми збираємо</S.PolicySectionTitle>
								<S.PolicyText>Ми збираємо лише ті дані, які необхідні для роботи сервісу та програми лояльності:</S.PolicyText>
								<S.PolicyList>
									<S.PolicyListItem>Персональна інформація (електронна адреса, дата народження, гендер)</S.PolicyListItem>
									<S.PolicyListItem>Ім’я</S.PolicyListItem>
									<S.PolicyListItem>Номер телефону (для реєстрації та авторизації через SMS)</S.PolicyListItem>
									<S.PolicyListItem>Дані транзакцій і нарахованих миль</S.PolicyListItem>
									<S.PolicyListItem>Дані про статус у програмі лояльності</S.PolicyListItem>
									<S.PolicyListItem>Історію покупок</S.PolicyListItem>
								</S.PolicyList>
							</S.PolicySection>

							<S.PolicySection>
								<S.PolicySectionTitle>3. Використання cookies</S.PolicySectionTitle>
								<S.PolicyText>
									Наш сайт використовує мінімально необхідні cookies, які забезпечують коректну роботу сервісу та авторизації. Ми не використовуємо рекламні чи аналітичні куки, якщо ви окремо не погодитесь на них.
									<br /><br />
									Необхідні cookies забезпечують роботу сайту та не можуть бути вимкнені. До них належать сесійні куки (зберігають тимчасові технічні дані — ідентифікатор вашої сесії) та кука з рефреш-токеном, що використовується для продовження вашої авторизованої сесії без повторного введення коду з SMS. Ця кука є захищеною та недоступна для сторонніх сайтів.
								</S.PolicyText>
							</S.PolicySection>

							<S.PolicySection>
								<S.PolicySectionTitle>4. Як ми використовуємо ваші дані</S.PolicySectionTitle>
								<S.PolicyText>Ваші персональні дані використовуються виключно для:</S.PolicyText>
								<S.PolicyList>
									<S.PolicyListItem>реєстрації та авторизації у програмі лояльності «Hermes»;</S.PolicyListItem>
									<S.PolicyListItem>нарахування, зберігання та списання миль;</S.PolicyListItem>
									<S.PolicyListItem>роботи інтерактивної карти країн та ігрових бонусів;</S.PolicyListItem>
									<S.PolicyListItem>оформлення замовлень у веб-магазині;</S.PolicyListItem>
									<S.PolicyListItem>покращення якості сервісу та обслуговування клієнтів.</S.PolicyListItem>
								</S.PolicyList>
								<S.PolicyText>Ми не передаємо ваші дані третім особам, окрім випадків, коли це необхідно для роботи технологічних сервісів (SMS-відправка, спрощена адмін-панель) і лише за захищеним протоколом.</S.PolicyText>
							</S.PolicySection>
						</S.PolicyScrollArea>

					</S.PolicyModalContainer>
				</S.ModalOverlay>
			)}
		</S.Wrapper>
	);
};

export default Footer;