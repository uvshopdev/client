"use client";
import React from "react";
import * as S from "./ProductsList.css";

interface Product {
  name: string;
  price: string;
  img: string;
}

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <S.ProductsSection>
      <S.ProductsTitle>Вам також може сподобатись</S.ProductsTitle>
      <S.ProductsGrid>
        {products.map((p, i) => (
          <S.ProductItem key={i}>
            <S.ProductImg src={p.img} />
            <S.ProductName>{p.name}</S.ProductName>
            <S.ProductPrice>{p.price}</S.ProductPrice>
          </S.ProductItem>
        ))}
      </S.ProductsGrid>
    </S.ProductsSection>
  );
};

export default ProductsList;