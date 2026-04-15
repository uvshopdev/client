"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Heart, House, Star } from "lucide-react";
import { useState } from "react";

import { addFavorite, removeFavorite } from "@/lib/favorites";
import { useBasket } from "@/store/basket";
import type { ProductType } from "@/types/products";
import * as S from "./ProductCard.css";

interface ProductCardProps {
	image: string;
	product: ProductType;
	favorite: boolean;
}

export default function ProductCard({ image, product, favorite }: ProductCardProps) {
	const [qty, setQty] = useState(1);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const query = useQueryClient();
	const { addPosition } = useBasket();

	const { mutate: addToFavorite } = useMutation({
		mutationKey: ["favorites"],
		mutationFn: async () => await addFavorite(product.id),
		onSuccess: async () => {
			await query.invalidateQueries({ queryKey: ["favorites"] });
			await query.invalidateQueries({ queryKey: ["favorites_ids"] });
		},
	});

	const { mutate: removeFromFavorite } = useMutation({
		mutationKey: ["favorites"],
		mutationFn: async () => await removeFavorite(product.id),
		onSuccess: async () => {
			await query.invalidateQueries({ queryKey: ["favorites"] });
			await query.invalidateQueries({ queryKey: ["favorites_ids"] });
		},
	});

	const rating = 4;

	const toggle = (key: string) => setOpenKeys(openKeys.includes(key) ? openKeys.filter((k) => k !== key) : [...openKeys, key]);

	return (
		<S.Wrapper>
			<S.Container>
				{/* LEFT */}
				<S.Left>
					<S.MainImage>
						<S.Image src={image} />

						<S.WishButton onClick={() => (favorite ? removeFromFavorite() : addToFavorite())}>
							<Heart fill={favorite ? "#E93A36" : "none"} />
						</S.WishButton>
					</S.MainImage>
				</S.Left>

				{/* RIGHT */}
				<S.Right>
					{/* Info */}
					<S.Block>
						<S.Breadcrumbs>
							<House size={14} />
							<span>/ Бакалія / Їжа швидкого приготування</span>
						</S.Breadcrumbs>

						<S.Title>{product.name}</S.Title>
					</S.Block>

					<S.Block>
						<S.RowBetween>
							<S.CodeStock>
								<span>код: {product.article}</span>
								<S.Stock>
									<S.DotStatus />є в наявності
								</S.Stock>
							</S.CodeStock>
						</S.RowBetween>

						<S.RatingRow>
							<S.Stars>
								{[1, 2, 3, 4, 5].map((i) => (
									<Star key={i} size={18} fill={i <= rating ? "#ffdb0d" : "none"} color="#3B3028" />
								))}
							</S.Stars>
							<span>{rating}/5</span>
						</S.RatingRow>
					</S.Block>

					<S.Block>
						<S.PriceRow>
							<S.PriceBlock>
								<S.Price>{product.price} грн</S.Price>
								<S.SubPrice>за 1 шт • {product.weight} г</S.SubPrice>
							</S.PriceBlock>

							<S.BuyControls>
								<S.Quantity>
									<button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>
										-
									</button>
									<span>{qty}</span>
									<button type="button" onClick={() => setQty(qty + 1)}>
										+
									</button>
								</S.Quantity>
								<S.BuyButton type="button" onClick={() => addPosition(product, qty)}>
									Купити
								</S.BuyButton>
							</S.BuyControls>
						</S.PriceRow>
					</S.Block>

					{/* Характеристики + Аккордеон */}
					<S.InfoBlock>
						<S.Characteristics>
							<S.CharacteristicsTitle>Характеристики:</S.CharacteristicsTitle>
							<S.CharacteristicsGrid>
								<S.CharItem>
									<S.CharLabel>вага:</S.CharLabel>
									<S.CharValue>120 грам</S.CharValue>
								</S.CharItem>
								<S.CharItem>
									<S.CharLabel>виробник:</S.CharLabel>
									<S.CharValue>Samyang</S.CharValue>
								</S.CharItem>
								<S.CharItem>
									<S.CharLabel>калорійність:</S.CharLabel>
									<S.CharValue>369 ккал</S.CharValue>
								</S.CharItem>
								<S.CharItem>
									<S.CharLabel>країна виробник:</S.CharLabel>
									<S.CharValue>Південна Корея</S.CharValue>
								</S.CharItem>
							</S.CharacteristicsGrid>
						</S.Characteristics>

						<S.Accordion>
							{[
								{
									key: "desc",
									title: "Опис",
									content:
										"Локшина Hot Chicken Ramen Stew - ще один варіант гострої, по-справжньому вогняної страви від корейського бренду Samyang!...",
								},
								{
									key: "comp",
									title: "Склад",
									content: "Макаронні вироби (67,4%): борошно пшеничне (41%), пальмова олія (9%), крохмаль тапіоки...",
								},
							].map(({ key, title, content }) => (
								<S.AccordionItem key={key}>
									<S.AccordionHeader onClick={() => toggle(key)}>
										{title}:{openKeys.includes(key) ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
									</S.AccordionHeader>
									{openKeys.includes(key) && <S.AccordionContent>{content}</S.AccordionContent>}
								</S.AccordionItem>
							))}
						</S.Accordion>
					</S.InfoBlock>
				</S.Right>
			</S.Container>
		</S.Wrapper>
	);
}
