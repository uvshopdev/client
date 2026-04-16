"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowDownWideNarrow, ChevronDown, Settings2 } from "lucide-react";
import { use, useEffect, useMemo, useRef, useState } from "react";

import ProductCard from "@/components/ProductCard/ProductCard";
import { getFavorites } from "@/lib/favorites";
import { getProducts } from "@/lib/products";
import { useCategories, useCountries } from "@/store";
import {
	CatalogActions,
	CatalogHeader,
	CatalogTitle,
	Content,
	CustomSelectHeader,
	CustomSelectItem,
	CustomSelectList,
	CustomSelectWrapper,
	FilterButton,
	Products,
	SidebarCloseBtn,
	SidebarContainer,
	SidebarFormContainer,
	SidebarInputsGroup,
	SidebarLabel,
	SidebarOverlay,
	SidebarPriceGroup,
	SidebarPriceInput,
	SidebarPriceInputWrap,
	SidebarRadioGroupRow,
	SidebarRadioLabel,
	SidebarSelectGroup,
	SidebarSubmitButton,
	SidebarTitle,
	SidebarTitleBar,
	VisuallyHiddenInput,
} from "./page.css";

const CustomDropdown = ({
	value,
	onChange,
	options,
	placeholder,
}: {
	value: string;
	onChange: (v: string) => void;
	options: { value: string; label: string }[];
	placeholder: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const selected = options.find((opt) => opt.value === value);

	return (
		<CustomSelectWrapper ref={ref}>
			<CustomSelectHeader $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
				<span>{selected ? selected.label : placeholder}</span>
				<ChevronDown size={20} strokeWidth={1.5} color="#3B3028" />
			</CustomSelectHeader>
			{isOpen && (
				<CustomSelectList>
					<CustomSelectItem
						$isCancel
						onClick={() => {
							onChange("");
							setIsOpen(false);
						}}
					>
						Скасувати вибір
					</CustomSelectItem>
					{options.map((opt) => (
						<CustomSelectItem
							key={opt.value}
							onClick={() => {
								onChange(opt.value);
								setIsOpen(false);
							}}
						>
							{opt.label}
						</CustomSelectItem>
					))}
				</CustomSelectList>
			)}
		</CustomSelectWrapper>
	);
};

const page = ({ params }: { params: Promise<{ category_id: number }> }) => {
	const { category_id } = use(params);
	const { categoriesSet } = useCategories();
	const countries = useCountries((state) => state.countries);

	const [mounted, setMounted] = useState(false);

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [sortMethod, setSortMethod] = useState("price_asc");

	const [filterAvailability, setFilterAvailability] = useState("");
	const [filterCountry, setFilterCountry] = useState("");

	const availabilityOptions = [
		{ value: "in_stock", label: "Є в наявності" },
		{ value: "out_of_stock", label: "Немає в наявності" },
	];

	const countryOptions = useMemo(() => countries.map((country) => ({ value: String(country.id), label: country.name })), [countries]);

	useEffect(() => {
		if (isFilterOpen || isSortOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isFilterOpen, isSortOpen]);

	useEffect(() => {
		setMounted(true);
	}, []);

	const { data: favorites, isSuccess: isSuccessFavorites } = useQuery({
		queryKey: ["favorites_ids"],
		queryFn: async () => {
			const data = await getFavorites();
			return data.map(({ product }) => product.id);
		},
		placeholderData: [],
		staleTime: 3 * 60 * 1000,
	});

	const { data: products, isSuccess: isSuccessProducts } = useQuery({
		queryKey: ["products", category_id],
		queryFn: async () => await getProducts(0, category_id),
	});

	const sortedProducts = useMemo(() => {
		if (!products) return [];

		const collator = new Intl.Collator("uk-UA", { sensitivity: "base" });

		return [...products].sort((left, right) => {
			switch (sortMethod) {
				case "price_desc":
					return right.price - left.price;
				case "alpha_asc":
					return collator.compare(left.name, right.name);
				case "alpha_desc":
					return collator.compare(right.name, left.name);
				case "price_asc":
				default:
					return left.price - right.price;
			}
		});
	}, [products, sortMethod]);

	return (
		<>
			<Content>
				{mounted && (
					<CatalogHeader>
						<CatalogTitle>{categoriesSet[category_id]?.name || "Категорія не знайдена"}</CatalogTitle>

						<CatalogActions>
							<FilterButton type="button" onClick={() => setIsFilterOpen(true)}>
								<Settings2 size={16} strokeWidth={2} />
								Фільтр
							</FilterButton>
							<FilterButton type="button" onClick={() => setIsSortOpen(true)}>
								<ArrowDownWideNarrow size={16} strokeWidth={2} />
								Сортування
							</FilterButton>
						</CatalogActions>
					</CatalogHeader>
				)}

				<Products>
					{isSuccessProducts &&
						isSuccessFavorites &&
						sortedProducts.map((product) => (
							<ProductCard key={product.id} {...product} favorite={favorites.includes(product.id)} categoryId={category_id} />
						))}
				</Products>
			</Content>

			{/* --- МОДАЛКА ФІЛЬТРУ --- */}
			<SidebarOverlay $isOpen={isFilterOpen} onClick={() => setIsFilterOpen(false)}>
				<SidebarContainer $isOpen={isFilterOpen} onClick={(e) => e.stopPropagation()}>
					<SidebarTitleBar>
						<SidebarTitle>Відфільтрувати товари</SidebarTitle>
						<SidebarCloseBtn onClick={() => setIsFilterOpen(false)}>✕</SidebarCloseBtn>
					</SidebarTitleBar>

					<SidebarFormContainer>
						<SidebarInputsGroup>
							<SidebarSelectGroup>
								<SidebarLabel>Наявність</SidebarLabel>
								<CustomDropdown
									value={filterAvailability}
									onChange={setFilterAvailability}
									options={availabilityOptions}
									placeholder=""
								/>
							</SidebarSelectGroup>

							<SidebarSelectGroup>
								<SidebarLabel>Країна виробник</SidebarLabel>
								<CustomDropdown value={filterCountry} onChange={setFilterCountry} options={countryOptions} placeholder="" />
							</SidebarSelectGroup>

							<SidebarSelectGroup>
								<SidebarLabel>Діапазон цін</SidebarLabel>
								<SidebarPriceGroup>
									<SidebarPriceInputWrap>
										<SidebarLabel>Від</SidebarLabel>
										<SidebarPriceInput
											type="number"
											placeholder="0"
											min="0"
											max="9999"
											onInput={(e) => {
												const val = parseInt(e.currentTarget.value);
												if (val < 0) e.currentTarget.value = "0";
												if (val > 9999) e.currentTarget.value = "9999";
											}}
											onKeyDown={(e) => {
												// Забороняємо введення мінуса
												if (e.key === "-") e.preventDefault();
											}}
										/>
									</SidebarPriceInputWrap>
									<span>—</span>
									<SidebarPriceInputWrap>
										<SidebarLabel>До</SidebarLabel>
										<SidebarPriceInput
											type="number"
											placeholder="9999"
											min="0"
											max="9999"
											onInput={(e) => {
												const val = parseInt(e.currentTarget.value);
												if (val < 0) e.currentTarget.value = "0";
												if (val > 9999) e.currentTarget.value = "9999";
											}}
											onKeyDown={(e) => {
												if (e.key === "-") e.preventDefault();
											}}
										/>
									</SidebarPriceInputWrap>
								</SidebarPriceGroup>
							</SidebarSelectGroup>
						</SidebarInputsGroup>

						<SidebarSubmitButton onClick={() => setIsFilterOpen(false)}>Застосувати</SidebarSubmitButton>
					</SidebarFormContainer>
				</SidebarContainer>
			</SidebarOverlay>

			{/* --- МОДАЛКА СОРТУВАННЯ --- */}
			<SidebarOverlay $isOpen={isSortOpen} onClick={() => setIsSortOpen(false)}>
				<SidebarContainer $isOpen={isSortOpen} onClick={(e) => e.stopPropagation()}>
					<SidebarTitleBar>
						<SidebarTitle>Відсортувати товари</SidebarTitle>
						<SidebarCloseBtn onClick={() => setIsSortOpen(false)}>✕</SidebarCloseBtn>
					</SidebarTitleBar>

					<SidebarFormContainer>
						<SidebarInputsGroup>
							<SidebarRadioGroupRow>
								<SidebarRadioLabel $isActive={sortMethod === "price_asc"}>
									<VisuallyHiddenInput
										type="radio"
										name="sort"
										value="price_asc"
										checked={sortMethod === "price_asc"}
										onChange={(e) => setSortMethod(e.target.value)}
									/>
									<span>Спочатку найдешевші</span>
								</SidebarRadioLabel>
								<SidebarRadioLabel $isActive={sortMethod === "price_desc"}>
									<VisuallyHiddenInput
										type="radio"
										name="sort"
										value="price_desc"
										checked={sortMethod === "price_desc"}
										onChange={(e) => setSortMethod(e.target.value)}
									/>
									<span>Спочатку найдорожчі</span>
								</SidebarRadioLabel>
							</SidebarRadioGroupRow>

							<SidebarRadioGroupRow>
								<SidebarRadioLabel $isActive={sortMethod === "alpha_asc"}>
									<VisuallyHiddenInput
										type="radio"
										name="sort"
										value="alpha_asc"
										checked={sortMethod === "alpha_asc"}
										onChange={(e) => setSortMethod(e.target.value)}
									/>
									<span>Від А до Я</span>
								</SidebarRadioLabel>
								<SidebarRadioLabel $isActive={sortMethod === "alpha_desc"}>
									<VisuallyHiddenInput
										type="radio"
										name="sort"
										value="alpha_desc"
										checked={sortMethod === "alpha_desc"}
										onChange={(e) => setSortMethod(e.target.value)}
									/>
									<span>Від Я до А</span>
								</SidebarRadioLabel>
							</SidebarRadioGroupRow>
						</SidebarInputsGroup>

						<SidebarSubmitButton onClick={() => setIsSortOpen(false)}>Застосувати</SidebarSubmitButton>
					</SidebarFormContainer>
				</SidebarContainer>
			</SidebarOverlay>
		</>
	);
};

export default page;
