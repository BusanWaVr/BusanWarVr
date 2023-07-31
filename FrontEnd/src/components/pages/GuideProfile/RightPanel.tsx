// RightPanel.tsx

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GuideData, ScheduledTour } from "./types";
import ReviewCard from "./ReviewCard";

interface RightPanelProps {
  guide: GuideData;
  setGuide: (guide: GuideData) => void;
  onLikeClick: (tourId: number) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  guide,
  setGuide,
  onLikeClick,
}) => {
  const handleLikeClick = (
    tourId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    onLikeClick(tourId);
  };

<<<<<<< Updated upstream
=======
  useEffect(() => {
    setGuide(guide);
  }, [guide]);

>>>>>>> Stashed changes
  return (
    <div id="right-panel" className="right-panel">
      <p id="introduction">&#123; {guide.introduction} &#125;</p>

      <h3>진행중인 투어</h3>
      <Link to={`/guide/${guide.userId}/scheduledtours`}>더보기</Link>
      <div className="tour-card-container">
        {guide.scheduledTours.map((tour: ScheduledTour) => (
          <div
            key={tour.tourId}
            onClick={() => (window.location.href = `/tour/${tour.tourId}`)}
          >
            <div className="tour-card">
              <img src={tour.image} alt={tour.title} />
              <h4>{tour.title}</h4>
              <button onClick={(e) => handleLikeClick(tour.tourId, e)}>
                {tour.isLiked ? "좋아요 취소" : "좋아요"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3>지난 투어</h3>
      <Link to={`/guide/${guide.userId}/endedtours`}>더보기</Link>
      <div className="tour-card-container">
        {guide.endedTours.map((tour: ScheduledTour) => (
          <div
            key={tour.tourId}
            onClick={() => (window.location.href = `/tour/${tour.tourId}`)}
          >
            <div className="tour-card">
              <img src={tour.image} alt={tour.title} />
              <h4>{tour.title}</h4>
              <button onClick={(e) => handleLikeClick(tour.tourId, e)}>
                {tour.isLiked ? "좋아요 취소" : "좋아요"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 id="reviews">후기/평점</h3>
      <Link to={`/guide/${guide.userId}/reviews`}>더보기</Link>
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
  );
};

export default RightPanel;
