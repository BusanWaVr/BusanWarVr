import React from "react";
import { Link, useParams } from "react-router-dom";

function GuideNavbar() {
  const { urlId } = useParams();
  console.log("가이드 urlId", urlId);
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/guide/${urlId}/mypage/`}>내 정보</Link>
        </li>
        <li>
          <Link to={`/guide/${urlId}/mypage/follower/`}>팔로워</Link>
        </li>
        <li>
          <Link to={`/guide/${urlId}/mypage/tour`}>개설 투어</Link>
        </li>
      </ul>
    </nav>
  );
}

export default GuideNavbar;
