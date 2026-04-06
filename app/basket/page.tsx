"use client";

import { Check, Eye, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import {
	AlertIcon,
	CartItem,
	CheckoutButton,
	Container,
	ContentGrid,
	CountryRow,
	EmptyButton,
	EmptyState,
	EmptyText,
	InfoText,
	InputGroup,
	ItemActions,
	ItemInfo,
	ItemPrice,
	ItemsList,
	LeftBox,
	LeftColumn,
	ModalContent,
	ModalOverlay,
	PromoRow,
	PromoSection,
	QuantityBox,
	RemoveButton,
	RightColumn,
	SmallText,
	SummaryBlock,
	SummaryRow,
	TableHeader,
	Title,
	ToastIconWrapper,
	ToastNotification,
	TotalRow,
} from "./page.css";

const PROMO_DISCOUNT_PERCENT = 0.15;
const NEW_COUNTRY_MILES_REWARD = 40;
const ORDER_BASE_MILES_REWARD = 1;
const TOAST_DURATION_MS = 3000;

interface ICartItem {
	id: number;
	name: string;
	price: number;
	priceNote: string;
	quantity: number;
	image: string;
}

type CountryCode = "UA" | "TR";

const MOCK_ITEMS: ICartItem[] = [
	{
		id: 1,
		name: "Шоколадна фігурка Roshen Святий Миколай",
		price: 40,
		priceNote: "за 1 шт. 40 грам",
		quantity: 3,
		image: "https://placehold.co/50x70/eeeeee/999999?text=Choco",
	},
	{
		id: 2,
		name: "Мандарин Мона Ліза",
		price: 19.9,
		priceNote: "за 100 грам",
		quantity: 5,
		image: "https://placehold.co/50x70/eeeeee/999999?text=Mandarin",
	},
];

const formatPrice = (price: number): string => {
	return price % 1 === 0 ? price.toString() : price.toFixed(2);
};

export default function BasketPage() {
	const [items, setItems] = useState<ICartItem[]>(MOCK_ITEMS);
	const [miles, setMiles] = useState<number>(5);
	const [promoApplied, setPromoApplied] = useState<boolean>(false);
	const [promoInput, setPromoInput] = useState<string>("");
	const [toastVisible, setToastVisible] = useState<boolean>(false);
	const [previewCountry, setPreviewCountry] = useState<CountryCode | null>(null);

	const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

	const subtotal = useMemo(() => {
		return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	}, [items]);

	const promoDiscount = promoApplied ? subtotal * PROMO_DISCOUNT_PERCENT : 0;
	const finalTotal = Math.max(0, subtotal - promoDiscount - miles);

	const handleQuantityChange = (id: number, delta: number) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
			),
		);
	};

	const handleRemoveItem = (id: number) => {
		setItems((prevItems) => prevItems.filter((item) => item.id !== id));

		setToastVisible(true);
		if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
		toastTimerRef.current = setTimeout(() => setToastVisible(false), TOAST_DURATION_MS);
	};

	const handleMilesChange = (delta: number) => {
		setMiles((prev) => {
			const newMiles = prev + delta;
			return newMiles < 0 ? 0 : newMiles;
		});
	};

	const handleApplyPromo = () => {
		if (promoInput.trim().length > 0) setPromoApplied(true);
	};

	if (items.length === 0) {
		return (
			<Container>
				<Title>Ваш кошик</Title>
				<EmptyState>
					<EmptyText>Упс, тут пусто...</EmptyText>
					<EmptyButton onClick={() => window.location.reload()}>Вирушити за покупками</EmptyButton>
				</EmptyState>
			</Container>
		);
	}

	const renderLeftColumn = () => (
		<LeftColumn>
			<LeftBox>
				<TableHeader>
					<span>Товар</span>
					<span>Ціна</span>
					<span>Кількість</span>
				</TableHeader>

				<ItemsList>
					{items.map((item) => (
						<CartItem key={item.id}>
							<ItemInfo>
								<Image src={item.image} alt={item.name} width={50} height={70} />
								<p>{item.name}</p>
							</ItemInfo>

							<ItemPrice>
								<strong>{formatPrice(item.price)} грн</strong>
								<span>{item.priceNote}</span>
							</ItemPrice>

							<ItemActions>
								<QuantityBox>
									<button
										type="button"
										onClick={() => handleQuantityChange(item.id, -1)}
										disabled={item.quantity <= 1}
										aria-label="Зменшити кількість"
									>
										<Minus size={16} />
									</button>
									<span>{item.quantity}</span>
									<button
										type="button"
										onClick={() => handleQuantityChange(item.id, 1)}
										aria-label="Збільшити кількість"
									>
										<Plus size={16} />
									</button>
								</QuantityBox>
								<RemoveButton onClick={() => handleRemoveItem(item.id)} aria-label="Видалити товар">
									<X size={16} color="white" />
								</RemoveButton>
							</ItemActions>
						</CartItem>
					))}
				</ItemsList>

				<PromoSection>
					<PromoRow>
						<p>Скористатись промокодом</p>
						<InputGroup>
							<input
								type="text"
								placeholder="Введіть код"
								value={promoInput}
								onChange={(e) => setPromoInput(e.target.value)}
								disabled={promoApplied}
							/>
							<button type="button" onClick={handleApplyPromo} disabled={promoApplied}>
								{promoApplied ? "Застосовано" : "Додати"}
							</button>
						</InputGroup>
					</PromoRow>

					<PromoRow style={{ borderTop: "1px solid #eaeaea", paddingTop: "25px" }}>
						<p>Списати милі</p>
						<ItemActions style={{ gap: "15px" }}>
							<QuantityBox>
								<button
									type="button"
									onClick={() => handleMilesChange(-1)}
									disabled={miles <= 0}
									aria-label="Зменшити милі"
								>
									<Minus size={16} />
								</button>
								<span>{miles}</span>
								<button type="button" onClick={() => handleMilesChange(1)} aria-label="Збільшити милі">
									<Plus size={16} />
								</button>
							</QuantityBox>
							<RemoveButton onClick={() => setMiles(0)} aria-label="Скинути милі">
								<X size={16} color="white" />
							</RemoveButton>
						</ItemActions>
					</PromoRow>
				</PromoSection>
			</LeftBox>

			<InfoText>
				<AlertIcon>!</AlertIcon>
				<span>Загальна сума замовлення вказана без урахування доставки</span>
			</InfoText>
		</LeftColumn>
	);

	const renderRightColumn = () => (
		<RightColumn>
			<SummaryBlock>
				<h3>Чек замовлення</h3>
				<SummaryRow>
					<span>Сума замовлення:</span>
					<span>{formatPrice(subtotal)} грн</span>
				</SummaryRow>
				<SummaryRow>
					<span>Промокод:</span>
					<span>{promoApplied ? `-${formatPrice(promoDiscount)} грн` : "-15%"}</span>
				</SummaryRow>
				<SummaryRow>
					<span>Списання миль:</span>
					<span>-{miles}</span>
				</SummaryRow>
				<TotalRow>
					<span>Загалом:</span>
					<span>{formatPrice(finalTotal)} грн</span>
				</TotalRow>
				<CheckoutButton>Оформити замовлення</CheckoutButton>
			</SummaryBlock>

			<SummaryBlock>
				<h3>Нарахування миль</h3>
				<SummaryRow>
					<span>З чеку замовлення:</span>
					<span>+{ORDER_BASE_MILES_REWARD}</span>
				</SummaryRow>
				<SummaryRow>
					<span>Відкриття нових країн:</span>
					<span>+{NEW_COUNTRY_MILES_REWARD}</span>
				</SummaryRow>
				<TotalRow>
					<span>Загалом:</span>
					<span>+{ORDER_BASE_MILES_REWARD + NEW_COUNTRY_MILES_REWARD} миля</span>
				</TotalRow>
			</SummaryBlock>

			<SummaryBlock>
				<h3>Нові країни</h3>
				<CountryRow>
					<span>Україна</span>
					<button
						type="button"
						onClick={() => setPreviewCountry("UA")}
						aria-label="Попередній перегляд Україна"
					>
						<Eye size={18} strokeWidth={1.5} />
					</button>
				</CountryRow>
				<CountryRow>
					<span>Туреччина</span>
					<button
						type="button"
						onClick={() => setPreviewCountry("TR")}
						aria-label="Попередній перегляд Туреччина"
					>
						<Eye size={18} strokeWidth={1.5} />
					</button>
				</CountryRow>
				<SmallText>Доступний попередній перегляд віртуальних печаток</SmallText>
			</SummaryBlock>

			<InfoText style={{ marginTop: "5px" }}>
				<AlertIcon>!</AlertIcon>
				<span>Печатки та милі нараховуються лише після фактичного отримання замовлення</span>
			</InfoText>
		</RightColumn>
	);

	return (
		<Container>
			<Title>Ваш кошик</Title>

			<ContentGrid>
				{renderLeftColumn()}
				{renderRightColumn()}
			</ContentGrid>

			{toastVisible && (
				<ToastNotification>
					<ToastIconWrapper>
						<Check size={14} color="white" strokeWidth={3} />
					</ToastIconWrapper>
					<span>Товар видалено з кошика</span>
					<button type="button" onClick={() => setToastVisible(false)} aria-label="Закрити сповіщення">
						<X size={14} />
					</button>
				</ToastNotification>
			)}

			{previewCountry && (
				<ModalOverlay onClick={() => setPreviewCountry(null)}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<button
							type="button"
							className="close-btn"
							onClick={() => setPreviewCountry(null)}
							aria-label="Закрити модальне вікно"
						>
							<X size={20} />
						</button>
						<h4>
							Попередній перегляд віртуальної
							<br />
							печатки: {previewCountry === "UA" ? "Україна" : "Туреччина"}
						</h4>
						<img
							src={
								previewCountry === "UA"
									? "https://placehold.co/120x120/0057B7/FFDD00?text=UA"
									: "https://placehold.co/120x120/E30A17/FFFFFF?text=TR"
							}
							alt="Stamp"
							className="stamp-img"
						/>
					</ModalContent>
				</ModalOverlay>
			)}
		</Container>
	);
}
