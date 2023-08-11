import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TourJoinBtn from "./TourJoinBtn.jsx";

const CardContainer = styled.div`
  margin: 50px;
`;

function TourCard({ TourData, isMe }) {
  const [showMateButton, setShowMateButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);

  // 페이지 URL에서 엔드포인트 추출
  const url = window.location.href;
  const parts = url.split("/");
  const endpoint = parts[parts.length - 1];

  console.log(endpoint);
  useEffect(() => {
    // 엔드포인트가 "ended"인 경우 "리뷰 쓰기" 버튼을,
    // tour이거나 mypage인 경우 "메이트 모집" 버튼을 보여주게 설정
    setShowEditButton(endpoint === "ended");
    setShowMateButton(endpoint === "tour");
  }, [endpoint]);

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
              <Link to={`/guide/${tour.guide.id}/mypage`}>
                <span> {tour.guide.name}</span>
              </Link>
              <p>시작 날짜 : {tour.startDate}</p>
              {/* 카테고리가 없네.. */}
              {/* <p>카테고리 : #{tour.category.join(" #")}</p> */}
              <p>
                <strong>
                  {tour.currentMember}/{tour.maxMember}
                </strong>
              </p>
              {isMe && showEditButton && (
                <Link to={`/review/${tour.tourId}/write`}>
                  <button>리뷰 쓰기</button>
                </Link>
              )}
              {isMe && showMateButton && (
                <div>
                  <Link to={`/mate/${tour.tourId}/write`}>
                    <button>메이트 모집</button>
                  </Link>
                  <TourJoinBtn Tour={tour} />
                </div>
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
