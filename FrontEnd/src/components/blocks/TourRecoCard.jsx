import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../hooks/useI18n"

const CardContainer = styled.div`
display: flex;
  flex-direction: row;   // 가로 배열
  align-items: center;   // 가로 중앙 정렬
  justify-content: center;
  margin: 20px;
//   overflow-x: scroll;
`;

const Card = styled.div`
  margin: 20px;
  background-color: white;
  width: 200px;
  height: 350px;
  border-radius: 20px;
`;

function TourRecoCard({ tourRecoData }) {
  const t = useI18n()
  return (
    <CardContainer>
      {tourRecoData ? (
        tourRecoData.length > 0 ? (
            tourRecoData.map((tour) => (
            <Card key={tour.tourId}>
                <img
                  src={tour.tourImgs[0] || "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"}
                  alt="투어 이미지"
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "15px",
                  }}
                />
              <Link to={`/tour/${tour.tourId}`}>
                <h2>{tour.title}</h2>
              </Link>
              <p>{t(`시작 날짜`)} : {tour.startDate}</p>
              <p>#{tour.category.join(" #")}</p>
              <p>
                <strong>
                  {tour.currentMember}/{tour.maxMember}
                </strong>
              </p>
            </Card>
          ))
        ) : (
          <p>{t(`투어 데이터가 없습니다`)}</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </CardContainer>
  );
}

export default TourRecoCard;
