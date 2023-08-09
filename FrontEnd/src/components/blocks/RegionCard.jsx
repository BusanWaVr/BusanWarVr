import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row; // 가로 배열
  align-items: center; // 가로 중앙 정렬
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

function RegionCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tour", {
      state: {
        type: "REGION",
        keyword: "강서구",
      },
    });
  };
  return (
    <CardContainer>
      <Card onClick={handleClick}>
        <img
          src={
            "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"
          }
          alt="투어 이미지"
          style={{
            width: "100%",
            height: "200px",
            borderRadius: "15px",
          }}
        />
      </Card>
    </CardContainer>
  );
}

export default RegionCard;
