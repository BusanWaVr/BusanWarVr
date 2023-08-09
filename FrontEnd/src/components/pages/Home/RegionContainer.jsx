// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import styled from "styled-components";

import RegionCard from "../../blocks/RegionCard";

const Container = styled.div`
  height: 500px;
  // background-color: #999999;
`;

const MentionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  // background-color: #565656;
`;

const regionData = [
  {
    id: 1,
    name: "강서구",
    img: "https://datacdn.ibtravel.co.kr/files/2023/05/03181814/1312017201712002k_%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%B5%E1%86%AB-1024x682.jpg",
  },
  {
    id: 2,
    name: "금정구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 3,
    name: "기장군",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 4,
    name: "남구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 5,
    name: "동구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 6,
    name: "동래구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 7,
    name: "부산진구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 8,
    name: "북구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 9,
    name: "사상구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 10,
    name: "사하구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 11,
    name: "서구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 12,
    name: "수영구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 13,
    name: "연제구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 14,
    name: "영도구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 15,
    name: "중구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
  {
    id: 16,
    name: "해운대구",
    img: "https://www.ibtravel.co.kr/theme/1318",
  },
];

function RegionContainer() {
  return (
    <Container>
      <MentionsContainer></MentionsContainer>
      <div>
        {regionData.map((region) => (
          <RegionCard key={region.id} regionData={region} />
        ))}
      </div>
    </Container>
  );
}

export default RegionContainer;
