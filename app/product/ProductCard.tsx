"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Heart, Star } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { addFavorite, getFavorites, removeFavorite } from "@/lib/favorites";
import { useBasket } from "@/store/basket";
import type { ProductType } from "@/types/products";
import * as S from "./ProductCard.css";

interface Props {
	product: ProductType;
}

export default function ProductCard({ product }: Props) {
	const t = useExtracted("product-page");

	const [qty, setQty] = useState(1);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const query = useQueryClient();
	const { addPosition } = useBasket();

	const { data: favorites = [] } = useQuery({
		queryKey: ["profile", "favorites", "set"],
		queryFn: async () => {
			const data = await getFavorites();
			return data.map(({ product }) => product.id);
		},
		placeholderData: [],
		staleTime: 3 * 60 * 1000,
	});

	const { mutate: addToFavorite } = useMutation({
		mutationKey: ["favorites"],
		mutationFn: async () => await addFavorite(product.id),
		onSuccess: async () => {
			await query.invalidateQueries({ queryKey: ["profile", "favorites"] });
			toast.success(t("Item added to favorites"));
		},
		onError: () => toast.error(t("Failed to add item to favorites")),
	});

	const { mutate: removeFromFavorite } = useMutation({
		mutationKey: ["favorites"],
		mutationFn: async () => await removeFavorite(product.id),
		onSuccess: async () => {
			await query.invalidateQueries({ queryKey: ["profile", "favorites"] });
			toast.success(t("Item removed from favorites"));
		},
		onError: () => toast.error(t("Failed to remove item from favorites")),
	});

	const toggle = (key: string) => setOpenKeys(openKeys.includes(key) ? openKeys.filter((k) => k !== key) : [...openKeys, key]);

	const handleAddToCart = () => {
		addPosition(product, qty);
		toast.success(t("Item added to cart"));
	};

	const hasDescription = product.description && product.description !== "null";
    const hasIngredients = product.ingredients && product.ingredients !== "null";

	return (
		<S.Wrapper>
			<S.Container>
				<S.Left>
					<S.MainImage>
						<Image src={product.picture ? `${product.picture}` : "/logo.webp"} alt={product.name} loading="lazy" unoptimized fill />

						<S.WishButton
							onClick={() => (favorites.includes(product.id) ? removeFromFavorite() : addToFavorite())}
							aria-label={favorites.includes(product.id) ? t("Remove from favorites") : t("Add to favorites")}
						>
							<Heart
								fill={favorites.includes(product.id) ? "#E93A36" : "none"}
								color={favorites.includes(product.id) ? "#E93A36" : "#BDBDBD"}
								strokeWidth={1.5}
							/>
						</S.WishButton>
					</S.MainImage>
				</S.Left>

				<S.Right>
					<S.Block>
						<S.Title>{product.name}</S.Title>
					</S.Block>

					<S.Block>
						<S.RowBetween>
							<S.CodeStock>
								<span>
									<S.BoldText>{t("code:")}</S.BoldText> {product.article}
								</span>
								<S.Stock>
									<S.DotStatus />
									{t("in stock")}
								</S.Stock>
							</S.CodeStock>
						</S.RowBetween>

						<S.RatingRow>
							<S.Stars>
								{[1, 2, 3, 4, 5].map((i) => (
									<Star
										key={i}
										size={18}
										fill={i <= product.rating ? "#ffdb0d" : "none"}
										color={i <= product.rating ? "#ffdb0d" : "#D3D3D3"}
										strokeWidth={1.5}
									/>
								))}
							</S.Stars>
							<span>{product.rating}/5</span>
						</S.RatingRow>
					</S.Block>

					<S.Block>
						<S.PriceRow>
							<S.PriceBlock>
								<S.Price>
									{product.price} {t("UAH")}
								</S.Price>
								{product.price_unit && (
								<S.PriceUnit>
									{t("per")} {product.price_unit}
								</S.PriceUnit>
							)}
							</S.PriceBlock>

							<S.BuyControls>
								<S.Quantity>
									<button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label={t("Decrease quantity")}>
										-
									</button>
									<span>{qty}</span>
									<button type="button" onClick={() => setQty(qty + 1)} aria-label={t("Increase quantity")}>
										+
									</button>
								</S.Quantity>
								<S.BuyButton type="button" onClick={handleAddToCart}>
									{t("Buy")}
								</S.BuyButton>
							</S.BuyControls>
						</S.PriceRow>
					</S.Block>

					<S.InfoBlock>
						<S.Characteristics>
							<S.CharacteristicsTitle>{t("Characteristics:")}</S.CharacteristicsTitle>
							<S.CharacteristicsGrid>
								{product.category && (
									<S.CharItem>
										<S.CharLabel>{t("category:")}</S.CharLabel>
										<S.CharValue>{product.category.name}</S.CharValue>
									</S.CharItem>
								)}
								{product.country && (
									<S.CharItem>
										<S.CharLabel>{t("country of origin:")}</S.CharLabel>
										<S.CharValue>{product.country.name}</S.CharValue>
									</S.CharItem>
								)}
								{product.weight > 0 && (
									<S.CharItem>
										<S.CharLabel>{t("weight:")}</S.CharLabel>
										<S.CharValue>{product.weight} {t("g")}</S.CharValue>
									</S.CharItem>
								)}
								{product.caloric > 0 && (
									<S.CharItem>
										<S.CharLabel>{t("caloric content:")}</S.CharLabel>
										<S.CharValue>{product.caloric} {t("kcal")}</S.CharValue>
									</S.CharItem>
								)}
							</S.CharacteristicsGrid>
						</S.Characteristics>

						<S.Accordion>
                            {hasDescription && (
                                <S.AccordionItem>
                                    <S.AccordionHeader onClick={() => toggle("desc")}>
                                        {t("Description")}:{openKeys.includes("desc") ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                    </S.AccordionHeader>
                                    {openKeys.includes("desc") && <S.AccordionContent>{product.description}</S.AccordionContent>}
                                </S.AccordionItem>
                            )}
                            {hasIngredients && (
                                <S.AccordionItem>
                                    <S.AccordionHeader onClick={() => toggle("comp")}>
                                        {t("Composition")}:{openKeys.includes("comp") ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                    </S.AccordionHeader>
                                    {openKeys.includes("comp") && <S.AccordionContent>{product.ingredients}</S.AccordionContent>}
                                </S.AccordionItem>
                            )}
                        </S.Accordion>
					</S.InfoBlock>
				</S.Right>
			</S.Container>
		</S.Wrapper>
	);
}
