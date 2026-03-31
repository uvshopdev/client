"use client";
import React, { useState } from "react";
import * as S from "./ProductCard.css";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Star,
  ChevronDown,
  House
} from "lucide-react";

export default function ProductCard({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);

  const rating = 4;

  const next = () => setActive((prev) => (prev + 1) % images.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + images.length) % images.length);

  return (
    <S.Wrapper>
      <S.Container>
        {/* LEFT */}
        <S.Left>
          <S.MainImage>
            <S.Image src={images[active]} />

            <S.Arrow onClick={prev} $left>
              <ArrowLeft size={18} color="#fff" />
            </S.Arrow>

            <S.Arrow onClick={next}>
              <ArrowRight size={18} color="#fff" />
            </S.Arrow>

            <S.WishButton onClick={() => setWish(!wish)}>
              <Heart fill={wish ? "#3B3028" : "none"} />
            </S.WishButton>

            <S.Dots>
              {images.map((_, i) => (
                <S.Dot key={i} $active={i === active} onClick={() => setActive(i)} />
              ))}
            </S.Dots>
          </S.MainImage>

          <S.Thumbs>
            {images.map((img, i) => (
              <S.Thumb key={i} $active={i === active} onClick={() => setActive(i)}>
                <img src={img} />
              </S.Thumb>
            ))}
          </S.Thumbs>
        </S.Left>

        {/* RIGHT */}
        <S.Right>

          {/* 1.1 */}
          <S.Block>
            <S.Breadcrumbs>
              <House size={14} />
              <span>/ Бакалія / Їжа швидкого приготування</span>
            </S.Breadcrumbs>

            <S.Title>
              Гостра локшина Samyang Hot Chicken Ramen Stew
            </S.Title>
          </S.Block>

          {/* 1.2 */}
          <S.Block>
            <S.RowBetween>
              <S.CodeStock>
                <span>код: 109873562</span>

                <S.Stock>
                  <S.DotStatus />
                  є в наявності
                </S.Stock>
              </S.CodeStock>
            </S.RowBetween>

            <S.RatingRow>
              <S.Stars>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i <= rating ? "#3B3028" : "none"}
                    color="#3B3028"
                  />
                ))}
              </S.Stars>

              <span>{rating}/5</span>
            </S.RatingRow>
          </S.Block>

          {/* 1.3 */}
          <S.Block>
            <S.PriceRow>
              <S.PriceBlock>
                <S.Price>190 грн</S.Price>
                <S.SubPrice>за 1 шт • 120 г</S.SubPrice>
              </S.PriceBlock>

              <S.BuyControls>
                <S.Quantity>
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </S.Quantity>

                <S.BuyButton>Купити</S.BuyButton>
              </S.BuyControls>
            </S.PriceRow>
          </S.Block>

        </S.Right>
      </S.Container>
    </S.Wrapper>
  );
}