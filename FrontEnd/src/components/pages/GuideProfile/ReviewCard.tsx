// ReviewCard.tsx

import React from "react";
import { Review } from "./types"; // types.ts에서 Review 타입 import

const ReviewCard: React.FC<Review> = ({
  tourId,
  tourTitle,
  date,
  content,
  score,
  user,
}) => {
  return (
    <div className="review-card">
      <h4>{tourTitle}</h4>
      <p>{date}</p>
      <p>{content}</p>
      <p>평점: {score}</p>
      <p>작성자: {user.nickname}</p>
    </div>
  );
};

export default ReviewCard;
