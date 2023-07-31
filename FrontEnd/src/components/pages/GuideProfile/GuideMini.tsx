import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GuideData } from "./types";
import "./GuideMini.css";

interface GuideMiniProps {
  guide: GuideData;
  onFollowClick: () => void;
}

const GuideMini: React.FC<GuideMiniProps> = ({ guide, onFollowClick }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleFollowClick = () => {
    onFollowClick(); // Call the onFollowClick function passed from GuideDetail
  };

  useEffect(() => {
    console.log(guide.isFollowing);
    setIsFollowing(guide.isFollowing);
  }, []);

  const handleFollowClick2 = () => {
    // 팔로잉 취소 HTTP 통신
    if (isFollowing) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
    console.log(isFollowing);
  };

  const handleHomeClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="guidemini">
      <img src={guide.profileImg} alt={guide.nickname} />
      <h2>{guide.nickname}</h2>
      <button onClick={handleFollowClick2}>
        {isFollowing ? "언팔로우" : "+ 팔로우"}
      </button>
      <p>팔로워 {guide.followers}</p>
      <p>투어 {guide.toursCount}</p>

      <button onClick={handleHomeClick}>홈</button>
      <Link to={`/guide/${guide.userId}/scheduledtours`}>진행 중인 투어</Link>
      <Link to={`/guide/${guide.userId}/endedtours`}>지난 투어</Link>
      <Link to={`/guide/${guide.userId}/reviews`}>후기</Link>
    </div>
  );
};

export default GuideMini;
