"use client";
import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard"; // <-- Вкажи свій шлях до компонента
import * as S from "./ProductsList.css";

// Залишаємо інтерфейс, щоб TypeScript у page.tsx не сварився, 
// але всередині використовуємо лише чисті заглушки без інфи
interface ProductsListProps {
	products?: any[]; 
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
	return (
		<S.ProductsSection>
			<S.ProductsTitle>Вам також може сподобатись</S.ProductsTitle>
			<S.ProductsGrid>
			</S.ProductsGrid>
		</S.ProductsSection>
	);
};

export default ProductsList;