"use client";

import { useQuery } from "@tanstack/react-query";
import { Eye, Minus, Plus, X } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

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
	const t = useExtracted("basket");
	const router = useRouter();
	const [milesToRedeem, setMilesToRedeem] = useState<number>(0);
	const [promoApplied, setPromoApplied] = useState<boolean>(false);
	const [promoInput, setPromoInput] = useState<string>("");
	const [previewCountry, setPreviewCountry] = useState<{ name: string; picture: string } | null>(null);

	const { data: countriesData, isSuccess } = useQuery({
		queryKey: ["countries"],
		queryFn: async () => await getUserCountries(),
	});

	const { data: miles = [] } = useQuery({
		queryKey: ["profile", "miles"],
		queryFn: async () => await getUserMiles(),
		placeholderData: [],
	});

	const { positions, subtotal, setPositionAmount, removePosition } = useBasket();
	const promoDiscount = promoApplied ? (subtotal * 0) / 100 : 0;
	const subtotalAfterPromo = Math.max(0, subtotal - promoDiscount);
	const availableMiles = useMemo(() => getMilesSummary(miles), [miles]);
	const maxMilesToRedeem = Math.min(availableMiles, Math.floor(subtotalAfterPromo));
	const redeemedMilesValue = Math.min(milesToRedeem, maxMilesToRedeem);
	const total = Math.max(0, subtotalAfterPromo - redeemedMilesValue);
	const orderMilesReward = Math.floor(total / 100);
	const isBasketEmpty = Object.keys(positions).length === 0;

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
					<span>{t("Product")}</span>
					<span>{t("Price")}</span>
					<span>{t("Quantity")}</span>
				</TableHeader>

				<ItemsList>
					{Object.entries(positions).map(([_, position]) => {
						const href = position.product.category?.id
							? `/product/${position.product.id}?category_id=${position.product.category.id}`
							: `/product/${position.product.id}`;

						return (
							<CartItem key={position.product.id}>
								<ItemInfo as={Link} href={href} style={{ textDecoration: "none" }}>
									<Image
										src={`${position.product.picture}`}
										alt={position.product.name}
										width={50}
										height={70}
										unoptimized
										loading="lazy"
									/>
									<p>{position.product.name}</p>
								</ItemInfo>

								<ItemPrice>
									<strong>
										{formatPrice(position.product.price)} {t("UAH")}
									</strong>
								</ItemPrice>

								<ItemActions>
									<QuantityBox>
										<button
											type="button"
											onClick={() => handlePositionAmountChange(position.product.id, position.amount, -1)}
											aria-label={t("Decrease quantity")}
										>
											<Minus size={16} />
										</button>
										<span>{position.amount}</span>
										<button
											type="button"
											onClick={() => handlePositionAmountChange(position.product.id, position.amount, 1)}
											aria-label={t("Increase quantity")}
										>
											<Plus size={16} />
										</button>
									</QuantityBox>
									<RemoveButton onClick={() => removePosition(position.product.id)} aria-label={t("Remove product")}>
										<X size={16} color="white" />
									</RemoveButton>
								</ItemActions>
							</CartItem>
						);
					})}
				</ItemsList>

				<PromoSection>
					<PromoRow>
						<p>{t("Use promo code")}</p>
						<InputGroup>
							<input
								type="text"
								placeholder={t("Enter code")}
								value={promoInput}
								onChange={(e) => setPromoInput(e.target.value)}
								disabled={promoApplied}
							/>
							<button type="button" onClick={handleApplyPromo} disabled={promoApplied}>
								{promoApplied ? t("Applied") : t("Add")}
							</button>
						</InputGroup>
					</PromoRow>

					<PromoRow style={{ borderTop: "1px solid #eaeaea", paddingTop: "25px" }}>
						<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
							<p style={{ margin: 0 }}>{t("Redeem miles")}</p>
							<span style={{ fontSize: "13px", color: "#888", fontWeight: 400 }}>
								{t("Available:")} {availableMiles}
							</span>
						</div>

						<ItemActions style={{ width: "auto", gap: "15px" }}>
							<QuantityBox>
								<button
									type="button"
									onClick={() => handleMilesChange(-1)}
									disabled={milesToRedeem <= 0}
									aria-label={t("Decrease miles")}
								>
									<Minus size={16} />
								</button>
								<span>{milesToRedeem}</span>
								<button
									type="button"
									onClick={() => handleMilesChange(1)}
									disabled={milesToRedeem >= maxMilesToRedeem}
									aria-label={t("Increase miles")}
								>
									<Plus size={16} />
								</button>
							</QuantityBox>
							<RemoveButton onClick={() => setMilesToRedeem(0)} aria-label={t("Reset miles")}>
								<X size={16} color="white" />
							</RemoveButton>
						</ItemActions>
					</PromoRow>
				</PromoSection>
			</LeftBox>

			<InfoText>
				<AlertIcon>!</AlertIcon>
				<span>{t("The total order amount does not include shipping")}</span>
			</InfoText>
		</LeftColumn>
	);

	const renderRightColumn = () => (
		<RightColumn>
			<SummaryBlock>
				<h3>{t("Order receipt")}</h3>
				<SummaryRow>
					<span>{t("Order amount:")}</span>
					<span>
						{formatPrice(subtotal)} {t("UAH")}
					</span>
				</SummaryRow>
				<SummaryRow>
					<span>{t("Promo code:")}</span>
					<span>{promoApplied ? `-${formatPrice(promoDiscount)} ${t("UAH")}` : "-"}</span>
				</SummaryRow>
				<SummaryRow>
					<span>{t("Miles redemption:")}</span>
					<span>
						-{formatPrice(redeemedMilesValue)} {t("UAH")}
					</span>
				</SummaryRow>
				<TotalRow>
					<span>{t("Total:")}</span>
					<span>
						{formatPrice(total)} {t("UAH")}
					</span>
				</TotalRow>
				<CheckoutButton
					disabled={isBasketEmpty}
					style={{ opacity: isBasketEmpty ? 0.5 : 1, cursor: isBasketEmpty ? "not-allowed" : "pointer" }}
					onClick={() => {
						if (isBasketEmpty) {
							toast.error(t("Cart is empty"));
							return;
						}
						router.push(`/basket/placeorder?miles=${milesToRedeem}`);
					}}
				>
					{t("Checkout")}
				</CheckoutButton>
			</SummaryBlock>

			<SummaryBlock>
				<h3>{t("Miles accrual")}</h3>
				<SummaryRow>
					<span>{t("From order receipt:")}</span>
					<span>+{orderMilesReward}</span>
				</SummaryRow>
				<SummaryRow>
					<span>{t("Discovering new countries:")}</span>
					<span>+{newCountriesReward}</span>
				</SummaryRow>
				<TotalRow>
					<span>{t("Total:")}</span>
					<span>
						+{orderMilesReward + newCountriesReward} {t("miles")}
					</span>
				</TotalRow>
			</SummaryBlock>

			<SummaryBlock>
				<h3>{t("New countries")}</h3>
				{newCountries.map((country) => (
					<CountryRow key={country.id}>
						<span>{country.name}</span>

						<button
							type="button"
							onClick={() => setPreviewCountry({ name: country.name, picture: country.picture })}
							aria-label={t("Preview country")}
						>
							<Eye size={18} strokeWidth={1.5} />
						</button>
					</CountryRow>
				))}

				<SmallText>{t("Virtual stamps preview available")}</SmallText>
			</SummaryBlock>

			<InfoText style={{ marginTop: "5px" }}>
				<AlertIcon>!</AlertIcon>
				<span>{t("Stamps and miles are credited only after actual receipt of the order")}</span>
			</InfoText>
		</RightColumn>
	);

	return (
		<Container>
			<Title>{t("Your cart")}</Title>

			<ContentGrid>
				{renderLeftColumn()}
				{renderRightColumn()}
			</ContentGrid>

			{previewCountry && (
				<ModalOverlay onClick={() => setPreviewCountry(null)}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<button type="button" className="close-btn" onClick={() => setPreviewCountry(null)} aria-label={t("Close modal")}>
							<X size={20} />
						</button>
						<h4>
							{t("Virtual stamp preview:")}
							<br />
							{previewCountry.name}
						</h4>
						<Image
							src={`${process.env.NEXT_PUBLIC_FILES_URL}/${previewCountry.picture}`}
							width={130}
							height={130}
							alt="Stamp"
							className="stamp-img"
							unoptimized
						/>
					</ModalContent>
				</ModalOverlay>
			)}
		</Container>
	);
}
