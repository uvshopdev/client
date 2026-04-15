"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
	ModalClose,
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

const MOCK_ITEMS = [
	{
		id: 1,
		name: "Шоколадна фігурка Roshen Святий Миколай",
		price: 40,
		priceNote: "за 1 шт. 40 грам",
		quantity: 3,
		image: "https://placehold.co/50x70/f3eee9/999999?text=Choco",
	},
	{
		id: 2,
		name: "Мандарин Мона Ліза",
		price: 19.9,
		priceNote: "за 100 грам",
		quantity: 5,
		image: "https://placehold.co/50x70/f3eee9/999999?text=Mandarin",
	},
];

// --- 100% НАДЕЖНЫЕ ВШИТЫЕ SVG ИКОНКИ ---
const PlusIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
		<line x1="12" y1="5" x2="12" y2="19"></line>
		<line x1="5" y1="12" x2="19" y2="12"></line>
	</svg>
);

const MinusIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
		<line x1="5" y1="12" x2="19" y2="12"></line>
	</svg>
);

const CloseIcon = ({ size = 18, color = "currentColor" }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
		<line x1="18" y1="6" x2="6" y2="18"></line>
		<line x1="6" y1="6" x2="18" y2="18"></line>
	</svg>
);

const CheckIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
		<polyline points="20 6 9 17 4 12"></polyline>
	</svg>
);

const EyeIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A4A4A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
		<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
		<circle cx="12" cy="12" r="3"></circle>
	</svg>
);
// ----------------------------------------

