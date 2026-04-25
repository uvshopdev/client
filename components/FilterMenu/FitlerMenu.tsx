"use client";

import { ChevronDown } from "lucide-react";
import { useExtracted } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { CountryType } from "@/types/countries";
import {
	Close,
	Content,
	ContentWrapper,
	CustomSelectHeader,
	CustomSelectItem,
	CustomSelectList,
	CustomSelectWrapper,
	SidebarFormContainer,
	SidebarInputsGroup,
	SidebarLabel,
	SidebarPriceGroup,
	SidebarPriceInput,
	SidebarPriceInputWrap,
	SidebarSelectGroup,
	Title,
} from "./FilterMenu.css";

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
				<ChevronDown size={20} strokeWidth={1.5} />
			</CustomSelectHeader>
			{isOpen && (
				<CustomSelectList>
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

const FilterMenu = ({ active, setActive, countries }: { active: boolean; setActive: (active: boolean) => void; countries: CountryType[] }) => {
	const t = useExtracted("catalog");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (!ref.current || ref.current.contains(e.target as Node)) return;

			const target = e.target as Element | null;
			if (target?.closest("[data-filter-toggle='true']")) return;

			setActive(false);
		};

		document.addEventListener("click", onClickOutside);

		return () => {
			document.removeEventListener("click", onClickOutside);
		};
	}, [setActive]);

	const onChangeCountry = (country: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("country", country);

		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<Content $active={active}>
			<ContentWrapper $active={active} ref={ref}>
				<Title>
					<h2>{t("Filter products")}</h2>
					<Close onClick={() => setActive(false)}>✕</Close>
				</Title>

				<SidebarFormContainer>
					<SidebarInputsGroup>
						<SidebarSelectGroup>
							<SidebarLabel>{t("Availability")}</SidebarLabel>
							<CustomDropdown
								value={""}
								onChange={() => {}}
								options={[
									{ value: "in_stock", label: t("In stock") },
									{ value: "out_of_stock", label: t("Out of stock") },
								]}
								placeholder=""
							/>
						</SidebarSelectGroup>

						<SidebarSelectGroup>
							<SidebarLabel>{t("Country")}</SidebarLabel>
							<CustomDropdown
								value={searchParams.get("country") || ""}
								onChange={onChangeCountry}
								options={countries.map((c) => ({ value: `${c.id}`, label: c.name }))}
								placeholder=""
							/>
						</SidebarSelectGroup>

						<SidebarSelectGroup>
							<SidebarLabel>{t("Price range")}</SidebarLabel>
							<SidebarPriceGroup>
								<SidebarPriceInputWrap>
									<SidebarLabel>{t("From")}</SidebarLabel>
									<SidebarPriceInput type="number" placeholder="0" onChange={() => {}} />
								</SidebarPriceInputWrap>
								<span>—</span>
								<SidebarPriceInputWrap>
									<SidebarLabel>{t("To")}</SidebarLabel>
									<SidebarPriceInput type="number" placeholder="9999" onChange={() => {}} />
								</SidebarPriceInputWrap>
							</SidebarPriceGroup>
						</SidebarSelectGroup>
					</SidebarInputsGroup>
				</SidebarFormContainer>
			</ContentWrapper>
		</Content>
	);
};

export default FilterMenu;
