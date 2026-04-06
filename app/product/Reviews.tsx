"use client";
import React, { useState } from "react";
import * as S from "./Reviews.css";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
}

interface Props {
  reviews: Review[];
}

const VISIBLE = 3;
const CARD_WIDTH = 460;
const GAP = 30;
const STEP = CARD_WIDTH + GAP;

export default function Reviews({ reviews }: Props) {
  const [index, setIndex] = useState(0);
  const [activeReview, setActiveReview] = useState<Review | null>(null);

  const maxIndex = Math.max(0, reviews.length - VISIBLE);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const renderStars = (rating: number) =>
    [1, 2, 3, 4, 5].map((n) => (
      <Star key={n} size={18} fill={n <= rating ? "#ffdb0d" : "none"} color="#3B3028" />
    ));

  return (
    <S.Container>
      <S.Title>Відгуки</S.Title>

      <S.SliderWrapper>
        <S.Slider style={{ transform: `translateX(-${index * STEP}px)` }}>
          {reviews.map((r, i) => (
            <S.Card key={i} onClick={() => setActiveReview(r)}>
              <S.Top>
                <S.Row>
                  <span>{r.name}</span>
                  <span>{r.date}</span>
                </S.Row>

                <S.RatingRow>
                  <S.Stars>{renderStars(r.rating)}</S.Stars>
                  <span>{r.rating}/5</span>
                </S.RatingRow>
              </S.Top>

              <S.Text>{r.text}</S.Text>
            </S.Card>
          ))}
        </S.Slider>
      </S.SliderWrapper>

      <S.Controls>
        <button onClick={prev} disabled={index === 0}>
          <ArrowLeft size={18} />
        </button>

        <S.Dots>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={i === index % 3 ? "active" : ""} />
           ))}
        </S.Dots>

        <button onClick={next} disabled={index === maxIndex}>
          <ArrowRight size={18} />
        </button>
      </S.Controls>

      {activeReview && (
        <S.ModalOverlay onClick={() => setActiveReview(null)}>
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.CloseButton onClick={() => setActiveReview(null)}>✕</S.CloseButton>

            <S.ModalHeader>
              <div>
                <strong>{activeReview.name}</strong>
                <span>{activeReview.date}</span>
              </div>
            </S.ModalHeader>

            <S.Stars style={{ marginBottom: "20px" }}>{renderStars(activeReview.rating)}</S.Stars>
            <S.ModalText>{activeReview.text}</S.ModalText>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
}