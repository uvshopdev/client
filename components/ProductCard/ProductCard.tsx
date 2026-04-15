"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, ShoppingBasket } from "lucide-react";
import Image from "next/image";

import { addFavorite, removeFavorite } from "@/lib/favorites";
import { useBasket } from "@/store/basket";
import type { ProductType } from "@/types/products";
import {
	Actions,
	Badge,
	Bottom,
	Buttons,
	CartButton,
	Content,
	FavoriteButton,
	ImageWrap,
	ProductImage,
	ProductName,
	ProductPrice,
	Rating,
	Stock,
	Sub,
	Top,
} from "./ProductCard.css";

interface ProductProps extends ProductType {
	favorite: boolean;
}

const ProductCard = (product: ProductProps) => {
	const query = useQueryClient();
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

	const { addPosition } = useBasket();

	return (
		<Content>
			<Badge>- 15%</Badge>

			<Top>
				<ImageWrap>
					<ProductImage>
						<Image
							src={
								product.picture
									? `${process.env.NEXT_PUBLIC_FILES_URL}/products/${product.id}/large/${product.picture}.webp`
									: "/logo.png"
							}
							alt={product.name}
							fill
							loading="eager"
							unoptimized
						/>
					</ProductImage>
				</ImageWrap>

				<ProductName>{product.name}</ProductName>
			</Top>

			<Bottom>
				<Stock>
					<div className="indicator"></div>
					<div>немає в наявності</div>
				</Stock>

				<Rating>★★★★★</Rating>

				<Buttons>
					<div>
						<ProductPrice>{product.price} грн</ProductPrice>
						<Sub>{product.weight} мл / 100 г</Sub>
					</div>
					<Actions>
						<FavoriteButton
							type="button"
							aria-label="Видалити з вибраного"
							onClick={() => (product.favorite ? removeFromFavorite() : addToFavorite())}
							$favorite={product.favorite}
						>
							<Heart size={26} strokeWidth={1.5} />
						</FavoriteButton>

						<CartButton aria-label="Додати у кошик" onClick={() => addPosition(product, 1)}>
							<ShoppingBasket size={26} strokeWidth={1.5} />
						</CartButton>
					</Actions>
				</Buttons>
			</Bottom>
		</Content>
	);
};

export default ProductCard;
