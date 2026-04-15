"use client";

import { ArrowDownWideNarrow, Settings2, X, ChevronDown, ChevronUp } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useExtracted } from "next-intl"; // ДОДАНО ХУК ПЕРЕКЛАДУ

import { useCategories } from "@/store";

import {
	CatalogActions,
	CatalogHeader,
	CatalogTitle,
	Content,
	FilterButton,
	Products,
	SidebarOverlay,
	SidebarContainer,
	SidebarHeader,
	SidebarClose,
	SidebarContent,
	FilterSection,
	DropdownHeader,
	DropdownList,
	DropdownItem,
	PriceRange,
	SortGrid,
	SortOption,
	ApplyButton
} from "./page.css"; // Переконайся, що шлях до твого css правильний

const Page = ({ params }: { params: Promise<{ category_id: number }> }) => {
	const t = useExtracted("category"); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ

	const { category_id } = use(params);
	const { categoriesSet } = useCategories();

	const [mounted, setMounted] = useState(false);
	
	const [activeSidebar, setActiveSidebar] = useState<"filter" | "sort" | null>(null);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	
	const [filters, setFilters] = useState({
		availability: t("In stock"),
		producer: t("Select producer"),
		country: t("Select country")
	});

	const [priceMin, setPriceMin] = useState("");
	const [priceMax, setPriceMax] = useState("");

	const [activeSort, setActiveSort] = useState("newest");

	useEffect(() => {
		setMounted(true);
	}, []);

	const closeSidebar = () => {
		setActiveSidebar(null);
		setOpenDropdown(null);
	};

	const toggleDropdown = (name: string) => {
		setOpenDropdown(prev => prev === name ? null : name);
	};

	const handleSelect = (name: string, value: string | null, placeholder: string) => {
		if (value === null) {
			setFilters(prev => ({ ...prev, [name]: placeholder }));
		} else {
			setFilters(prev => ({ ...prev, [name]: value }));
		}
		setOpenDropdown(null);
	};

	// Відсортовані та перекладені опції
	const sortOptions = [
		{ id: "newest", label: t("Newest first") },
		{ id: "oldest", label: t("Oldest first") },
		{ id: "cheapest", label: t("Cheapest first") },
		{ id: "expensive", label: t("Most expensive first") },
		{ id: "az", label: t("A to Z") },
		{ id: "za", label: t("Z to A") },
	];

	return (
		<Content>
			<CatalogHeader>
				<CatalogTitle>
					{mounted && (categoriesSet[category_id]?.name || t("Category not found"))}
				</CatalogTitle>

				<CatalogActions>
					<FilterButton type="button" onClick={() => setActiveSidebar("filter")}>
						<Settings2 size={16} strokeWidth={2} />
						{t("Filter")}
					</FilterButton>
					<FilterButton type="button" onClick={() => setActiveSidebar("sort")}>
						<ArrowDownWideNarrow size={16} strokeWidth={2} />
						{t("Sort")}
					</FilterButton>
				</CatalogActions>
			</CatalogHeader>

			<Products>
				{/* ТОВАРИ ПОКИ ЩО ПУСТІ */}
			</Products>

			{/* БІЧНІ ПАНЕЛІ */}
			{activeSidebar && (
				<SidebarOverlay onClick={closeSidebar}>
					<SidebarContainer onClick={(e) => e.stopPropagation()}>
						<SidebarHeader>
							<h2>{activeSidebar === "filter" ? t("Filter products") : t("Sort products")}</h2>
							<SidebarClose onClick={closeSidebar} type="button">
								<X size={24} />
							</SidebarClose>
						</SidebarHeader>

						<SidebarContent>
							{activeSidebar === "filter" ? (
								<>
									{/* НАЯВНІСТЬ */}
									<FilterSection>
										<p>{t("Availability")}</p>
										<div>
											<DropdownHeader onClick={() => toggleDropdown("availability")}>
												<span>{filters.availability === t("Select availability") ? "" : filters.availability}</span>
												{openDropdown === "availability" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
											</DropdownHeader>
											{openDropdown === "availability" && (
												<DropdownList>
													<DropdownItem $cancel onClick={() => handleSelect("availability", null, t("Select availability"))}>
														{t("Cancel selection")}
													</DropdownItem>
													<DropdownItem onClick={() => handleSelect("availability", t("In stock"), "")}>
														{t("In stock")}
													</DropdownItem>
													<DropdownItem onClick={() => handleSelect("availability", t("Out of stock"), "")}>
														{t("Out of stock")}
													</DropdownItem>
												</DropdownList>
											)}
										</div>
									</FilterSection>

									{/* ВИРОБНИК */}
									<FilterSection>
										<p>{t("Producer")}</p>
										<div>
											<DropdownHeader onClick={() => toggleDropdown("producer")}>
												<span>{filters.producer === t("Select producer") ? "" : filters.producer}</span>
												{openDropdown === "producer" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
											</DropdownHeader>
											{openDropdown === "producer" && (
												<DropdownList>
													<DropdownItem $cancel onClick={() => handleSelect("producer", null, t("Select producer"))}>
														{t("Cancel selection")}
													</DropdownItem>
													<DropdownItem onClick={() => handleSelect("producer", t("Producer 1"), "")}>
														{t("Producer 1")}
													</DropdownItem>
													<DropdownItem onClick={() => handleSelect("producer", t("Producer 2"), "")}>
														{t("Producer 2")}
													</DropdownItem>
												</DropdownList>
											)}
										</div>
									</FilterSection>

									{/* КРАЇНА */}
									<FilterSection>
										<p>{t("Country of origin")}</p>
										<div>
											<DropdownHeader onClick={() => toggleDropdown("country")}>
												<span>{filters.country === t("Select country") ? "" : filters.country}</span>
												{openDropdown === "country" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
											</DropdownHeader>
											{openDropdown === "country" && (
												<DropdownList>
													<DropdownItem $cancel onClick={() => handleSelect("country", null, t("Select country"))}>
														{t("Cancel selection")}
													</DropdownItem>
													<DropdownItem onClick={() => handleSelect("country", t("Ukraine"), "")}>{t("Ukraine")}</DropdownItem>
													<DropdownItem onClick={() => handleSelect("country", t("Italy"), "")}>{t("Italy")}</DropdownItem>
													<DropdownItem onClick={() => handleSelect("country", t("South Korea"), "")}>{t("South Korea")}</DropdownItem>
													<DropdownItem onClick={() => handleSelect("country", t("France"), "")}>{t("France")}</DropdownItem>
													<DropdownItem onClick={() => handleSelect("country", t("Japan"), "")}>{t("Japan")}</DropdownItem>
													<DropdownItem onClick={() => handleSelect("country", t("China"), "")}>{t("China")}</DropdownItem>
												</DropdownList>
											)}
										</div>
									</FilterSection>

									{/* ЦІНА */}
									<FilterSection>
										<p>{t("Price range")}</p>
										<PriceRange>
											<label>{t("from")}</label>
											<input 
												type="number" 
												placeholder="0" 
												value={priceMin}
												onChange={(e) => setPriceMin(e.target.value)}
											/>
											<label>{t("to")}</label>
											<input 
												type="number" 
												placeholder="10000" 
												value={priceMax}
												onChange={(e) => setPriceMax(e.target.value)}
											/>
										</PriceRange>
									</FilterSection>
								</>
							) : (
								<SortGrid>
									{sortOptions.map((opt) => (
										<SortOption 
											key={opt.id} 
											$active={activeSort === opt.id}
											onClick={() => setActiveSort(opt.id)}
										>
											<div className="radio-circle" />
											<span style={{ whiteSpace: "pre-line" }}>{opt.label}</span>
										</SortOption>
									))}
								</SortGrid>
							)}
						</SidebarContent>

						<ApplyButton onClick={closeSidebar}>
							{t("Apply")}
						</ApplyButton>
					</SidebarContainer>
				</SidebarOverlay>
			)}
		</Content>
	);
};

export default Page;