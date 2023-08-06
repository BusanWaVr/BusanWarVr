import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function TourListCard({ TourData }) {

  return (
    <div>
      {TourData ? (
        TourData.length > 0 ? (
          TourData.map((tour, index) => (
            <CardContainer key={tour.tourId}>
              {tour.tourImgs.length > 0 ? (
                <img
                src={tour.tourImgs[0]}
                alt="투어 이미지"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                }}
              />
              ) : (
                <p>등록된 투어 이미지가 없습니다.</p>
              )}
              <Link to={`/tour/${tour.tourId}`}>
                <h2>{tour.title}</h2>
              </Link>

              <span>{tour.subTitle}</span>
              <p>지역 : {tour.region}</p>

              <Link to={`/guide/${tour.userId}/detail`}>
                <span> {tour.nickname}</span>
              </Link>
              <p>시작 날짜 : {tour.startDate}</p>
              <p>카테고리 : #{tour.category.join(" #")}</p>
              <p>
                <strong>
                  {tour.joiners.length}/{tour.maxMember}
                </strong>
              </p>
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

export default TourListCard;
