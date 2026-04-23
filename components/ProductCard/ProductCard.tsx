"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, ShoppingBasket } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

import { addFavorite, removeFavorite } from "@/lib/favorites";
import { useBasket } from "@/store/basket";
import type { ProductType } from "@/types/products";
import {
	Actions,
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
	Top,
} from "./ProductCard.css";

interface ProductProps extends ProductType {
	favorite: boolean;
	categoryId?: number;
}

const ProductCard = ({ favorite, categoryId, ...product }: ProductProps) => {
	const t = useExtracted("product");
	const query = useQueryClient();
	const href = categoryId ? `/product/${product.id}?category_id=${categoryId}` : `/product/${product.id}`;

	const { mutate: addToFavorite } = useMutation({
		mutationKey: ["favorites"],
		mutationFn: async () => await addFavorite(product.id),
		onSuccess: async () => {
			await query.invalidateQueries({ queryKey: ["favorites"] });
			await query.invalidateQueries({ queryKey: ["favorites_ids"] });
			toast.success(t("Item added to favorites"));
		},
		onError: () => toast.error(t("Log in to add this item to your favourites")),
	});
	const { mutate: removeFromFavorite } = useMutation({
		mutationKey: ["favorites"],
		mutationFn: async () => await removeFavorite(product.id),
		onSuccess: async () => {
			await query.invalidateQueries({ queryKey: ["favorites"] });
			await query.invalidateQueries({ queryKey: ["favorites_ids"] });
			toast.success(t("Item removed from favorites"));
		},
		onError: () => toast.error(t("Failed to remove item from favorites")),
	});

	const { addPosition } = useBasket();

	return (
		<Content>
			<Top>
				<ImageWrap as={Link} href={href} prefetch={false}>
					<ProductImage>
						<Image
							src={
								product.picture
									? `${process.env.NEXT_PUBLIC_FILES_URL}/products/${product.id}/large/${product.picture}`
									: "/logo.webp"
							}
							alt={product.name}
							fill
							loading="lazy"
							unoptimized
						/>
					</ProductImage>
				</ImageWrap>

				<ProductName as={Link} href={href} prefetch={false}>
					{product.name}
				</ProductName>
			</Top>

			<Bottom>
				<Stock>
					<div className="indicator"></div>
					<div>{t("in stock")}</div>
				</Stock>

				<Rating>★★★★★</Rating>

				<Buttons>
					<div>
						<ProductPrice>
							{product.price} {t("UAH")}
						</ProductPrice>
					</div>
					<Actions>
						<FavoriteButton
							type="button"
							aria-label={t("Remove from favorites")}
							onClick={() => (favorite ? removeFromFavorite() : addToFavorite())}
							$favorite={favorite}
						>
							<Heart size={26} strokeWidth={1.5} />
						</FavoriteButton>

						<CartButton
							aria-label={t("Add to cart")}
							onClick={() => {
								if (!addPosition(product, 1)) {
									console.log("A");
									toast.success(t("Item added to cart"));
								}
							}}
						>
							<ShoppingBasket size={26} strokeWidth={1.5} />
						</CartButton>
					</Actions>
				</Buttons>
			</Bottom>
		</Content>
	);
};

export default React.memo(ProductCard);
