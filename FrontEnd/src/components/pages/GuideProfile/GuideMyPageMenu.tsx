// GuideMyPageMenu.tsx
import React from "react";
import { Link } from "react-router-dom";

interface GuideMyPageMenuProps {
  userId: string | null;
  handleHomeClick: () => void;
}

const GuideMyPageMenu: React.FC<GuideMyPageMenuProps> = ({
  userId,
  handleHomeClick,
}) => {
  return (
    <div>
      <button onClick={handleHomeClick}>홈</button>
      {/* 밑에 링크 3개는 임시로 적어놓은 것 */}
      <Link to={`/update`}>내 정보 수정</Link>
      <Link to={`/guide/${userId}/followerlists`}>팔로워</Link>
      <Link to={`/tourregistration`}>투어 개설</Link>
    </div>
  );
};

export default GuideMyPageMenu;
