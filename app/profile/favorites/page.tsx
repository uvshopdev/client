"use client";

import { Heart, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
	Actions,
	Badge,
	Bottom,
	CartButton,
	FavoriteButton,
	FavoritesContainer,
	FavoritesGrid,
	ImageWrap,
	Info,
	ProductCard,
	ProductImage,
	ProductName,
	ProductPrice,
	Rating,
	Stock,
	Sub,
} from "./page.css";

const FavoritesPage = () => {
	const favorites = [];
	const placeholderProducts = [
		{
			product: {
				id: 1,
				name: "Чіпси Lay's Max рифлені зі смаком сметани та цибулі",
				category: { id: 2, name: "Веган", picture: null, category_id: 1 },
				picture: "/images/slide1.png",
				country: null,
				article: "chipsy_lays_max",
				caloric: 321,
				price: "63.99",
				weight: "125",
				inStock: true,
				rating: "5/5",
				hasDiscount: true,
			},
		},
		{
			product: {
				id: 2,
				name: "Напій Coca-Cola без сильногазований",
				category: { id: 2, name: "Веган", picture: null, category_id: 1 },
				picture: "/images/slide2.png",
				country: null,
				article: "napiy_coca_cola",
				caloric: 45,
				price: "56.49",
				weight: "1750",
				inStock: true,
				rating: "4.5",
				hasDiscount: false,
			},
		},
		{
			product: {
				id: 3,
				name: "Кільце кальмара копчені",
				category: { id: 2, name: "Веган", picture: null, category_id: 1 },
				picture: "/images/slide3.png",
				country: null,
				article: "kilce_kalmara_kopceni",
				caloric: 140,
				price: "189.90",
				weight: "100",
				inStock: true,
				rating: "4.5",
				hasDiscount: false,
			},
		},
	];

	return (
		<FavoritesContainer>
			{favorites.length > 0 ? (
				<FavoritesGrid />
			) : (
				<FavoritesGrid>
					{placeholderProducts.map(({ product }) => (
						<ProductCard key={product.id}>
							{product.hasDiscount && <Badge>- 15%</Badge>}

							<ImageWrap>
								<ProductImage>
									<Image
										src={product.picture}
										alt={product.name}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
									/>
								</ProductImage>
							</ImageWrap>

							<ProductName>{product.name}</ProductName>

							<Stock>
								<span />
								{product.inStock ? "є в наявності" : "немає в наявності"}
							</Stock>

							<Rating>
								<u>★★★★★</u>
								<span>{product.rating}</span>
							</Rating>

							<Bottom>
								<Info>
									<ProductPrice>{product.price} грн</ProductPrice>
									<Sub>{product.weight} мл / 100 г</Sub>
								</Info>

								<Actions>
									<FavoriteButton type="button" aria-label="Видалити з вибраного">
										<Heart size={20} strokeWidth={1.5} />
									</FavoriteButton>

									<CartButton as={Link} href="/basket" aria-label="Додати у кошик">
										<ShoppingBasket size={20} strokeWidth={1.5} />
									</CartButton>
								</Actions>
							</Bottom>
						</ProductCard>
					))}
				</FavoritesGrid>
			)}
		</FavoritesContainer>
	);
};

export default FavoritesPage;
