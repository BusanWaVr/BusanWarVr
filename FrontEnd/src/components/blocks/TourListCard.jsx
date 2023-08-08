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
            <CardContainer key={tour.id}>
                <img
                  src={tour.images[0] || "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"}
                  alt="투어 이미지"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
              <Link to={`/tour/${tour.id}`}>
                <h2>{tour.title}</h2>
              </Link>

              <span>{tour.subTitle}</span>
              <p>지역 : {tour.region}</p>

              <Link to={`/guide/${tour.userId}/mypage`}>
                <span> {tour.guide.nickname}</span>
              </Link>
              <p>시작 날짜 : {tour.startDate}</p>
              <p>#{tour.categorys.join(" #")}</p>
              <p>
                <strong>
                  {tour.currentMember}/{tour.maxMember}
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
