"use client";

import { ChevronDown } from "lucide-react";
import { useExtracted } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { CountryType } from "@/types/countries";
import {
    ApplyButton,
    ButtonsContainer,
    ClearButton,
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

    const [localAvailability, setLocalAvailability] = useState(searchParams.get("availability") || "");
    const [localCountry, setLocalCountry] = useState(searchParams.get("country") || "");
    const [localMinPrice, setLocalMinPrice] = useState(searchParams.get("min_price") || "");
    const [localMaxPrice, setLocalMaxPrice] = useState(searchParams.get("max_price") || "");

    useEffect(() => {
        if (active) {
            setLocalAvailability(searchParams.get("availability") || "");
            setLocalCountry(searchParams.get("country") || "");
            setLocalMinPrice(searchParams.get("min_price") || "");
            setLocalMaxPrice(searchParams.get("max_price") || "");
        }
    }, [active, searchParams]);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (!document.contains(e.target as Node)) return;
            if (!ref.current || ref.current.contains(e.target as Node)) return;

            const target = e.target as Element | null;
            if (target?.closest("[data-filter-toggle='true']")) return;
            setActive(false);
        };
        document.addEventListener("mousedown", onClickOutside);

        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, [setActive]);

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (localAvailability) params.set("availability", localAvailability);
        else params.delete("availability");

        if (localCountry) params.set("country", localCountry);
        else params.delete("country");

        if (localMinPrice) params.set("min_price", localMinPrice);
        else params.delete("min_price");

        if (localMaxPrice) params.set("max_price", localMaxPrice);
        else params.delete("max_price");

        router.push(`${pathname}?${params.toString()}`);
        setActive(false); 
    };

    const onClearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        
        params.delete("availability");
        params.delete("country");
        params.delete("min_price"); 
        params.delete("max_price"); 
        
        setLocalAvailability("");
        setLocalCountry("");
        setLocalMinPrice("");
        setLocalMaxPrice("");

        router.push(`${pathname}?${params.toString()}`);
        setActive(false);
    };

    const hasActiveFilters = searchParams.has("country") || searchParams.has("min_price") || searchParams.has("max_price") || searchParams.has("availability");

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
                                value={localAvailability}
                                onChange={(val) => setLocalAvailability(val)}
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
                                value={localCountry}
                                onChange={(val) => setLocalCountry(val)}
                                options={countries.map((c) => ({ value: `${c.id}`, label: c.name }))}
                                placeholder=""
                            />
                        </SidebarSelectGroup>

                        <SidebarSelectGroup>
                            <SidebarLabel>{t("Price range")}</SidebarLabel>
                            <SidebarPriceGroup>
                                <SidebarPriceInputWrap>
                                    <SidebarLabel>{t("From")}</SidebarLabel>
                                    <SidebarPriceInput 
                                        type="number" 
                                        placeholder="0" 
                                        value={localMinPrice}
                                        onChange={(e) => setLocalMinPrice(e.target.value)} 
                                    />
                                </SidebarPriceInputWrap>
                                <span>—</span>
                                <SidebarPriceInputWrap>
                                    <SidebarLabel>{t("To")}</SidebarLabel>
                                    <SidebarPriceInput 
                                        type="number" 
                                        placeholder="9999" 
                                        value={localMaxPrice}
                                        onChange={(e) => setLocalMaxPrice(e.target.value)} 
                                    />
                                </SidebarPriceInputWrap>
                            </SidebarPriceGroup>
                        </SidebarSelectGroup>
                    </SidebarInputsGroup>
                    
                    <ButtonsContainer>
                        {hasActiveFilters && (
                            <ClearButton type="button" onClick={onClearFilters}>
                                {t("Clear filters")}
                            </ClearButton>
                        )}
                        <ApplyButton type="button" onClick={applyFilters}>
                            {t("Apply")}
                        </ApplyButton>
                    </ButtonsContainer>
                </SidebarFormContainer>
            </ContentWrapper>
        </Content>
    );
};

export default FilterMenu;