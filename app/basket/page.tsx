"use client";

import { useQuery } from "@tanstack/react-query";
import { Eye, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getUserCountries } from "@/lib/countries";
import { getMilesSummary, getUserMiles } from "@/lib/miles";
import { useBasket } from "@/store/basket";
import {
	AlertIcon,
	CartItem,
	CheckoutButton,
	Container,
	ContentGrid,
	CountryRow,
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
	TotalRow,
} from "./page.css";

const formatPrice = (price: number): string => {
	return price % 1 === 0 ? price.toString() : price.toFixed(2);
};

export default function BasketPage() {
	const router = useRouter();
	const [milesToRedeem, setMilesToRedeem] = useState<number>(0);
	const [promoApplied, setPromoApplied] = useState<boolean>(false);
	const [promoInput, setPromoInput] = useState<string>("");
	const [previewCountry, setPreviewCountry] = useState<{ name: string; picture: string } | null>(null);

	const { data: countriesData, isSuccess } = useQuery({
		queryKey: ["countries"],
		queryFn: async () => await getUserCountries(),
	});

	const { data: milesEntries } = useQuery({
		queryKey: ["profile", "miles"],
		queryFn: async () => await getUserMiles(),
	});

	const { positions, subtotal, setPositionAmount, removePosition } = useBasket();
	const promoDiscount = promoApplied ? (subtotal * 0) / 100 : 0;
	const subtotalAfterPromo = Math.max(0, subtotal - promoDiscount);
	const availableMiles = useMemo(() => getMilesSummary(milesEntries ?? []).currentMiles, [milesEntries]);
	const maxMilesToRedeem = Math.min(availableMiles, Math.floor(subtotalAfterPromo));
	const redeemedMilesValue = Math.min(milesToRedeem, maxMilesToRedeem);
	const total = Math.max(0, subtotalAfterPromo - redeemedMilesValue);
	const orderMilesReward = Math.floor(total / 100);

	const newCountries = useMemo(() => {
		if (!isSuccess) {
			return [] as Array<{ id: number; name: string; picture: string }>;
		}

		const userCountryIds = new Set(countriesData.countries.map((country) => country.id));
		const uniqueNewCountries = new Map<number, { id: number; name: string; picture: string }>();

		Object.values(positions).forEach(({ product }) => {
			const country = product.country;
			if (!country || userCountryIds.has(country.id) || uniqueNewCountries.has(country.id)) {
				return;
			}

			uniqueNewCountries.set(country.id, {
				id: country.id,
				name: country.name,
				picture: country.picture,
			});
		});

		return Array.from(uniqueNewCountries.values());
	}, [countriesData, isSuccess, positions]);

	const newCountriesReward = newCountries.length * 20;

	const handleMilesChange = (delta: number) => {
		setMilesToRedeem((prev) => {
			const newMiles = prev + delta;
			if (newMiles < 0) return 0;
			if (newMiles > maxMilesToRedeem) return maxMilesToRedeem;
			return newMiles;
		});
	};

	useEffect(() => {
		setMilesToRedeem((prev) => Math.min(prev, maxMilesToRedeem));
	}, [maxMilesToRedeem]);

	const handleApplyPromo = () => {
		if (promoInput.trim().length > 0) setPromoApplied(true);
	};

	const handlePositionAmountChange = (id: number, amount: number, delta: number) => {
		setPositionAmount(id, amount + delta);
	};

	const renderLeftColumn = () => (
		<LeftColumn>
			<LeftBox>
				<TableHeader>
					<span>Товар</span>
					<span>Ціна</span>
					<span>Кількість</span>
				</TableHeader>

				<ItemsList>
					{Object.entries(positions).map(([_, position]) => (
						<CartItem key={position.product.id}>
							<ItemInfo>
								<Image
									src={`${process.env.NEXT_PUBLIC_FILES_URL}/products/${position.product.id}/small/${position.product.picture}.webp`}
									alt=""
									width={50}
									height={70}
									unoptimized
								/>
								<p>{position.product.name}</p>
							</ItemInfo>

							<ItemPrice>
								<strong>{formatPrice(position.product.price)} грн</strong>
								<span>test</span>
							</ItemPrice>

							<ItemActions>
								<QuantityBox>
									<button
										type="button"
										onClick={() => handlePositionAmountChange(position.product.id, position.amount, -1)}
										aria-label="Зменшити кількість"
									>
										<Minus size={16} />
									</button>
									<span>{position.amount}</span>
									<button
										type="button"
										onClick={() => handlePositionAmountChange(position.product.id, position.amount, 1)}
										aria-label="Збільшити кількість"
									>
										<Plus size={16} />
									</button>
								</QuantityBox>
								<RemoveButton onClick={() => removePosition(position.product.id)} aria-label="Видалити товар">
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
						<ItemActions style={{ gridColumn: 3, gap: "15px" }}>
							<QuantityBox>
								<button
									type="button"
									onClick={() => handleMilesChange(-1)}
									disabled={milesToRedeem <= 0}
									aria-label="Зменшити милі"
								>
									<Minus size={16} />
								</button>
								<span>{milesToRedeem}</span>
								<button
									type="button"
									onClick={() => handleMilesChange(1)}
									disabled={milesToRedeem >= maxMilesToRedeem}
									aria-label="Збільшити милі"
								>
									<Plus size={16} />
								</button>
							</QuantityBox>
							<RemoveButton onClick={() => setMilesToRedeem(0)} aria-label="Скинути милі">
								<X size={16} color="white" />
							</RemoveButton>
						</ItemActions>
					</PromoRow>
					<PromoRow style={{ paddingTop: 0, paddingBottom: 0 }}>
						<p>Доступно миль</p>
						<span style={{ gridColumn: 3, justifySelf: "end" }}>{availableMiles}</span>
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
					<span>{promoApplied ? `-${formatPrice(promoDiscount)} грн` : "-"}</span>
				</SummaryRow>
				<SummaryRow>
					<span>Списання миль:</span>
					<span>-{formatPrice(redeemedMilesValue)} грн</span>
				</SummaryRow>
				<TotalRow>
					<span>Загалом:</span>
					<span>{formatPrice(total)} грн</span>
				</TotalRow>
				<CheckoutButton onClick={() => router.push(`/basket/placeorder?miles=${milesToRedeem}`)}>Оформити замовлення</CheckoutButton>
			</SummaryBlock>

			<SummaryBlock>
				<h3>Нарахування миль</h3>
				<SummaryRow>
					<span>З чеку замовлення:</span>
					<span>+{orderMilesReward}</span>
				</SummaryRow>
				<SummaryRow>
					<span>Відкриття нових країн:</span>
					<span>+{newCountriesReward}</span>
				</SummaryRow>
				<TotalRow>
					<span>Загалом:</span>
					<span>+{orderMilesReward + newCountriesReward} миля</span>
				</TotalRow>
			</SummaryBlock>

			<SummaryBlock>
				<h3>Нові країни</h3>
				{newCountries.map((country) => (
					<CountryRow key={country.id}>
						<span>{country.name}</span>

						<button
							type="button"
							onClick={() => setPreviewCountry({ name: country.name, picture: country.picture })}
							aria-label="Попередній перегляд країни"
						>
							<Eye size={18} strokeWidth={1.5} />
						</button>
					</CountryRow>
				))}

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

			{previewCountry && (
				<ModalOverlay onClick={() => setPreviewCountry(null)}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<button type="button" className="close-btn" onClick={() => setPreviewCountry(null)} aria-label="Закрити модальне вікно">
							<X size={20} />
						</button>
						<h4>
							Попередній перегляд віртуальної
							<br />
							печатки: {previewCountry.name}
						</h4>
						<Image
							src={`${process.env.NEXT_PUBLIC_FILES_URL}/${previewCountry.picture}`}
							width={130}
							height={130}
							alt="Stamp"
							className="stamp-img"
						/>
					</ModalContent>
				</ModalOverlay>
			)}
		</Container>
	);
}
