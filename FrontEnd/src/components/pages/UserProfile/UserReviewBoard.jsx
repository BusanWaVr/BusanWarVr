import React from "react";
import { useOutletContext } from "react-router-dom";
import ReviewCard from "../../blocks/ReviewCard";
import { useI18n } from "../../../hooks/useI18n";

function UserReviewBoard() {
  const t = useI18n();
  const { userInfoData, isMe } = useOutletContext();

  if (!userInfoData || !userInfoData.reviews) {
    return <div>{t(`리뷰 데이터가 없거나 로딩중`)}</div>;
  }

  const ReviewData = userInfoData.reviews;

  return (
    <div className="h-full">
      <ReviewCard ReviewData={ReviewData} isMe={isMe} />
    </div>
  );
}

export default UserReviewBoard;
