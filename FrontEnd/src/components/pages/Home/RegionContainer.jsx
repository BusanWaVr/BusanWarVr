// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import styled from "styled-components";
import { useI18n } from "../../../hooks/useI18n";

import RegionCard from "../../blocks/RegionCard";

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 5;
  position: relative;
`;

const MentionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const regionData = [
  {
    id: 1,
    name: "강서구",
    img: "https://ak-d.tripcdn.com/images/1i62v223469eo748g2217_W_640_0_R5_Q80.jpg?proc=source/trip",
    tag: ["대저생태공원", "삼성전기"],
  },
  {
    id: 2,
    name: "금정구",
    img: "https://ak-d.tripcdn.com/images/1A07170000011rv1964E6_C_900_600_Q70.webp?proc=source%2ftrip&proc=source%2ftrip",
    tag: ["금정산", "범어사"],
  },
  {
    id: 3,
    name: "기장군",
    img: "https://ak-d.tripcdn.com/images/1mi232224um2trtfkCC63_W_640_0_R5_Q80.jpg?proc=source/trip",
    tag: ["해동용궁사", "아홉산숲"],
  },
  {
    id: 4,
    name: "남구",
    img: "https://ak-d.tripcdn.com/images/1i61622159hojvfsg1B14_W_640_0_R5_Q80.jpg?proc=source/trip",
    tag: ["오륙도", "평화공원"],
  },
  {
    id: 5,
    name: "동구",
    img: "https://ak-d.tripcdn.com/images/1i65j22346lkz1qo2BE64_W_640_0_R5_Q80.jpg?proc=source/trip",
    tag: ["차이나타운", "S-트레인"],
  },
  {
    id: 6,
    name: "동래구",
    img: "https://ak-d.tripcdn.com/images/1i63n2224s2s2conk5C36_W_640_0_R5_Q80.jpg?proc=source/trip",
    tag: ["금강공원", "동래온천"],
  },
  {
    id: 7,
    name: "부산진구",
    img: "https://ak-d.tripcdn.com/images/1i66e2215deb2vylt9445_W_640_0_R5_Q80.jpg?proc=source/trip",
    tag: ["송상현광장", "부산시민공원"],
  },
  {
    id: 8,
    name: "북구",
    img: "https://aw-d.tripcdn.com/images/1mc4o12000alspofn1BF1_R_600_400_R5_D.jpg_.webp",
    tag: ["화명장미공원", "롯데마트"],
  },
  {
    id: 9,
    name: "사상구",
    img: "https://ak-d.tripcdn.com/images/1i64a2224pj5v8b283116_W_640_0_R5_Q80.jpg?proc=source/trip",
    tag: ["자갈치시장", "삼락생태공원"],
  },
  {
    id: 10,
    name: "사하구",
    img: "https://ak-d.tripcdn.com/images/1i6612224ogxnm4ts7201_W_640_0_R5_Q80.jpg?proc=source/trip",
    tag: ["부산현대미술관", "감천문화마을"],
  },
  {
    id: 11,
    name: "서구",
    img: "https://lh3.googleusercontent.com/p/AF1QipMPLO8UX06bAb0kKJGeMjF6aHy2b2-ctryg7pIi=s1360-w1360-h1020",
    tag: ["송도해상케이블카", "임시수도기념관"],
  },
  {
    id: 12,
    name: "수영구",
    img: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/246000/246978-Gwangalli-Beach.jpg",
    tag: ["남천동 벚꽃길", "광안리해수욕장"],
  },
  {
    id: 13,
    name: "연제구",
    img: "https://mblogthumb-phinf.pstatic.net/MjAyMjAzMzFfMjU5/MDAxNjQ4NzE1NDEyNTQw.pma8zbtDHnk63bKWojhXeOYjUhxw7sY2t4VDE7CcHr0g.xH7kxMyW1trZnB-CHULMdcHd6lEP4iyqyiaBhEVyoyEg.JPEG.corps69/6L6C0003.jpg?type=w800",
    tag: ["온천천", "황령산"],
  },
  {
    id: 14,
    name: "영도구",
    img: "https://lh3.googleusercontent.com/p/AF1QipNpeig3-1MaHCa_ZN1Vkwwa6avgNt1Ite8zyKQF=s1360-w1360-h1020",
    tag: ["태종대", "부산항대교"],
  },
  {
    id: 15,
    name: "중구",
    img: "https://a.cdn-hotels.com/gdcs/production80/d799/ade705e6-a89b-46c4-85ec-52582e9f4d97.jpg",
    tag: ["국제시장", "용두산공원"],
  },
  {
    id: 16,
    name: "해운대구",
    img: "https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153530528_ttiel",
    tag: ["아쿠아리움", "달맞이길"],
  },
];

function RegionContainer() {
  const t = useI18n();
  return (
    <Container>
      <MentionsContainer>
        <h5 className="font-bold text-3xl md:text-4xl text-blue-500 my-6">
          {t(`지역별 투어`)}
        </h5>
      </MentionsContainer>
      <RegionCard regionData={regionData} />
    </Container>
  );
}

export default RegionContainer;
