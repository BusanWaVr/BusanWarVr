import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
display: flex;
  flex-direction: row;   // 가로 배열
  align-items: center;   // 가로 중앙 정렬
  margin: 20px;
  overflow-x: scroll;
`;

const Card = styled.div`
  margin: 20px;
  background-color: white;
  width: 250px;
  height: 350px;
  border-radius: 20px;
`;

function DeadCard({ deadlineData }) {
  return (
    <CardContainer>
      {deadlineData ? (
        deadlineData.length > 0 ? (
            deadlineData.map((tour) => (
            <Card key={tour.tourId}>
                {tour.image ? (
                <img
                  src={tour.image}
                  alt="투어 이미지"
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "15px",
                  }}
                />
              ) : (
                <p>등록된 투어 이미지가 없습니다.</p>
              )}
              <Link to={`/tour/${tour.tourId}`}>
                <h2>{tour.title}</h2>
              </Link>
              <p>시작 날짜 : {tour.startDate}</p>
              <p>카테고리 : #{tour.category.join(" #")}</p>
              <p>
                <strong>
                  {tour.currentMember}/{tour.maxMember}
                </strong>
              </p>
            </Card>
          ))
        ) : (
          <p>투어 데이터가 없습니다</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </CardContainer>
  );
}

export default DeadCard;
