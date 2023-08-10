import TourStartBtn from "./TourStartBtn.jsx";

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const CardContainer = styled.div`
  margin: 50px;
`;

function GuideTourCard({ TourData }) {
  const { userId } = useSelector((state) => state.userInfo);
  const { urlId } = useParams();

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
              {userId === urlId ? <TourStartBtn Tour={tour} /> : "하이"}
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
