import { buttonBaseClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../../hooks/useI18n"

const CardContainer = styled.div`
  margin: 50px;
`;

function GuideReviewCard({ ReviewData }) {
  const t = useI18n()
  

  // localUserId는 srting이고, ReviewData의 userId는 number라서 바꿔줌
  const localUserId = 1*localStorage.getItem('userId');
  
  return (
    <div>
      {ReviewData ? (
        ReviewData.length > 0 ? (
            ReviewData.map((review) => (
            <CardContainer key={review.content}>
              <Link to={`/tour/${review.tourId}`}>
                <p>{review.tourTitle}</p>
              </Link>
              <h3>{t(`별점`)} : {review.score}</h3>
              <div dangerouslySetInnerHTML={{ __html: review.content }} />
              <p> {t(`작성 날짜`)} : {review.date}</p>
              <Link to={`/user/${review.user.id}/mypage`}>
<p>{review.user.name}</p>
              </Link>
            </CardContainer>
          ))
        ) : (
          <p>{t(`작성된 리뷰가 없습니다.`)}</p>
        )
      ) : (
        <p>{t(`로딩중ㅎ`)}</p>
      )}
    </div>
  );
}

export default GuideReviewCard;
