// GuideDetailMenu.tsx
import React from "react";
import { Link } from "react-router-dom";

interface GuideDetailMenuProps {
  userId: string | null;
  handleHomeClick: () => void;
}

const GuideDetailMenu: React.FC<GuideDetailMenuProps> = ({
  userId,
  handleHomeClick,
}) => {
  return (
    <div>
      <button onClick={handleHomeClick}>홈</button>
      <Link to={`/guide/${userId}/scheduledtours`}>진행 중인 투어</Link>
      <Link to={`/guide/${userId}/endedtours`}>지난 투어</Link>
      <Link to={`/guide/${userId}/reviews`}>후기</Link>
    </div>
  );
};

export default GuideDetailMenu;
