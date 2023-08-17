import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import TourRecoCard from "../../blocks/TourRecoCard";
import { useI18n } from "../../../hooks/useI18n";

const Container = styled.div`
  height: calc(100%);
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  background-color: #1983ff;
`;

const MentionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TourRecoContainer() {
  const t = useI18n();

  const { accessToken, refreshToken, userType } = useSelector(
    (state) => state.userInfo
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tourRecoData, setTourRecoData] = useState([]);

  useEffect(() => {
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn && userType === "USER") {
          // 로그인 상태일 때 추천 데이터 가져오기
          const response = await fetch(
            "https://busanwavrserver.store/main/tour/recommend",
            {
              method: "GET",
              headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            console.log("로그인on 데이터");
            const data = await response.json();
            setTourRecoData(data.data);
          } else {
            alert(data.message);
          }
        } else {
          // 로그인 되지 않은 상태일 때 초기 검색화면 가져오기
          const requestBody = {
            type: "TITLE",
            keyword: "",
          };

          const response = await fetch(
            "https://busanwavrserver.store/tour/search?page=0",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            }
          );
          if (response.status === 200) {
            console.log("로그인x 데이터");
            const data = await response.json();

            // 데이터 포맷 변환
            const formattedData = data.data.map((tour) => ({
              tourId: tour.id,
              title: tour.title,
              category: tour.categorys,
              tourImgs: tour.images,
              startDate: tour.startDate,
              currentMember: tour.currentMember,
              maxMember: tour.maxMember,
            }));

            setTourRecoData(formattedData);
          } else {
            alert(data.message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isLoggedIn, accessToken]);

  return (
    <Container>
      <MentionsContainer>
        <h5 className="font-bold text-3xl md:text-4xl text-white my-12">
          {isLoggedIn
            ? userType === "USER"
              ? t(`회원님을 위한 추천 VR 투어`)
              : t(`현재 부산와Vr에서 진행되고 있는 투어를 보여드릴게요.`)
            : t(`로그인하시면 더 많은 추천 VR 투어를 보실 수 있어요.`)}
        </h5>
      </MentionsContainer>
      <TourRecoCard tourRecoData={tourRecoData} />
    </Container>
  );
}

export default TourRecoContainer;
