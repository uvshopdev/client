"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Heart, Star } from "lucide-react";
import { useExtracted } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

import { addFavorite, removeFavorite } from "@/lib/favorites";
import { useBasket } from "@/store/basket";
import type { ProductType } from "@/types/products";
import * as S from "./ProductCard.css";

interface ProductCardProps {
    image: string;
    product: ProductType & { rating?: number };
    favorite: boolean;
}

export default function ProductCard({ image, product, favorite }: ProductCardProps) {
    const t = useExtracted("product-page"); // НОВИЙ ТЕГ
    const [qty, setQty] = useState(1);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const query = useQueryClient();
    const { addPosition } = useBasket();

    const { mutate: addToFavorite } = useMutation({
        mutationKey: ["favorites"],
        mutationFn: async () => await addFavorite(product.id),
        onSuccess: async () => {
            await query.invalidateQueries({ queryKey: ["favorites"] });
            await query.invalidateQueries({ queryKey: ["favorites_ids"] });
            toast.success(t("Item added to favorites"));
        },
        onError: () => toast.error(t("Failed to add item to favorites")),
    });

    const { mutate: removeFromFavorite } = useMutation({
        mutationKey: ["favorites"],
        mutationFn: async () => await removeFavorite(product.id),
        onSuccess: async () => {
            await query.invalidateQueries({ queryKey: ["favorites"] });
            await query.invalidateQueries({ queryKey: ["favorites_ids"] });
            toast.success(t("Item removed from favorites"));
        },
        onError: () => toast.error(t("Failed to remove item from favorites")),
    });

    const rating = product.rating ?? 5;

    const toggle = (key: string) => setOpenKeys(openKeys.includes(key) ? openKeys.filter((k) => k !== key) : [...openKeys, key]);

    const handleAddToCart = () => {
        addPosition(product, qty);
        toast.success(t("Item added to cart"));
    };

    return (
        <S.Wrapper>
            <S.Container>
                <S.Left>
                    <S.MainImage>
                        <S.Image src={image} />

                        <S.WishButton 
                            onClick={() => (favorite ? removeFromFavorite() : addToFavorite())}
                            aria-label={favorite ? t("Remove from favorites") : t("Add to favorites")}
                        >
                            <Heart fill={favorite ? "#E93A36" : "none"} color={favorite ? "#E93A36" : "#BDBDBD"} strokeWidth={1.5} />
                        </S.WishButton>
                    </S.MainImage>
                </S.Left>

                <S.Right>
                    <S.Block>
                        <S.Title>{product.name}</S.Title>
                    </S.Block>

                    <S.Block>
                        <S.RowBetween>
                            <S.CodeStock>
                                <span>
                                    <S.BoldText>{t("code:")}</S.BoldText> {product.article}
                                </span>
                                <S.Stock>
                                    <S.DotStatus />{t("in stock")}
                                </S.Stock>
                            </S.CodeStock>
                        </S.RowBetween>

                        <S.RatingRow>
                            <S.Stars>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i <= rating ? "#ffdb0d" : "none"}
                                        color={i <= rating ? "#ffdb0d" : "#D3D3D3"}
                                        strokeWidth={1.5}
                                    />
                                ))}
                            </S.Stars>
                            <span>{rating}/5</span>
                        </S.RatingRow>
                    </S.Block>

                    <S.Block>
                        <S.PriceRow>
                            <S.PriceBlock>
                                <S.Price>{product.price} {t("UAH")}</S.Price>
                            </S.PriceBlock>

                            <S.BuyControls>
                                <S.Quantity>
                                    <button 
                                        type="button" 
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        aria-label={t("Decrease quantity")}
                                    >
                                        -
                                    </button>
                                    <span>{qty}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => setQty(qty + 1)}
                                        aria-label={t("Increase quantity")}
                                    >
                                        +
                                    </button>
                                </S.Quantity>
                                <S.BuyButton type="button" onClick={handleAddToCart}>
                                    {t("Buy")}
                                </S.BuyButton>
                            </S.BuyControls>
                        </S.PriceRow>
                    </S.Block>

                    <S.InfoBlock>
                        <S.Characteristics>
                            <S.CharacteristicsTitle>{t("Characteristics:")}</S.CharacteristicsTitle>
                            <S.CharacteristicsGrid>
                                {product.category && (
                                    <S.CharItem>
                                        <S.CharLabel>{t("category:")}</S.CharLabel>
                                        <S.CharValue>{product.category.name}</S.CharValue>
                                    </S.CharItem>
                                )}
                                {product.country && (
                                    <S.CharItem>
                                        <S.CharLabel>{t("country of origin:")}</S.CharLabel>
                                        <S.CharValue>{product.country.name}</S.CharValue>
                                    </S.CharItem>
                                )}
                            </S.CharacteristicsGrid>
                        </S.Characteristics>

                        <S.Accordion>
                            {[
                                {
                                    key: "desc",
                                    title: t("Description"),
                                    content: t("Detailed description..."),
                                },
                                {
                                    key: "comp",
                                    title: t("Composition"),
                                    content: t("Composition info..."),
                                },
                            ].map(({ key, title, content }) => (
                                <S.AccordionItem key={key}>
                                    <S.AccordionHeader onClick={() => toggle(key)}>
                                        {title}:{openKeys.includes(key) ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                    </S.AccordionHeader>
                                    {openKeys.includes(key) && <S.AccordionContent>{content}</S.AccordionContent>}
                                </S.AccordionItem>
                            ))}
                        </S.Accordion>
                    </S.InfoBlock>
                </S.Right>
            </S.Container>
        </S.Wrapper>
    );
}