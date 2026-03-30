"use client";
import React from "react";
import * as S from "./ProductCard.css";

interface ProductCardProps {
  images: string[];
  active: number;
  setActive: (i: number) => void;
  qty: number;
  setQty: (q: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ images, active, setActive, qty, setQty }) => {
  return (
    <S.ProductCard>

      {/* LEFT */}
      <S.Left>
        <S.MainImage>
          <S.Image src={images[active]} />
          <S.Arrow $left onClick={() => setActive((active - 1 + images.length) % images.length)}>{"<"}</S.Arrow>
          <S.Arrow onClick={() => setActive((active + 1) % images.length)}>{">"}</S.Arrow>
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
        <S.Title>Гостра локшина Samyang Hot Chicken Ramen Stew</S.Title>
        <S.Price>190 грн</S.Price>

        <S.BuyRow>
          <S.Quantity>
            <S.QtyBtn onClick={() => setQty(Math.max(1, qty - 1))}>-</S.QtyBtn>
            {qty}
            <S.QtyBtn onClick={() => setQty(qty + 1)}>+</S.QtyBtn>
          </S.Quantity>
          <S.BuyButton>Купити</S.BuyButton>
        </S.BuyRow>

        <S.Characteristics>
          <S.CharItem><b>вага:</b> 120 г</S.CharItem>
          <S.CharItem><b>виробник:</b> Samyang</S.CharItem>
          <S.CharItem><b>калорійність:</b> 369 ккал</S.CharItem>
          <S.CharItem><b>країна:</b> Корея</S.CharItem>
        </S.Characteristics>
      </S.Right>

    </S.ProductCard>
  );
};

export default ProductCard;