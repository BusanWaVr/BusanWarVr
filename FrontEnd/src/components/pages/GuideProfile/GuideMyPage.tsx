import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GuideMyPageMini from "./GuideMyPageMini";
import MyPageRightPanel from "./MyPageRightPanel"; // 아직 작성안함
import { GuideData } from "./types"; // GuideData 타입 정의한 파일을 import
import "./GuideMyPage.css";

const GuideMyPage: React.FC = () => {
  // 예시로 사용할 가이드 데이터
  const guideData: GuideData = {
    userId: localStorage.getItem("userId"),
    nickname: localStorage.getItem("nickname") || "",
    profileImg: localStorage.getItem("profileImg") || "",
    isFollowing: false,
    followers: 1000,
    toursCount: 50,
    introduction: "부산을 좋아하는 부기에요",
    scheduledTours: [
      {
        tourId: 101,
        title: "광안리 카페거리 투어",
        image: "투어 정보의 첫번째 이미지",
        isLiked: false,
      },
      {
        tourId: 102,
        title: "감천문화마을 탐방",
        image: "투어 정보의 두번째 이미지",
        isLiked: false,
      },
    ],
    endedTours: [
      {
        tourId: 201,
        title: "가자! 사직구장으로!",
        image: "지난 투어 정보의 첫번째 이미지",
        isLiked: false,
      },
      {
        tourId: 202,
        title: "가자! 아쿠아리움!",
        image: "지난 투어 정보의 두번째 이미지",
        isLiked: false,
      },
    ],
    reviews: [
      {
        tourId: 301,
        tourTitle: "친구들과 가는 여행",
        date: "2023-07-31",
        content: "너무너무 재밌어서 눈물이 뚝뚝!",
        score: 4.5,
        user: {
          userId: 4,
          nickname: "김싸피",
        },
      },
      {
        tourId: 302,
        tourTitle: "나혼자 가는 여행",
        date: "2023-07-31",
        content: "너무너무 웃겨서 콧물이 뚝뚝!",
        score: 5.0,
        user: {
          userId: 5,
          nickname: "김부산",
        },
      },
    ],
  };

  const { guideId } = useParams<{ guideId: string }>();
  const [guide, setGuide] = useState<GuideData>(guideData);

  const handleFollowClick = () => {
    setGuide((prevGuide) => ({
      ...prevGuide,
      isFollowing: !prevGuide.isFollowing,
    }));
  };

  const handleLikeClick = (tourId: number) => {
    setGuide((prevGuide) => {
      const updatedScheduledTours = prevGuide.scheduledTours.map((tour) => {
        if (tour.tourId === tourId) {
          return { ...tour, isLiked: !tour.isLiked };
        }
        return tour;
      });

      const updatedEndedTours = prevGuide.endedTours.map((tour) => {
        if (tour.tourId === tourId) {
          return { ...tour, isLiked: !tour.isLiked };
        }
        return tour;
      });

      return {
        ...prevGuide,
        scheduledTours: updatedScheduledTours,
        endedTours: updatedEndedTours,
      };
    });
  };

  // 가이드 ID에 해당하는 데이터 찾기
  const currentGuide = guideData.userId === guideId ? guideData : null;

  if (!currentGuide) {
    return <div>가이드를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container">
      <div className="left-panel">
        <GuideMyPageMini
          guide={currentGuide}
          onFollowClick={handleFollowClick}
        />
      </div>
      <div className="right-panel">
        <MyPageRightPanel guide={currentGuide} />
      </div>
    </div>
  );
};

export default GuideMyPage;
