import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function TourCard({ TourData }) {
  const [showReviewButton, setShowReviewButton] = useState(false);

  // 페이지 URL에서 엔드포인트 추출
  const url = window.location.href;
  const parts = url.split("/");
  const ended = parts[parts.length - 2];

  // console.log(url);
  // console.log(parts);
  // console.log(ended);


  useEffect(() => {
    // 엔드포인트가 "ended"인 경우 "리뷰 쓰기" 버튼을 보여주도록 설정
    setShowReviewButton(ended === "ended");
  }, [ended]);


  return (
    <div>
      {TourData ? (
        TourData.length > 0 ? (
          TourData.map((tour) => (
            <CardContainer key={tour.tourId}>
              <Link to={`/tour/${tour.tourId}`}>
                <h2>{tour.title}</h2>
              </Link>
              <span>가이드 :</span>
              <Link to={`/guide/${tour.guide.id}/detail`}>
                <span> {tour.guide.name}</span>
              </Link>
              <p>시작 날짜 : {tour.startDate}</p>
              {/* 카테고리가 없네.. */}
              {/* <p>카테고리 : #{tour.category.join(" #")}</p> */}
              <p><strong>
                {tour.currentMember}/{tour.maxMember}
              </strong></p>
              {showReviewButton && (
                <Link to={`/review/${tour.tourId}/write`}>
                  <button>리뷰 쓰기</button>
                </Link>
              )}
            </CardContainer>
          ))
        ) : (
          <p>투어 데이터가 없습니다</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TourCard;
