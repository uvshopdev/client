"use client";

import { useState } from "react";
import Link from "next/link";
import { useExtracted } from "next-intl";
import * as S from "./page.css";

export default function Home() {
	const t = useExtracted("home");

	const slides = [
		"/images/slide1.png",
		"/images/slide2.png",
		"/images/slide3.png",
	];

	const cuisines = [
		{ name: t("Ukraine"), img: "/images/ukraine.png" },
		{ name: t("Italy"), img: "/images/italy.png" },
		{ name: t("South Korea"), img: "/images/korea.png" },
		{ name: t("France"), img: "/images/france.png" },
		{ name: t("Japan"), img: "/images/japan.png" },
		{ name: t("China"), img: "/images/china.png" }
	];

	const productSections = [
		t("New arrivals"),
		t("Monthly discounts"),
		t("Top rated products"),
		t("Best sellers"),
	];

	const [current, setCurrent] = useState(0);

	const prevSlide = () => {
		setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	};

	const nextSlide = () => {
		setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	};

	return (
		<S.Main>
			{/* HERO SLIDER */}
			<S.HeroSection>
				<S.SliderWrapper>
					{slides.map((slide, index) => (
						<S.Slide
							key={index}
							style={{
								backgroundImage: `url(${slide})`,
								opacity: index === current ? 1 : 0,
							}}
						/>
					))}
				</S.SliderWrapper>

				<S.Controls>
					<S.ArrowBtn type="button" onClick={prevSlide}>
						&#10094;
					</S.ArrowBtn>

					<S.Dots>
						{slides.map((_, i) => (
							<S.Dot key={i} $active={i === current} />
						))}
					</S.Dots>

					<S.ArrowBtn type="button" onClick={nextSlide}>
						&#10095;
					</S.ArrowBtn>
				</S.Controls>
			</S.HeroSection>

			{/* POPULAR CATEGORIES */}
			<S.Section>
				<S.Header>
					<S.SectionTitle>{t("Popular categories")}</S.SectionTitle>
					<Link href="/catalog" passHref legacyBehavior>
						<S.LinkText>{t("View all")} →</S.LinkText>
					</Link>
				</S.Header>

				<S.CategoriesGrid>
					{Array.from({ length: 6 }).map((_, i) => (
						<Link key={i} href="/catalog" passHref legacyBehavior>
							<S.CategoryCard>
								<S.CategoryCircle />
								<S.CategoryName>{t("Category")}</S.CategoryName>
							</S.CategoryCard>
						</Link>
					))}
				</S.CategoriesGrid>
			</S.Section>

			{/* COUNTRIES OF THE MONTH */}
			<S.SectionTight>
				<S.Header>
					<S.SectionTitle>{t("Countries of the month")}</S.SectionTitle>
				</S.Header>

				<S.CountryBanner 
					src="/images/countryMonth.png" 
					alt={t("Countries of the month")} 
				/>
			</S.SectionTight>

			{/* WORLD CUISINE */}
			<S.SectionTight>
				<S.Header>
					<S.SectionTitle>{t("Try world cuisine")}</S.SectionTitle>
					<Link href="/catalog" passHref legacyBehavior>
						<S.LinkText>{t("View all")} →</S.LinkText>
					</Link>
				</S.Header>

				<S.CategoriesGrid>
					{cuisines.map((item, i) => (
						<Link key={i} href="/catalog" passHref legacyBehavior>
							<S.CategoryCard>
								<S.CategoryCircle style={{ backgroundImage: `url(${item.img})` }} />
								<S.CategoryName>{item.name}</S.CategoryName>
							</S.CategoryCard>
						</Link>
					))}
				</S.CategoriesGrid>
			</S.SectionTight>

			{/* PRODUCT SECTIONS */}
			{productSections.map((title, sectionIndex) => (
				<S.Section key={sectionIndex}>
					<S.Header>
						<S.SectionTitle>{title}</S.SectionTitle>
						<Link href="/catalog" passHref legacyBehavior>
							<S.LinkText>{t("View all")} →</S.LinkText>
						</Link>
					</S.Header>

					{/* Пустая сетка товаров, как ты и просил */}
					<S.ProductsGrid></S.ProductsGrid>
				</S.Section>
			))}
		</S.Main>
	);
}