"use client";
import React from "react";
import * as S from "./Reviews.css";

interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <S.ReviewsSection>
      <S.ReviewsTitle>Відгуки</S.ReviewsTitle>
      <S.ReviewsWrapper>
        <S.ReviewsScroll>
          <S.ReviewsRow>
            {reviews.map((r, i) => (
              <S.ReviewCard key={i}>
                <S.ReviewTop>
                  <S.ReviewHeader>
                    <S.Name>{r.name}</S.Name>
                    <S.Date>{r.date}</S.Date>
                  </S.ReviewHeader>
                  <S.Stars>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <S.Star key={n} $active={n <= r.rating} />
                    ))}
                  </S.Stars>
                </S.ReviewTop>
                <S.ReviewText>{r.text}</S.ReviewText>
              </S.ReviewCard>
            ))}
          </S.ReviewsRow>
        </S.ReviewsScroll>

        <S.Controls>
          <S.ArrowBtn>{"<"}</S.ArrowBtn>
          <S.Dots>
            <S.Dot $active />
            <S.Dot />
            <S.Dot />
          </S.Dots>
          <S.ArrowBtn>{">"}</S.ArrowBtn>
        </S.Controls>
      </S.ReviewsWrapper>
    </S.ReviewsSection>
  );
};

export default Reviews;