import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TourDetailContent from "./TourDetailContent";
import TourDetailWidget from "./TourDetailWidget";
import { styled } from "styled-components";

interface TourData {
  region: string;
  tourId: string;
  title: string;
  subTitle: string;
  userId: string;
  profileImg: string;
  nickname: string;
  category: string[];
  startDate: string;
  endDate: string;
  minMember: number;
  maxMember: number;
  content: string;
  tourImgs: string[];
  joiners: Joiner[];
  canceled: boolean;
  ended: boolean;
  courses: Course[];
}

interface Course {
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: string;
}

interface Joiner {
  profileImage: string;
  nickname: string;
  joinDate: string;
}

const TourDetail: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const [tourData, setTourData] = useState<TourData | null>(null);
  const { nickname } = useSelector((state: any) => state.userInfo);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [joiners, setJoiners] = useState([]);

  const TourDetailWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
  `;

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(
          `https://busanwavrserver.store/tour/${tourId}`
        );
        if (response.status === 200) {
          const res = await response.json();
          setTourData(res.data);
          setJoiners(res.data.joiners);
          const isUserJoined = res.data.joiners.some(
            (joiner: Joiner) => joiner.nickname === nickname
          );
          setIsJoined(isUserJoined);
        } else {
          alert("해당 투어가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTourData();
  }, [tourId]);

  return (
    <>
      {tourData ? (
        <TourDetailWrapper>
          <TourDetailContent tourData={tourData} joiners={joiners} />
          <TourDetailWidget
            tourData={tourData}
            isJoined={isJoined}
            setIsJoined={setIsJoined}
            joiners={joiners}
            setJoiners={setJoiners}
          />
        </TourDetailWrapper>
      ) : (
        <p>로딩중</p>
      )}
    </>
  );
};

export default TourDetail;
