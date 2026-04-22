"use client";
import { Star, ChevronRight, MessageSquare } from "lucide-react";
import { useExtracted } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/lib/reviews";

import * as S from "./Reviews.css";

interface Review {
    name: string;
    date: string;
    rating: number;
    text: string;
}

interface User {
    name: string;
    isAuth: boolean;
}

interface Props {
    productId: number;
    reviews: Review[];
    currentUser?: User;
}

export default function Reviews({ reviews, currentUser, productId }: Props) {
    const t = useExtracted("reviews");
    const queryClient = useQueryClient();
    const [index, setIndex] = useState(0);
    const [activeReview, setActiveReview] = useState<Review | null>(null);
    const [isAllReviewsOpen, setIsAllReviewsOpen] = useState(false);
    
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [newRating, setNewRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [newText, setNewText] = useState("");

    const { mutate, isPending } = useMutation({
        mutationFn: createReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
            
            setIsWriteModalOpen(false);
            setNewText("");
            setNewRating(5);
            toast.success(t("Review added successfully"));
        },
        onError: () => {
            toast.error(t("Failed to add review"));
        }
    });

    useEffect(() => {
        if (activeReview || isAllReviewsOpen || isWriteModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [activeReview, isAllReviewsOpen, isWriteModalOpen]);

    const sortedReviews = [...reviews].sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('.');
        const [dayB, monthB, yearB] = b.date.split('.');
        const dateA = new Date(`${yearA}-${monthA}-${dayA}`).getTime();
        const dateB = new Date(`${yearB}-${monthB}-${dayB}`).getTime();
        return dateB - dateA;
    });

    const sliderReviews = sortedReviews.slice(0, 9);
    const pages = [];
    for (let i = 0; i < sliderReviews.length; i += 3) {
        pages.push(sliderReviews.slice(i, i + 3));
    }

    const maxIndex = Math.max(0, pages.length - 1);
    const prev = () => setIndex((i) => Math.max(0, i - 1));
    const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

    const handleWriteClick = () => {
        if (!currentUser?.isAuth) {
            toast.error(t("Please login to leave a review"));
            return;
        }
        setIsWriteModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newText.trim() || !currentUser) return;

        mutate({
            product_id: productId,
            rating: newRating,
            text: newText.trim()
        });
    };

    const renderStars = (rating: number) =>
    [1, 2, 3, 4, 5].map((n) => (
        <Star 
            key={n} 
            size={18} 
            fill={n <= rating ? "#ffdb0d" : "none"} 
            color={n <= rating ? "#ffdb0d" : "#e9e3d9"}
            strokeWidth={1.5}
        />
    ));

    return (
        <S.Container>
            <S.HeaderRow>
                <S.Title>{t("Reviews")}</S.Title>
                <S.HeaderActions>
                    <S.WriteBtn onClick={handleWriteClick}>
                        <MessageSquare size={16} /> {t("Write a review")}
                    </S.WriteBtn>
                    <S.SeeAllBtn onClick={() => setIsAllReviewsOpen(true)}>
                        {t("See all")} <ChevronRight size={16} />
                    </S.SeeAllBtn>
                </S.HeaderActions>
            </S.HeaderRow>

            <S.SliderWrapper>
                <S.Slider style={{ transform: `translateX(-${index * 100}%)` }}>
                    {pages.map((page, pageIdx) => (
                        <S.Page key={`page-${pageIdx}`}>
                            {page.map((r, i) => (
                                <S.Card key={`review-${pageIdx}-${i}`} onClick={() => setActiveReview(r)}>
                                    <S.Top>
                                        <S.Row>
                                            <span>{r.name}</span>
                                            <S.CardDate>{r.date}</S.CardDate>
                                        </S.Row>
                                        <S.RatingRow>
                                            <S.Stars>{renderStars(r.rating)}</S.Stars>
                                            <S.RatingValue>{r.rating}/5</S.RatingValue>
                                        </S.RatingRow>
                                    </S.Top>
                                    <S.Text>{r.text}</S.Text>
                                </S.Card>
                            ))}
                        </S.Page>
                    ))}
                </S.Slider>
            </S.SliderWrapper>

            {pages.length > 1 && (
                <S.Controls>
                    <button type="button" onClick={prev} disabled={index === 0} aria-label="Previous"> ‹ </button>
                    <S.Dots>
                        {pages.map((_, i) => (
                            <div key={`dot-${i}`} className={i === index ? "active" : ""} onClick={() => setIndex(i)} />
                        ))}
                    </S.Dots>
                    <button type="button" onClick={next} disabled={index === maxIndex} aria-label="Next"> › </button>
                </S.Controls>
            )}

            {isWriteModalOpen && (
                <S.ModalOverlay onClick={() => setIsWriteModalOpen(false)}>
                    <S.SingleModalContent onClick={(e) => e.stopPropagation()}>
                        <S.CloseButton onClick={() => setIsWriteModalOpen(false)}> &#10005; </S.CloseButton>
                        <S.WriteModalHeader>
                            <S.WriteModalTitle>{t("Write a review")}</S.WriteModalTitle>
                            <S.WriteModalUser>
                                {t("Your name")}: <strong>{currentUser?.name}</strong>
                            </S.WriteModalUser>
                        </S.WriteModalHeader>

                        <S.Form onSubmit={handleSubmit}>
                            <div>
                                <S.FormLabel>{t("Your rating")}:</S.FormLabel>
                                <S.StarSelector onMouseLeave={() => setHoverRating(0)}>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <Star
                                            key={n}
                                            size={32}
                                            fill={n <= (hoverRating || newRating) ? "#ffdb0d" : "none"}
                                            color={n <= (hoverRating || newRating) ? "#ffdb0d" : "#e9e3d9"}
                                            strokeWidth={1.5}
                                            onClick={() => setNewRating(n)}
                                            onMouseEnter={() => setHoverRating(n)}
                                        />
                                    ))}
                                </S.StarSelector>
                            </div>

                            <S.TextArea
                                placeholder={t("Share your impressions about the product...")}
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                required
                            />

                            <S.SubmitBtn type="submit" disabled={!newText.trim() || isPending}>
                                {isPending ? t("Sending...") : t("Submit review")}
                            </S.SubmitBtn>
                        </S.Form>
                    </S.SingleModalContent>
                </S.ModalOverlay>
            )}

            {activeReview && (
                <S.ModalOverlay onClick={() => setActiveReview(null)}>
                    <S.SingleModalContent onClick={(e) => e.stopPropagation()}>
                        <S.CloseButton onClick={() => setActiveReview(null)}>
                            &#10005;
                        </S.CloseButton>

                        <S.ModalHeader>
                            <S.ModalReviewHeader>
                                <S.ModalReviewName>{activeReview.name}</S.ModalReviewName>
                            </S.ModalReviewHeader>
                            <S.ModalDate>
                                {activeReview.date}
                            </S.ModalDate>
                        </S.ModalHeader>

                        <S.ModalRatingRow>
                            <S.Stars>{renderStars(activeReview.rating)}</S.Stars>
                            <S.RatingValue>{activeReview.rating}/5</S.RatingValue>
                        </S.ModalRatingRow>
                        
                        <S.ModalText>{activeReview.text}</S.ModalText>
                    </S.SingleModalContent>
                </S.ModalOverlay>
            )}

            {isAllReviewsOpen && (
                <S.ModalOverlay onClick={() => setIsAllReviewsOpen(false)}>
                    <S.AllModalContent onClick={(e) => e.stopPropagation()}>
                        <S.CloseButton onClick={() => setIsAllReviewsOpen(false)}>
                            &#10005;
                        </S.CloseButton>
                        
                        <S.ModalHeader>
                            <S.Title>{t("All reviews")}</S.Title>
                        </S.ModalHeader>

                        <S.ModalScrollArea>
                            {sortedReviews.map((r, i) => (
                                <S.Card 
                                    key={`all-rev-${i}`} 
                                    onClick={() => { setActiveReview(r); setIsAllReviewsOpen(false); }}
                                    style={{ height: 'auto' }}
                                >
                                    <S.Top>
                                        <S.Row>
                                            <span>{r.name}</span>
                                            <S.CardDate>{r.date}</S.CardDate>
                                        </S.Row>
                                        <S.RatingRow>
                                            <S.Stars>{renderStars(r.rating)}</S.Stars>
                                            <S.RatingValue>{r.rating}/5</S.RatingValue>
                                        </S.RatingRow>
                                    </S.Top>
                                    <S.Text>{r.text}</S.Text>
                                </S.Card>
                            ))}
                        </S.ModalScrollArea>
                    </S.AllModalContent>
                </S.ModalOverlay>
            )}
        </S.Container>
    );
}