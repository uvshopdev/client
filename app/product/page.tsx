"use client";

import React, { useState } from "react";
import {
  Wrapper,
  ProductCard,
  Left,
  MainImage,
  Image,
  Arrow,
  Thumbs,
  Thumb,
  Right,
  Title,
  Price,
  BuyRow,
  Quantity,
  QtyBtn,
  BuyButton,
  Characteristics,
  CharItem,
  ReviewsSection,
  ReviewsTitle,
  ReviewsWrapper,
  ReviewsScroll,
  ReviewsRow,
  ReviewCard,
  ReviewTop,
  ReviewHeader,
  Name,
  Date,
  Stars,
  Star,
  ReviewText,
  Controls,
  ArrowBtn,
  Dots,
  Dot,
  ProductsSection,
  ProductsTitle,
  ProductsGrid,
  ProductItem,
  ProductImg,
  ProductName,
  ProductPrice
} from "./page.css";



const images = [
  "/test.png",
  "/test.png",
  "/test.png"
];

const reviews = [
  { name: "Іван Іваненко", date: "06.11.2025", rating: 5, text: "Дуже смачно, але дуже гостро 🔥" },
  { name: "Іван Іванчук", date: "12.12.2025", rating: 3, text: "Не погано, але не моє" },
  { name: "Ім’я Прізвище", date: "07.12.2025", rating: 5, text: "Смачно, рекомендую" },
  { name: "Олег", date: "01.01.2026", rating: 4, text: "Добре, але можна краще" },
];

const products = [
  { name: "Ramune Soda", price: "90 грн", img: "/test.png" },
  { name: "Pocky Chocolate", price: "120 грн", img: "/test.png" },
  { name: "Mochi", price: "150 грн", img: "/test.png" },
  { name: "KitKat Matcha", price: "110 грн", img: "/test.png" },
];

export default function ProductPage() {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <Wrapper>
      <ProductCard>

        {/* LEFT */}
        <Left>
          <MainImage>
            <Image src={images[active]} />

            <Arrow $left onClick={() => setActive((active - 1 + images.length) % images.length)}>
              {"<"}
            </Arrow>

            <Arrow onClick={() => setActive((active + 1) % images.length)}>
              {">"}
            </Arrow>
          </MainImage>

          <Thumbs>
            {images.map((img, i) => (
              <Thumb key={i} $active={i === active} onClick={() => setActive(i)}>
                <img src={img} />
              </Thumb>
            ))}
          </Thumbs>
        </Left>

        {/* RIGHT */}
        <Right>
          <Title>
            Гостра локшина Samyang Hot Chicken Ramen Stew
          </Title>

          <Price>190 грн</Price>

          <BuyRow>
            <Quantity>
              <QtyBtn onClick={() => setQty(Math.max(1, qty - 1))}>-</QtyBtn>
              {qty}
              <QtyBtn onClick={() => setQty(qty + 1)}>+</QtyBtn>
            </Quantity>

            <BuyButton>Купити</BuyButton>
          </BuyRow>

          <Characteristics>
            <CharItem><b>вага:</b> 120 г</CharItem>
            <CharItem><b>виробник:</b> Samyang</CharItem>
            <CharItem><b>калорійність:</b> 369 ккал</CharItem>
            <CharItem><b>країна:</b> Корея</CharItem>
          </Characteristics>
        </Right>

      </ProductCard>

      <ReviewsSection>

  <ReviewsTitle>Відгуки</ReviewsTitle>

  <ReviewsWrapper>

    <ReviewsScroll>
      <ReviewsRow>
        {reviews.map((r, i) => (
          <ReviewCard key={i}>

            <ReviewTop>
              <ReviewHeader>
                <Name>{r.name}</Name>
                <Date>{r.date}</Date>
              </ReviewHeader>

              <Stars>
                {[1,2,3,4,5].map((n) => (
                  <Star key={n} $active={n <= r.rating} />
                ))}
              </Stars>
            </ReviewTop>

            <ReviewText>{r.text}</ReviewText>

          </ReviewCard>
        ))}
      </ReviewsRow>
    </ReviewsScroll>

    <Controls>
      <ArrowBtn>{"<"}</ArrowBtn>

      <Dots>
        <Dot $active />
        <Dot />
        <Dot />
      </Dots>

      <ArrowBtn>{">"}</ArrowBtn>
    </Controls>

  </ReviewsWrapper>

</ReviewsSection>

<ProductsSection>

  <ProductsTitle>Вам також може сподобатись</ProductsTitle>

  <ProductsGrid>
    {products.map((p, i) => (
      <ProductItem key={i}>
        <ProductImg src={p.img} />
        <ProductName>{p.name}</ProductName>
        <ProductPrice>{p.price}</ProductPrice>
      </ProductItem>
    ))}
  </ProductsGrid>

</ProductsSection>
    </Wrapper>
  );
}

