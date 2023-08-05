import { buttonBaseClasses } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function ReviewCard({ ReviewData }) {

  // localUserId는 srting이고, ReviewData의 userId는 number라서 바꿔줌
  const localUserId = 1*localStorage.getItem('userId');
  
  return (
    <div>
      {ReviewData ? (
        ReviewData.length > 0 ? (
          ReviewData.map((review) => (
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
                <button>수정</button>
                <button>삭제</button>
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
