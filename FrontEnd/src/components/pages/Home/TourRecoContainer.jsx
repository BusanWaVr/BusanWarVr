import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import TourRecoCard from "../../blocks/TourRecoCard";
import { useI18n } from "../../../hooks/useI18n"

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



function TourRecoContainer() {
  const t = useI18n()

  const { accessToken, refreshToken } = useSelector(
    (state) => state.userInfo
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tourRecoData, setTourRecoData] = useState([]);


  useEffect(() => {
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }}, [])


  useEffect(() => {
    // 로그인 된 상태 : 추천데이터 받기
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
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
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
      // 로그인 되지 않은 상태 : 초기 검색화면 받기
    } else {
      const fetchData = async () => {
        try {
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
            
            // 로그인on 데이터와 같은 형식으로 포맷
            const formattedData = data.data.map(tour => ({
              tourId: tour.id,
              title: tour.title,
              category: tour.categorys,
              tourImgs: tour.images,
              startDate: tour.startDate,
              currentMember: tour.currentMember,
              maxMember: tour.maxMember
          }));

            setTourRecoData(formattedData);
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [isLoggedIn]);

  return (
    <Container>
      <MentionsContainer>
      {isLoggedIn ? (<h5>{t(`회원님을 위한 추천 VR 투어`)}</h5>) : (<h5>{t(`로그인하시면 더 많은 추천 VR 투어를 보실 수 있어요.`)}</h5>)}

      </MentionsContainer>
      <TourRecoCard tourRecoData={tourRecoData}/>
    </Container>
  );
}

export default TourRecoContainer;
