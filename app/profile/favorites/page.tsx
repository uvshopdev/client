"use client";

import { Heart, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Actions,
  Badge,
  Bottom,
  CartButton,
  EmptyIcon,
  EmptyState,
  EmptyText,
  EmptyTitle,
  FavoriteButton,
  FavoritesContainer,
  FavoritesGrid,
  GoShopButton,
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

const initialProducts = [
  {
    id: 1,
    name: "Чіпси Lay's Max рифлені зі смаком сметани та цибулі",
    picture: "/images/slide1.png",
    price: "63.99",
    weight: "125",
    inStock: true,
    rating: "5/5",
    hasDiscount: true,
  },
  {
    id: 2,
    name: "Напій Coca-Cola без сильногазований",
    picture: "/images/slide2.png",
    price: "56.49",
    weight: "1750",
    inStock: true,
    rating: "4.5",
    hasDiscount: false,
  },
  {
    id: 3,
    name: "Кільце кальмара копчені",
    picture: "/images/slide3.png",
    price: "189.90",
    weight: "100",
    inStock: true,
    rating: "4.5",
    hasDiscount: false,
  },
];

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(initialProducts);

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  if (favorites.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>
          <Heart size={64} strokeWidth={1} />
        </EmptyIcon>
        <EmptyTitle>Список вибраного порожній</EmptyTitle>
        <EmptyText>Додавайте товари до вибраного, щоб не загубити їх</EmptyText>
        <GoShopButton href="/">Перейти до каталогу</GoShopButton>
      </EmptyState>
    );
  }

  return (
    <FavoritesContainer>
      <FavoritesGrid>
        {favorites.map((product) => (
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
                <FavoriteButton
                  type="button"
                  aria-label="Видалити з вибраного"
                  onClick={() => removeFromFavorites(product.id)}
                >
                  <Heart size={26} strokeWidth={1.5} fill="#e53935" />
                </FavoriteButton>

                <CartButton
                  as={Link}
                  href="/basket"
                  aria-label="Додати у кошик"
                >
                  <ShoppingBasket size={20} strokeWidth={1.5} />
                </CartButton>
              </Actions>
            </Bottom>
          </ProductCard>
        ))}
      </FavoritesGrid>
    </FavoritesContainer>
  );
};

export default FavoritesPage;
