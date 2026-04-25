"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronRight, Star } from "lucide-react";
import { useExtracted } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { createReview } from "@/lib/reviews";
import { getProfile } from "@/lib/user";
import type { ReviewType } from "@/types/products";
import * as S from "./Reviews.css";

interface Props {
	reviews: ReviewType[];
	productId?: number;
	currentUser?: {
		name: string;
		isAuth: boolean;
	};
}

export default function Reviews({ reviews, productId }: Props) {
	const t = useExtracted("reviews");
	const router = useRouter();
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => await getProfile(),
		retry: false,
		staleTime: 5 * 60 * 1000,
	});
	const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
	const [newRating, setNewRating] = useState(5);
	const [hoverRating, setHoverRating] = useState(0);
	const [newText, setNewText] = useState("");
	const [activeReview, setActiveReview] = useState<ReviewType | null>(null);
	const [isAllReviewsOpen, setIsAllReviewsOpen] = useState(false);
	const isAuthenticated = !!profile;

	const { mutate, isPending } = useMutation({
		mutationFn: createReview,
		onSuccess: () => {
			setIsWriteModalOpen(false);
			setNewText("");
			setNewRating(5);
			router.refresh();
			toast.success(t("Review added successfully"));
		},
		onError: () => {
			toast.error(t("Failed to add review"));
		},
	});

	const totalReviews = reviews.length;
	const averageRating = totalReviews ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
	const previewReviews = reviews.slice(0, 3);

	useEffect(() => {
		if (activeReview || isAllReviewsOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [activeReview, isAllReviewsOpen]);

	const renderStars = (rating: number) =>
		[1, 2, 3, 4, 5].map((n) => (
			<Star key={n} size={18} fill={n <= rating ? "#ffdb0d" : "none"} color={n <= rating ? "#ffdb0d" : "#e9e3d9"} strokeWidth={1.5} />
		));

	const getReviewAuthor = (review: ReviewType) => review.user.full_name || "Anonymous";
	const formatReviewDate = (review: ReviewType) => {
		const date = review.inserted_at;
		if (!date) return "";

		return date.toLocaleDateString("uk-UA");
	};

	const handleWriteClick = () => {
		if (!isAuthenticated) {
			toast.error(t("You need to be logged in to write a review"));
			return;
		}

		setIsWriteModalOpen(true);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!productId || !newText.trim() || !isAuthenticated) return;

		mutate({
			product_id: productId,
			rating: newRating,
			message: newText.trim(),
		});
	};

	return (
		<S.Container>
			<S.HeaderRow>
				<div>
					<S.Title>{t("Reviews")}</S.Title>
					<S.ReviewSummary>
						<S.SummaryRating>{averageRating ? averageRating.toFixed(1) : "0.0"}</S.SummaryRating>
						<S.SummaryCount>
							{totalReviews} {totalReviews === 1 ? t("review") : t("reviews")}
						</S.SummaryCount>
					</S.ReviewSummary>
				</div>
				<S.HeaderActions>
					{isAuthenticated && (
						<S.WriteBtn type="button" onClick={handleWriteClick}>
							{t("Write a review")}
						</S.WriteBtn>
					)}
					<S.SeeAllBtn type="button" onClick={() => setIsAllReviewsOpen(true)}>
						{t("See all")} <ChevronRight size={16} />
					</S.SeeAllBtn>
				</S.HeaderActions>
			</S.HeaderRow>

			<S.PreviewGrid>
				{previewReviews.length > 0 ? (
					previewReviews.map((review) => (
						<S.Card key={review.user.id} type="button" onClick={() => setActiveReview(review)}>
							<S.Top>
								<S.Row>
									<span>{getReviewAuthor(review)}</span>
									<S.CardDate>{formatReviewDate(review)}</S.CardDate>
								</S.Row>
								<S.RatingRow>
									<S.Stars>{renderStars(review.rating)}</S.Stars>
									<S.RatingValue>{review.rating}/5</S.RatingValue>
								</S.RatingRow>
							</S.Top>
							<S.Text>{review.message}</S.Text>
						</S.Card>
					))
				) : (
					<S.EmptyState>{t("No reviews yet")}</S.EmptyState>
				)}
			</S.PreviewGrid>

			{activeReview && (
				<S.ModalOverlay onClick={() => setActiveReview(null)}>
					<S.SingleModalContent onClick={(e) => e.stopPropagation()}>
						<S.CloseButton onClick={() => setActiveReview(null)}>&#10005;</S.CloseButton>

						<S.ModalHeader>
							<S.ModalReviewHeader>
								<S.ModalReviewName>{getReviewAuthor(activeReview)}</S.ModalReviewName>
							</S.ModalReviewHeader>
							<S.ModalDate>{formatReviewDate(activeReview)}</S.ModalDate>
						</S.ModalHeader>

						<S.ModalRatingRow>
							<S.Stars>{renderStars(activeReview.rating)}</S.Stars>
							<S.RatingValue>{activeReview.rating}/5</S.RatingValue>
						</S.ModalRatingRow>

						<S.ModalText>{activeReview.message}</S.ModalText>
					</S.SingleModalContent>
				</S.ModalOverlay>
			)}

			{isWriteModalOpen && (
				<S.ModalOverlay onClick={() => setIsWriteModalOpen(false)}>
					<S.SingleModalContent onClick={(event) => event.stopPropagation()}>
						<S.CloseButton onClick={() => setIsWriteModalOpen(false)}>&#10005;</S.CloseButton>
						<S.ModalHeader>
							<S.ModalReviewHeader>
								<S.ModalReviewName>{t("Write a review")}</S.ModalReviewName>
							</S.ModalReviewHeader>
							<S.ModalDate>{profile?.full_name}</S.ModalDate>
						</S.ModalHeader>

						<S.Form onSubmit={handleSubmit}>
							<div>
								<S.FormLabel>{t("Your rating")}</S.FormLabel>
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
								onChange={(event) => setNewText(event.target.value)}
								required
							/>

							<S.SubmitBtn type="submit" disabled={!newText.trim() || isPending}>
								{isPending ? t("Sending...") : t("Submit review")}
							</S.SubmitBtn>
						</S.Form>
					</S.SingleModalContent>
				</S.ModalOverlay>
			)}

			{isAllReviewsOpen && (
				<S.ModalOverlay onClick={() => setIsAllReviewsOpen(false)}>
					<S.AllModalContent onClick={(e) => e.stopPropagation()}>
						<S.CloseButton onClick={() => setIsAllReviewsOpen(false)}>&#10005;</S.CloseButton>

						<S.ModalHeader>
							<S.Title>{t("All reviews")}</S.Title>
						</S.ModalHeader>

						<S.ModalScrollArea>
							{reviews.map((review) => (
								<S.Card
									key={review.user.id}
									type="button"
									onClick={() => {
										setActiveReview(review);
										setIsAllReviewsOpen(false);
									}}
								>
									<S.Top>
										<S.Row>
											<span>{getReviewAuthor(review)}</span>
											<S.CardDate>{formatReviewDate(review)}</S.CardDate>
										</S.Row>
										<S.RatingRow>
											<S.Stars>{renderStars(review.rating)}</S.Stars>
											<S.RatingValue>{review.rating}/5</S.RatingValue>
										</S.RatingRow>
									</S.Top>
									<S.Text>{review.message}</S.Text>
								</S.Card>
							))}
						</S.ModalScrollArea>
					</S.AllModalContent>
				</S.ModalOverlay>
			)}
		</S.Container>
	);
}
