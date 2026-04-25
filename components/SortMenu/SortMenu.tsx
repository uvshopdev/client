"use client";

import { useExtracted } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ApplyButton, ButtonsContainer, ClearButton, Close, Content, ContentWrapper, Item, Items, Title } from "./SortMenu.css";

const SortMenu = ({ active, setActive }: { active: boolean; setActive: (active: boolean) => void }) => {
    const t = useExtracted("catalog");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [localSort, setLocalSort] = useState(searchParams.get("sort") || "");

    useEffect(() => {
        if (active) {
            setLocalSort(searchParams.get("sort") || "");
        }
    }, [active, searchParams]);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (!ref.current || ref.current.contains(e.target as Node)) return;
            const target = e.target as Element | null;
            if (target?.closest("[data-sort-toggle='true']")) return;
            setActive(false);
        };
        document.addEventListener("click", onClickOutside);
        return () => document.removeEventListener("click", onClickOutside);
    }, [setActive]);

    const onChange = (newSort: string) => {
        setLocalSort(newSort === localSort ? "" : newSort);
    };

    const applySort = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (localSort) {
            params.set("sort", localSort);
        } else {
            params.delete("sort");
        }
        router.push(`${pathname}?${params.toString()}`);
        setActive(false);
    };

    const onClearSort = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("sort");
        router.push(`${pathname}?${params.toString()}`);
        setActive(false);
    };

    return (
        <Content $active={active}>
            <ContentWrapper $active={active} ref={ref}>
                <Title>
                    <h2>{t("Sort products")}</h2>
                    <Close onClick={() => setActive(false)}>✕</Close>
                </Title>

                <Items>
                    <Item $active={localSort === "price:asc"} onClick={() => onChange("price:asc")}>
                        <span></span>
                        {t("Cheapest first")}
                    </Item>
                    <Item $active={localSort === "price:desc"} onClick={() => onChange("price:desc")}>
                        <span></span>
                        {t("Most expensive first")}
                    </Item>
                    <Item $active={localSort === "alphabet:asc"} onClick={() => onChange("alphabet:asc")}>
                        <span></span>
                        {t("A to Z")}
                    </Item>
                    <Item $active={localSort === "alphabet:desc"} onClick={() => onChange("alphabet:desc")}>
                        <span></span>
                        {t("Z to A")}
                    </Item>
                </Items>
                
                <ButtonsContainer>
                    {searchParams.get("sort") && (
                        <ClearButton type="button" onClick={onClearSort}>
                            {t("Clear sorting")}
                        </ClearButton>
                    )}
                    <ApplyButton type="button" onClick={applySort}>
                        {t("Apply")}
                    </ApplyButton>
                </ButtonsContainer>
            </ContentWrapper>
        </Content>
    );
};

export default SortMenu;