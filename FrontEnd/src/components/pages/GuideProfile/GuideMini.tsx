import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GuideData } from "./types"; // GuideData 타입 정의한 파일을 import
import "./GuideMini.css";

interface GuideMiniProps {
  guide: GuideData;
  onFollowClick: () => void;
}

const GuideMini: React.FC<GuideMiniProps> = ({ guide, onFollowClick }) => {
  const [isFollowing, setIsFollowing] = useState<Boolean>(false);

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

  return (
    <div className="guidemini">
      <img src={guide.profileImg} alt={guide.nickname} />
      <h2>{guide.nickname}</h2>
      <button onClick={handleFollowClick2}>
        {isFollowing ? "언팔로우" : "+ 팔로우"}
      </button>
      <p>팔로워 {guide.followers}</p>
      <p>투어 {guide.toursCount}</p>

      <Link to={`/guide/${guide.userId}/detail`}>홈</Link>
      <Link to={`/guide/${guide.userId}/scheduledtours`}>진행 중인 투어</Link>
      <Link to={`/guide/${guide.userId}/endedtours`}>지난 투어</Link>
      <Link to={`/guide/${guide.userId}/reviews`}>후기</Link>
    </div>
  );
};

export default GuideMini;