export default function BasketPage() {
	const router = useRouter();
	const [items, setItems] = useState(MOCK_ITEMS);
	const [miles, setMiles] = useState(5);
	const [promoApplied, setPromoApplied] = useState(false);
	const [promoInput, setPromoInput] = useState("");
	const [toastVisible, setToastVisible] = useState(false);
	const [previewCountry, setPreviewCountry] = useState<string | null>(null);

	const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

	const subtotal = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items]);
	const promoDiscount = promoApplied ? subtotal * 0.15 : 0;
	const finalTotal = Math.max(0, subtotal - promoDiscount - miles);

	const handleQuantityChange = (id: number, delta: number) => {
		setItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
	};

	const handleRemoveItem = (id: number) => {
		setItems(prev => prev.filter(item => item.id !== id));
		setToastVisible(true);
		if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
		toastTimerRef.current = setTimeout(() => setToastVisible(false), 3000);
	};

	if (items.length === 0) {
		return (
			<Container>
				<Title>Ваш кошик</Title>
				<EmptyState>
					<EmptyText>Упс, тут поки що пусто...</EmptyText>
					<EmptyButton onClick={() => router.push("/")}>Вирушити за покупками</EmptyButton>
				</EmptyState>
			</Container>
		);
	}

	return (
		<Container>
			<Title>Ваш кошик</Title>
			<ContentGrid>
				<LeftColumn>
					<LeftBox>
						<TableHeader>
							<span>Товар</span>
							<span>Ціна</span>
							<span>Кількість</span>
							<span />
						</TableHeader>
						<ItemsList>
							{items.map((item) => (
								<CartItem key={item.id}>
									<ItemInfo>
										<div className="image-wrap">
											<Image src={item.image} alt={item.name} fill style={{ objectFit: "contain" }} />
										</div>
										<p>{item.name}</p>
									</ItemInfo>
									<ItemPrice>
										<strong>{item.price % 1 === 0 ? item.price : item.price.toFixed(2)} грн</strong>
										<span>{item.priceNote}</span>
									</ItemPrice>
									<ItemActions>
										<QuantityBox>
											<button type="button" onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>
												<MinusIcon />
											</button>
											<span className="qty-value">{item.quantity}</span>
											<button type="button" onClick={() => handleQuantityChange(item.id, 1)}>
												<PlusIcon />
											</button>
										</QuantityBox>
									</ItemActions>
									<div style={{ display: "flex", justifyContent: "flex-end" }}>
										<RemoveButton onClick={() => handleRemoveItem(item.id)}>
											<CloseIcon color="white" />
										</RemoveButton>
									</div>
								</CartItem>
							))}
						</ItemsList>
						<PromoSection>
							<PromoRow>
								<p>Скористатись промокодом</p>
								<InputGroup>
									<input type="text" placeholder="Введіть код" value={promoInput} onChange={e => setPromoInput(e.target.value)} disabled={promoApplied} />
									<button type="button" onClick={() => promoInput.trim() && setPromoApplied(true)} disabled={promoApplied}>
										{promoApplied ? "Застосовано" : "Додати"}
									</button>
								</InputGroup>
							</PromoRow>
							<PromoRow className="bordered">
								<p>Списати милі</p>
								<div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
									<QuantityBox>
										<button type="button" onClick={() => setMiles(m => Math.max(0, m - 1))} disabled={miles <= 0}>
											<MinusIcon />
										</button>
										<span className="qty-value">{miles}</span>
										<button type="button" onClick={() => setMiles(m => m + 1)}>
											<PlusIcon />
										</button>
									</QuantityBox>
									<RemoveButton onClick={() => setMiles(0)}>
										<CloseIcon color="white" />
									</RemoveButton>
								</div>
							</PromoRow>
						</PromoSection>
					</LeftBox>
					<InfoText><AlertIcon>!</AlertIcon><span>Загальна сума замовлення вказана без урахування доставки</span></InfoText>
				</LeftColumn>

				<RightColumn>
					<SummaryBlock>
						<h3>Чек замовлення</h3>
						<SummaryRow><span>Сума замовлення:</span><span>{subtotal.toFixed(2)} грн</span></SummaryRow>
						<SummaryRow><span>Промокод:</span><span>{promoApplied ? `-${promoDiscount.toFixed(2)} грн` : "-15%"}</span></SummaryRow>
						<SummaryRow><span>Списання миль:</span><span>-{miles}</span></SummaryRow>
						<TotalRow><span>Загалом:</span><span className="total-price">{finalTotal.toFixed(2)} грн</span></TotalRow>
						<CheckoutButton onClick={() => router.push("/basket/placeorder")}>Оформити замовлення</CheckoutButton>
					</SummaryBlock>

					<SummaryBlock>
						<h3>Нарахування миль</h3>
						<SummaryRow><span>З чеку замовлення:</span><span>+1</span></SummaryRow>
						<SummaryRow><span>Відкриття нових країн:</span><span>+40</span></SummaryRow>
						<TotalRow><span>Загалом:</span><span className="total-miles">+41 миля</span></TotalRow>
					</SummaryBlock>

					<SummaryBlock>
						<h3>Нові країни</h3>
						<CountryRow>
							<span>Україна</span>
							<button type="button" onClick={() => setPreviewCountry("UA")}>
								<EyeIcon />
							</button>
						</CountryRow>
						<CountryRow className="last">
							<span>Туреччина</span>
							<button type="button" onClick={() => setPreviewCountry("TR")}>
								<EyeIcon />
							</button>
						</CountryRow>
						<SmallText>Доступний попередній перегляд віртуальних печаток</SmallText>
					</SummaryBlock>
					<InfoText><AlertIcon>!</AlertIcon><span>Печатки та милі нараховуються лише після фактичного отримання замовлення</span></InfoText>
				</RightColumn>
			</ContentGrid>

			{toastVisible && (
				<ToastNotification>
					<ToastIconWrapper><CheckIcon /></ToastIconWrapper>
					<span>Товар видалено з кошика</span>
					<button type="button" onClick={() => setToastVisible(false)}>
						<CloseIcon color="#A4A4A4" size={14} />
					</button>
				</ToastNotification>
			)}

			{previewCountry && (
				<ModalOverlay onClick={() => setPreviewCountry(null)}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<ModalClose type="button" onClick={() => setPreviewCountry(null)}>
							<CloseIcon color="currentColor" size={24} />
						</ModalClose>
						<h4>Попередній перегляд віртуальної<br />печатки: {previewCountry === "UA" ? "Україна" : "Туреччина"}</h4>
						<img src={previewCountry === "UA" ? "https://placehold.co/120x120/0057B7/FFDD00?text=UA" : "https://placehold.co/120x120/E30A17/FFFFFF?text=TR"} alt="Stamp" className="stamp-img" />
					</ModalContent>
				</ModalOverlay>
			)}
		</Container>
	);
}