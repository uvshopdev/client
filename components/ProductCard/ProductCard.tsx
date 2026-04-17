"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
	const query = useQueryClient();
	const href = categoryId ? `/product/${product.id}?category_id=${categoryId}` : `/product/${product.id}`;

	const { mutate: addToFavorite } = useMutation({
		mutationKey: ["favorites"],
		mutationFn: async () => await addFavorite(product.id),
		onSuccess: async () => {
			await query.invalidateQueries({ queryKey: ["favorites"] });
			await query.invalidateQueries({ queryKey: ["favorites_ids"] });
			toast.success("Товар додано в обране");
		},
		onError: () => toast.error("Не вдалося додати товар в обране"),
	});
	const { mutate: removeFromFavorite } = useMutation({
		mutationKey: ["favorites"],
		mutationFn: async () => await removeFavorite(product.id),
		onSuccess: async () => {
			await query.invalidateQueries({ queryKey: ["favorites"] });
			await query.invalidateQueries({ queryKey: ["favorites_ids"] });
			toast.success("Товар видалено з обраного");
		},
		onError: () => toast.error("Не вдалося видалити товар з обраного"),
	});

	const { addPosition } = useBasket();

	return (
		<Content>
			{/* <Badge>- 15%</Badge> */}

			<Top>
				<ImageWrap as={Link} href={href} prefetch={false}>
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

				<ProductName as={Link} href={href} prefetch={false}>
					{product.name}
				</ProductName>
			</Top>

			<Bottom>
				<Stock>
					<div className="indicator"></div>
					<div>в наявності</div>
				</Stock>

				<Rating>★★★★★</Rating>

				<Buttons>
					<div>
						<ProductPrice>{product.price} грн</ProductPrice>
					</div>
					<Actions>
						<FavoriteButton
							type="button"
							aria-label="Видалити з вибраного"
							onClick={() => (favorite ? removeFromFavorite() : addToFavorite())}
							$favorite={favorite}
						>
							<Heart size={26} strokeWidth={1.5} />
						</FavoriteButton>

						<CartButton
							aria-label="Додати у кошик"
							onClick={() => {
								if (!addPosition(product, 1)) {
									console.log("A");
									toast.success("Товар додано у кошик");
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

export default ProductCard;
