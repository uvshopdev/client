"use client";
import React, { useState } from "react";
import * as S from "./ProductCard.css";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  House
} from "lucide-react";

export default function ProductCard({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]); // массив открытых аккордеонов

  const rating = 4;

  const next = () => setActive((prev) => (prev + 1) % images.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + images.length) % images.length);

  const toggle = (key: string) => {
    if (openKeys.includes(key)) {
      setOpenKeys(openKeys.filter(k => k !== key)); // закрываем
    } else {
      setOpenKeys([...openKeys, key]); // открываем
    }
  };

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
                <S.ThumbImage src={img} />
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
                <span>код: 7777777</span>

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

          {/* ===== 2. InfoBlock (Характеристики + Аккордеон) ===== */}
          <S.InfoBlock>

            {/* 2.1 Характеристики */}
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

            {/* 2.2 Аккордеон */}
            <S.Accordion>

              {/* Описание */}
              <S.AccordionItem>
                <S.AccordionHeader onClick={() => toggle("desc")}>
                  Опис:
                  {openKeys.includes("desc") ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </S.AccordionHeader>

                {openKeys.includes("desc") && (
                  <S.AccordionContent>
                    Локшина Hot Chicken Ramen Stew - ще один варіант гострої, по-справжньому вогняної страви від корейського бренду Samyang! Цей суп Рамен схожий на густе рагу зі смаком тушкованої курочки та букетом пекучих спецій. Бульйон ароматний і насичений. Всередині склянки: класична локшина швидкого приготування, набір приправ. Для тих, хто любить по-справжньому гостру їжу.
                  </S.AccordionContent>
                )}
              </S.AccordionItem>

              {/* Склад */}
              <S.AccordionItem>
                <S.AccordionHeader onClick={() => toggle("comp")}>
                  Склад:
                  {openKeys.includes("comp") ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </S.AccordionHeader>

                {openKeys.includes("comp") && (
                  <S.AccordionContent>
                    Макаронні вироби (67,4%): борошно пшеничне (41%), пальмова олія (9%), крохмаль тапіоки (8%), крохмаль картопляний, сіль, соєва олія, загусник (гуарова камедь), регулятори кислотності (E501, E500, E339, Е330), емульгатори (Е322, Е452), барвник (Е101). Суп 25,5%: вода, червоний перець порошок, цукор, підсилювач смаку (E621), соєвий соус, сіль, крохмаль тапіоки, підсилювач смаку (E635), часник, соєва олія, цибуля, екстракт паприки, порошок цибулі, порошок екстракту дріжджів, чорний перцевий порошок. Спеції (7,1%): цукор, курячий ароматизатор, картопляний крохмаль, часниковий порошок, сіль, смажений кунжут, цибуля сушена, водорості сушені, перець червоний сушений, загусники (ксантанова камедь), олія соєва.

                  </S.AccordionContent>
                )}
              </S.AccordionItem>

            </S.Accordion>

          </S.InfoBlock>

        </S.Right>
      </S.Container>
    </S.Wrapper>
  );
}