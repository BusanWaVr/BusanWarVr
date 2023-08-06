import React from "react";
import { useOutletContext } from "react-router-dom";
import ReviewCard from "../../blocks/ReviewCard";

function UserReviewBoard() {
  const { userInfoData } = useOutletContext();

  if (!userInfoData || !userInfoData.reviews) {
    return <div>리뷰 데이터가 없거나 로딩중</div>;
  }

  const ReviewData = userInfoData.reviews;

  return (
    <div>
      <h1>리뷰보드</h1>
      <ReviewCard ReviewData={ReviewData}/>
    </div>
  );
}

export default UserReviewBoard;
