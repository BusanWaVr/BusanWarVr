import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick"; // react-slick 라이브러리 import

import "slick-carousel/slick/slick.css"; // slick 스타일
import "slick-carousel/slick/slick-theme.css"; // slick 테마 스타일

const CardContainer = styled.div`
  margin: 20px;
`;

const Card = styled.div`
  width: 240px;
  height: 350px;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardBox = styled.div`
  width: 300px;
  height: 370px;
  margin: 20px;
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

function RegionCard({ regionData }) {
  const navigate = useNavigate();

  const handleClick = (regionName) => {
    console.log(regionName);
    navigate("/tour", {
      state: {
        type: "REGION",
        keyword: regionName,
      },
    });
  };

  // react-slick 설정
  const settings = {
    infinite: true,
    // slidesToShow: 3, // 화면에 보여질 카드 개수
    variableWidth: true,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <CardContainer>
      <Slider {...settings}>
        {" "}
        {/* react-slick 설정 적용 */}
        {regionData.map((region) => (
          <CardBox>
            <Card
              key={region.id}
              img={region.img}
              onClick={() => handleClick(region.name)}
            >
              <TextContainer>
                <h5>
                  <strong>{region.name}</strong>
                </h5>
                <p>
                  #{region.tag[0]} #{region.tag[1]}
                </p>
              </TextContainer>
            </Card>
          </CardBox>
        ))}
      </Slider>
    </CardContainer>
  );
}

export default RegionCard;
