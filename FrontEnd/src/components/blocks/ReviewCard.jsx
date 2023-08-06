import { buttonBaseClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReviewDelete from "../pages/Review/ReviewDelete";

const CardContainer = styled.div`
  margin: 50px;
`;

function ReviewCard({ ReviewData }) {
  const [reviews, setReviews] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setReviews(ReviewData);
  }, []);

  // 수정하기로 데이터 넘겨주기
  const handleEditClick = (review) => {
      navigate(`/review/${review.id}/edit`, {
        state: {
          tourId: review.tourId,
          title: review.title,
          content: review.content,
          score: review.score,
        },
      });
    }

  function reviewDelete(id){
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  }


  // localUserId는 srting이고, ReviewData의 userId는 number라서 바꿔줌
  const localUserId = 1*localStorage.getItem('userId');
  
  return (
    <div>
      {reviews ? (
        reviews.length > 0 ? (
          reviews.map((review) => (
            <CardContainer key={review.id}>
              {/* 투어명도 받아와야 하나?.. */}
              <Link to={`/tour/${review.tourId}`}>
                <p>이 리뷰가 달린 투어 정보 보러가기</p>
              </Link>
              <h2>{review.title}</h2>
              <h3>별점 : {review.score}</h3>
              <div dangerouslySetInnerHTML={{ __html: review.content }} />
              <p> 작성 날짜 : {review.date}</p>
              {localUserId === review.userId &&
              <div>
                <button onClick={() => handleEditClick(review)}>수정</button>
                <ReviewDelete
                  reviewId = {review.id}
                  userId = {review.userId}
                  reviewDelete = {reviewDelete}
                />
              </div>
              }
            </CardContainer>
          ))
        ) : (
          <p>작성한 리뷰가 없습니다.</p>
        )
      ) : (
        <p>로딩중ㅎ</p>
      )}
    </div>
  );
}

export default ReviewCard;
