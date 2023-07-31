// 가이드 상세 페이지

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./GuideDetail.css";

interface ScheduledTour {
  tourId: number;
  title: string;
  image: string;
  isLiked: boolean;
}

interface Review {
  tourId: number;
  tourTitle: string;
  date: string;
  content: string;
  score: number;
  user: {
    id: number;
    name: string;
  };
}

interface GuideData {
  id: string | null;
  name: string;
  profileImage: string;
  isFollowing: boolean;
  followers: number;
  toursCount: number;
  introduction: string;
  scheduledTours: ScheduledTour[];
  endedTours: ScheduledTour[];
  reviews: Review[];
}

const ReviewCard: React.FC<Review> = ({
  tourId,
  tourTitle,
  date,
  content,
  score,
  user,
}) => {
  return (
    <div className="review-card">
      <h4>{tourTitle}</h4>
      <p>{date}</p>
      <p>{content}</p>
      <p>평점: {score}</p>
      <p>작성자: {user.name}</p>
    </div>
  );
};

const GuideDetail: React.FC = () => {
  // 예시로 사용할 가이드 데이터
  const guideData: GuideData = {
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("nickname") || "",
    profileImage: localStorage.getItem("profileImg") || "",
    isFollowing: false,
    followers: 1000,
    toursCount: 50,
    introduction: "마! 광안리 등킨드나쓰 무봤나!",
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
          id: 4,
          name: "김싸피",
        },
      },
      {
        tourId: 302,
        tourTitle: "나혼자 가는 여행",
        date: "2023-07-31",
        content: "너무너무 웃겨서 콧물이 뚝뚝!",
        score: 5.0,
        user: {
          id: 5,
          name: "김부산",
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

  // URL 변수 선언
  const homeUrl = `/guide/${guideId}/detail`;
  const scheduledToursUrl = `/guide/${guideId}/scheduled-tours`;
  const endedToursUrl = `/guide/${guideId}/ended-tours`;
  const reviewsUrl = `/guide/${guideId}/reviews`;

  // 가이드 ID에 해당하는 데이터 찾기
  const currentGuide = guideData.id === guideId ? guideData : null;

  if (!currentGuide) {
    return <div>가이드를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container">
      <div className="left-panel">
        <img src={currentGuide.profileImage} alt={currentGuide.name} />
        <h2>{currentGuide.name}</h2>
        <button onClick={handleFollowClick}>
          {guide.isFollowing ? "언팔로우" : "+ 팔로우"}
        </button>
        <p>팔로워 {currentGuide.followers}</p>
        <p>투어 {currentGuide.toursCount}</p>

        <Link to={homeUrl}>홈</Link>
        <Link to={scheduledToursUrl}>진행 중인 투어</Link>
        <Link to={endedToursUrl}>지난 투어</Link>
        <Link to={reviewsUrl}>후기</Link>
      </div>

      <div id="right-panel" className="right-panel">
        <p id="introduction">&#123; {guide.introduction} &#125;</p>

        <h3>진행중인 투어</h3>
        <Link to={scheduledToursUrl}>더보기</Link>
        <div className="tour-card-container">
          {guide.scheduledTours.map((tour) => (
            <Link key={tour.tourId} to={`/tour/${tour.tourId}`}>
              <div className="tour-card">
                <img src={tour.image} alt={tour.title} />
                <h4>{tour.title}</h4>
                <button onClick={() => handleLikeClick(tour.tourId)}>
                  {tour.isLiked ? "좋아요 취소" : "좋아요"}
                </button>
              </div>
            </Link>
          ))}
        </div>

        <h3>지난 투어</h3>
        <Link to={endedToursUrl}>더보기</Link>
        <div className="tour-card-container">
          {guide.endedTours.map((tour) => (
            <Link key={tour.tourId} to={`/tour/${tour.tourId}`}>
              <div className="tour-card">
                <img src={tour.image} alt={tour.title} />
                <h4>{tour.title}</h4>
                <button onClick={() => handleLikeClick(tour.tourId)}>
                  {tour.isLiked ? "좋아요 취소" : "좋아요"}
                </button>
              </div>
            </Link>
          ))}
        </div>

        <h3 id="reviews">후기/평점</h3>
        <Link to={reviewsUrl}>더보기</Link>
        <div className="review-card-container">
          {guide.reviews.map((review) => (
            <ReviewCard
              key={review.tourId}
              tourId={review.tourId}
              tourTitle={review.tourTitle}
              date={review.date}
              content={review.content}
              score={review.score}
              user={review.user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default GuideDetail;
