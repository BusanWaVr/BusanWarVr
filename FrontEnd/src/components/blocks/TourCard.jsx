import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function TourCard({ TourData }) {
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
              <strong>
                {tour.currentMember}/{tour.maxMember}
              </strong>
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
