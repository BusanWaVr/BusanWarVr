import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 50px;
`;

function TourListCard({ TourData, tempPage }) {


  useEffect(() => {
    console.log(tempPage)
  }, [tempPage]);


  return (
    <div>
      {TourData ? (
        TourData.length > 0 ? (
          TourData.slice(tempPage * 6, (tempPage + 1) * 6).map((tour) => (
            <CardContainer key={tour.id}>
              {tour.images.length > 0 ? (
                <img
                src={tour.images[0]}
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
              <Link to={`/tour/${tour.id}`}>
                <h2>{tour.title}</h2>
              </Link>

              <span>{tour.subTitle}</span>
              <p>지역 : {tour.region}</p>

              <Link to={`/guide/${tour.userId}/detail`}>
                <span> {tour.guide.nickname}</span>
              </Link>
              <p>시작 날짜 : {tour.startDate}</p>
              <p>카테고리 : #{tour.categorys.join(" #")}</p>
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
