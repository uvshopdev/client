"use client";
import React from "react";
import ProductCard from "./ProductCard";
import Reviews from "./Reviews";
import ProductsList from "./ProductsList";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1520px;
  margin: 0 auto;
  padding-top: 130px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media (max-width: 990px) {
    padding: 100px 20px 40px;
    gap: 40px;
  }
`;

// тестовые данные
const images = ["/test.png", "/test.png", "/test.png"];

const reviewsData = [
  {
    name: "Іван Іваненко",
    date: "06.11.2025",
    rating: 5,
    text: "Дуже смачно, але дуже гостро 🔥",
  },
  {
    name: "Іван Іванчук",
    date: "12.12.2025",
    rating: 3,
    text: "Не погано, але не моє",
  },
  {
    name: "Ім’я Прізвище",
    date: "07.12.2025",
    rating: 5,
    text: "Смачно, рекомендую",
  },
  {
    name: "Олег",
    date: "01.01.2026",
    rating: 4,
    text: "Добре, але можна краще",
  },
];

const productsData = [
  { name: "Ramune Soda", price: "90 грн", img: "/test.png" },
  { name: "Pocky Chocolate", price: "120 грн", img: "/test.png" },
  { name: "Mochi", price: "150 грн", img: "/test.png" },
  { name: "KitKat Matcha", price: "110 грн", img: "/test.png" },
];

export default function ProductPage() {
  return (
    <Wrapper>
      <ProductCard images={images} />

      <Reviews reviews={reviewsData} />

      <ProductsList products={productsData} />
    </Wrapper>
  );
}