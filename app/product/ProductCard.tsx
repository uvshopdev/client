"use client";
import React, { useState } from "react";
import * as S from "./ProductCard.css";
import { ArrowLeft, ArrowRight, Heart, Star, ChevronDown, ChevronUp, House } from "lucide-react";

interface ProductCardProps {
  images: string[];
}

export default function ProductCard({ images }: ProductCardProps) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const rating = 4;

  const next = () => setActive((prev) => (prev + 1) % images.length);
  const prev = () => setActive((prev) => (prev - 1 + images.length) % images.length);

  const toggle = (key: string) =>
    setOpenKeys(openKeys.includes(key) ? openKeys.filter((k) => k !== key) : [...openKeys, key]);

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
              <Heart fill={wish ? "#E93A36" : "none"} />
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
                <S.ThumbImage src={img} />
              </S.Thumb>
            ))}
          </S.Thumbs>
        </S.Left>

        {/* RIGHT */}
        <S.Right>
          {/* Info */}
          <S.Block>
            <S.Breadcrumbs>
              <House size={14} />
              <span>/ Бакалія / Їжа швидкого приготування</span>
            </S.Breadcrumbs>

            <S.Title>Гостра локшина Samyang Hot Chicken Ramen Stew</S.Title>
          </S.Block>

          <S.Block>
            <S.RowBetween>
              <S.CodeStock>
                <span>код: 742344612</span>
                <S.Stock>
                  <S.DotStatus />
                  є в наявності
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
                { key: "desc", title: "Опис", content: "Локшина Hot Chicken Ramen Stew - ще один варіант гострої, по-справжньому вогняної страви від корейського бренду Samyang!..." },
                { key: "comp", title: "Склад", content: "Макаронні вироби (67,4%): борошно пшеничне (41%), пальмова олія (9%), крохмаль тапіоки..." }
              ].map(({ key, title, content }) => (
                <S.AccordionItem key={key}>
                  <S.AccordionHeader onClick={() => toggle(key)}>
                    {title}:
                    {openKeys.includes(key) ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
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