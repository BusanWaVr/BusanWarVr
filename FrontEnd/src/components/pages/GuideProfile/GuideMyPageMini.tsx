// GuideMyPageMini.tsx
import React, { useState, useEffect } from "react";
import { GuideData } from "./types";
import GuideMyPageMenu from "./GuideMyPageMenu";
import "./GuideMyPageMini.css";

interface GuideMyPageMiniProps {
  guide: GuideData;
  onFollowClick: () => void;
}

const GuideMyPageMini: React.FC<GuideMyPageMiniProps> = ({
  guide,
  onFollowClick,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    setIsFollowing(guide.isFollowing);
  }, [guide.isFollowing]);

  const handleFollowClick = () => {
    onFollowClick(); // GuideMyPage에서 전달받은 onFollowClick 함수 호출
  };

  const handleFollowClick2 = () => {
    // 팔로잉 취소 HTTP 통신
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };

  const handleHomeClick = () => {
    window.scrollTo(0, 0); // 페이지 맨 위로 스크롤
  };

  return (
    <div className="GuideMyPageMini">
      <img src={guide.profileImg} alt={guide.nickname} />
      <h2>{guide.nickname}</h2>
      <button onClick={handleFollowClick2}>
        {isFollowing ? "언팔로우" : "+ 팔로우"}
      </button>
      <p>팔로워 {guide.followers}</p>
      <p>투어 {guide.toursCount}</p>
      <GuideMyPageMenu
        userId={guide.userId}
        handleHomeClick={handleHomeClick}
      />
    </div>
  );
};

export default GuideMyPageMini;
