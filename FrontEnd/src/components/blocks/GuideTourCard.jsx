import TourStartBtn from "./TourStartBtn.jsx";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function GuideTourCard({ TourData, isMe }) {
  return (
    <div>
      {TourData ? (
        TourData.length > 0 ? (
          TourData.map((tour) => (
            <CardContainer key={tour.tourId}>
              <Link to={`/tour/${tour.tourId}/`}>
                <span>{tour.title}</span>
                <img
                  src={
                    tour.image ||
                    "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"
                  }
                  alt="투어 이미지"
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                />
              </Link>
              <TourStartBtn Tour={tour} />
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

export default GuideTourCard;
